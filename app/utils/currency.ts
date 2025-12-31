export const numeroPorExtenso = (v: number): string => {
  if (v === 0) return "zero reais";

  const unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const dezenas = ["", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const onzeAteDezenove = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const centenas = ["", "cem", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

  const getGroupText = (n: number): string => {
    if (n === 0) return "";
    
    let text = "";
    const c = Math.floor(n / 100);
    const d = Math.floor((n % 100) / 10);
    const u = n % 10;

    if (c > 0) {
      if (n === 100) return "cem";
      text += (c === 1 ? "cento" : centenas[c]);
    }

    if (d > 0 || u > 0) {
      if (text) text += " e ";
      
      if (d === 1) {
        text += onzeAteDezenove[u];
        return text;
      } else if (d > 0) {
         text += dezenas[d];
         if (u > 0) text += " e ";
      }
      
      if (u > 0 && d !== 1) {
        text += unidades[u];
      }
    }
    return text;
  }

  // Split integer and decimals
  // Limit to millions for this use case
  let intPart = Math.floor(v);
  let cents = Math.round((v - intPart) * 100);

  let ret = "";

  // Millions
  const millions = Math.floor(intPart / 1000000);
  intPart %= 1000000;
  
  if (millions > 0) {
    const t = getGroupText(millions);
    ret += t + (millions === 1 ? " milhão" : " milhões");
  }

  // Thousands
  const thousands = Math.floor(intPart / 1000);
  intPart %= 1000;
  
  if (thousands > 0) {
    if (ret) ret += (intPart === 0 && cents === 0 ? " de " : ", "); // Simplified conector
    if (thousands === 1) ret += "mil"; // Just "mil", not "um mil" usually, but let's stick to standard
    else ret += getGroupText(thousands) + " mil";
  }

  // Hundreds
  if (intPart > 0) {
     if (ret) ret += " e ";
     ret += getGroupText(intPart);
  }

  if (Math.floor(v) > 0) {
      ret += (Math.floor(v) === 1) ? " real" : " reais";
  }

  // Cents
  if (cents > 0) {
      if (ret) ret += " e ";
      ret += getGroupText(cents);
      ret += (cents === 1) ? " centavo" : " centavos";
  }

  return ret;
};
