'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { numeroPorExtenso } from '../utils/currency';

const instrumentsList = [
  "Voz",
  "Violão",
  "Teclado",
  "Violino",
  "Saxofone",
  "Trompete"
];

const getBase64ImageFromURL = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = (error) => reject(error);
  });
};

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    contractorName: '',
    contractorCPF: '',
    contractorRG: '',
    contractorAddress: '',
    contractorNum: '',
    contractorNeighborhood: '',
    contractorCEP: '',
    contractorCity: '',
    contractorState: '',
    musiciansCount: '',
    otherInstruments: '',
    location: '',
    eventTime: '',
    eventDate: '',
    paymentValue: '',
    selectedInstruments: [] as string[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (instrument: string) => {
    setFormData(prev => {
      const selected = prev.selectedInstruments.includes(instrument)
        ? prev.selectedInstruments.filter(s => s !== instrument)
        : [...prev.selectedInstruments, instrument];
      return { ...prev, selectedInstruments: selected };
    });
  };

  const parseCurrency = (val: string): number => {
    // Basic parser for "1.500,00" or "1500"
    if (!val) return 0;
    // Remove dots, replace comma with dot
    const clean = val.replace(/\./g, '').replace(',', '.');
    return parseFloat(clean) || 0;
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    
    // Configs
    const margin = 20;
    const pageWidth = 210;
    // const maxLineWidth = pageWidth - margin * 2;
    let y = 60;
    const lineHeight = 7;

    // Helper: Rich Text Printer
    const printRichText = (segments: { text: string, bold?: boolean }[]) => {
        let currentX = margin;

        const words = segments.flatMap(seg => {
            return seg.text.split(/(\s+)/).map(word => ({ text: word, bold: seg.bold }));
        });

        words.forEach((wordObj, i) => {
           if (!wordObj.text) return;
           // Handle line breaks manually embedded? Not for now, simplified wrapping
           
           doc.setFont("helvetica", wordObj.bold ? "bold" : "normal");
           const wordWidth = doc.getTextWidth(wordObj.text);

           if (currentX + wordWidth > pageWidth - margin) {
             y += lineHeight;
             currentX = margin;
           }

           doc.text(wordObj.text, currentX, y);
           currentX += wordWidth;
        });

        y += lineHeight; 
    };
    
    // --- LOAD LOGO ---
    try {
        const logoBase64 = await getBase64ImageFromURL('/logo-gold.png');
        doc.addImage(logoBase64, 'PNG', 10, 10, 25, 25); 
    } catch (e) {
        console.error("Error loading logo", e);
    }
    
    // Auto calculate full text value
    const valNumber = parseCurrency(formData.paymentValue);
    const valExtenso = numeroPorExtenso(valNumber);
    
    // --- TITLE ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("CONTRATO PARA CERIMONIAL DE CASAMENTO", 105, 30, { align: "center" });

    // --- BODY ---
    doc.setFontSize(10);
    
    const paragraphs = [
        [
            { text: "Pelo presente instrumento particular de contrato de cerimonial de casamento, as partes abaixo assinadas de lado Music D&A neste ato representado pela D & A Music, CNPJ 45.262.814/0001-32 aqui denominada simplesmente contratada e de outro lado " },
            { text: (formData.contractorName || '_______________________________________').toUpperCase(), bold: true },
            { text: ", CPF: " },
            { text: formData.contractorCPF || '____________________', bold: true },
            { text: ", RG: " },
            { text: formData.contractorRG || '____________________', bold: true },
            { text: " que reside á Rua: " },
            { text: formData.contractorAddress || '_____________________________________________', bold: true },
            { text: ", N.º " },
            { text: formData.contractorNum || '________', bold: true },
            { text: ", BAIRRO " },
            { text: formData.contractorNeighborhood || '________________________', bold: true },
            { text: ", CEP: " },
            { text: formData.contractorCEP || '____________', bold: true },
            { text: ", CIDADE " },
            { text: formData.contractorCity || '__________', bold: true },
            { text: ", ESTADO " },
            { text: formData.contractorState || '____', bold: true },
            { text: " aqui denominada contratante." }
        ],
        [],
        [
            { text: "I – O contratado assume a responsabilidade do comparecimento no evento com " },
            { text: formData.musiciansCount || '____', bold: true },
            { text: " músicos sendo: " },
            { text: `${formData.selectedInstruments.join(', ')} ${formData.otherInstruments ? ', ' + formData.otherInstruments : ''}`, bold: true },
            { text: ". Para realização de uma cerimônia religiosa na " },
            { text: formData.location || '____________________________________', bold: true },
            { text: " ás " },
            { text: formData.eventTime || '______', bold: true },
            { text: " hrs no dia " },
            { text: formData.eventDate ? new Date(formData.eventDate).toLocaleDateString('pt-BR') : '__/__/____', bold: true },
            { text: " chegando (40 minutos) antes do evento." }
        ],
        [],
        [
            { text: "II – Pelo integral cumprimento do que ficou combinado, o contratante obriga-se a pagar. Ao contratado, A importância de R$ " },
            { text: formData.paymentValue || '________________', bold: true },
            { text: " (" },
            { text: valExtenso, bold: true },
            { text: ")" }
        ],
        [],
        [
            { text: "III – Podendo o contratante dividir esse valor da melhor forma possível sendo que no ato da assinatura do contrato deverá ser pago 30% do valor e o restante até 15 dias antes do casamento." }
        ],
        [],
        [
            { text: "IV – A parte contratada não se responsabilizara por danos referentes á (falta de suprimentos de energia elétrica condizentes com o nosso equipamento de som no Local do evento), que possa a vir prejudicar o evento." }
        ],
        [],
        [
            { text: "V – Em caso do cancelamento do \"Casamento\" não será devolvido a quantia paga." }
        ],
        [],
        [
            { text: "VI – O contratante tem direito de mudar as escolhas da musica até 1 semana antes do casamento." }
        ],
        [],
        [
            { text: "VII – Para constar, lavrou-se em 2(duas) vias sete instrumentos particular, que as partes Contratantes, assim como as testemunhas abaixo, assinam tendo a tudo presentes. De comum acordo" }
        ]
    ];

    paragraphs.forEach(p => {
        if (p.length === 0) {
            y += lineHeight / 2;
            return;
        }
        printRichText(p);
    });

    // --- DATE ---
    y += 10;
    const today = new Date();
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const dateString = `Franca-SP ${today.getDate()} de ${months[today.getMonth()]} de ${today.getFullYear()}`;
    doc.setFont("helvetica", "normal");
    doc.text(dateString, margin, y);

    // --- SIGNATURES ---
    y += 30;
    
    if (y > 270) {
        doc.addPage();
        y = 40;
    }

    doc.line(margin, y, 90, y);
    doc.line(110, y, 190, y);
    
    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text("D & A Music", 55, y, { align: "center" });
    doc.text(formData.contractorName || "Contratante", 150, y, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.text("CNPJ: 45.262.814/0001-32", 55, y + 5, { align: "center" });

    // Save
    doc.save(`Contrato_${formData.contractorName || 'Casamento'}.pdf`);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
      <h2 className="font-serif text-2xl md:text-3xl text-black-900 mb-6 border-b pb-4 border-gold-500">
        Gerar Contrato
      </h2>

      {/* Contractor Data */}
      <section className="mb-8">
        <h3 className="font-medium text-lg text-gray-800 mb-4 bg-gray-50 p-2 rounded">Dados do Contratante</h3>
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
                <input name="contractorName" placeholder="Nome Completo" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>
            
            <div className="col-span-12 md:col-span-6">
                <input name="contractorCPF" placeholder="CPF" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>
            <div className="col-span-12 md:col-span-6">
                <input name="contractorRG" placeholder="RG" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>
            
            <div className="col-span-12 md:col-span-9">
                <input name="contractorAddress" placeholder="Rua" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>
            <div className="col-span-12 md:col-span-3">
                <input name="contractorNum" placeholder="Nº" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>
            
            <div className="col-span-12 md:col-span-5">
                <input name="contractorNeighborhood" placeholder="Bairro" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>
            <div className="col-span-12 md:col-span-4">
                <input name="contractorCity" placeholder="Cidade" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>
            
            <div className="col-span-6 md:col-span-2">
                <input name="contractorCEP" placeholder="CEP" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>
            <div className="col-span-6 md:col-span-1">
                <input name="contractorState" placeholder="UF" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="mb-8">
        <h3 className="font-medium text-lg text-gray-800 mb-4 bg-gray-50 p-2 rounded">Dados do Evento</h3>
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 md:col-span-3">
                <label className="block text-xs mb-1 text-gray-500">Data</label>
                <input type="date" name="eventDate" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>
            <div className="col-span-6 md:col-span-2">
                <label className="block text-xs mb-1 text-gray-500">Horário</label>
                <input type="time" name="eventTime" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>
            
            <div className="col-span-12 md:col-span-7">
                <label className="block text-xs mb-1 text-gray-500">Local / Igreja</label>
                <input name="location" placeholder="Nome do Local" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>

            <div className="col-span-6 md:col-span-3">
                 <label className="block text-xs mb-1 text-gray-500">Qtd. Músicos</label>
                 <input name="musiciansCount" placeholder="Ex: 4" type="number" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>

            <div className="col-span-6 md:col-span-3">
                 <label className="block text-xs mb-1 text-gray-500">Valor (R$)</label>
                 <input name="paymentValue" placeholder="1.500,00" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>
        </div>
      </section>

      {/* Instruments */}
      <section className="mb-8">
        <h3 className="font-medium text-lg text-gray-800 mb-4 bg-gray-50 p-2 rounded">Instrumentos (Checklist)</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
            {instrumentsList.map(item => (
                <label key={item} className="flex items-center space-x-2 cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={formData.selectedInstruments.includes(item)}
                        onChange={() => handleCheckboxChange(item)}
                        className="rounded text-gold-500 focus:ring-gold-500"
                    />
                    <span className="text-sm">{item}</span>
                </label>
            ))}
        </div>
        <input name="otherInstruments" placeholder="Outros instrumentos..." className="w-full p-2 border rounded" onChange={handleInputChange} />
      </section>

      <div className="flex justify-end">
        <button 
            onClick={generatePDF}
            className="w-full md:w-auto bg-black-900 text-gold-500 px-8 py-3 rounded-md font-medium hover:bg-black-800 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
            <span>Gerar PDF Atualizado</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
        </button>
      </div>
    </div>
  );
}
