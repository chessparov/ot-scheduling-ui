export const sleep = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/** Validation */
export const validators = {
  email: (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(v) || "Indirizzo e-mail invalido";
  },
  required: (v: any) => !!v || "Campo obbligatorio",
};

export const dateParser = (dateFromPython: string) => {
  const monthDictionary: string[] = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ]
  let preParsedDate = dateFromPython.toString().split('T')[0].split('-').reverse()
  return preParsedDate[0] + ' ' + monthDictionary[Number(preParsedDate[1])] + ' ' + preParsedDate[2]
}