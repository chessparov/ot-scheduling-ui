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
  try {
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
    return preParsedDate[0] + ' ' + monthDictionary[Number(preParsedDate[1]) - 1] + ' ' + preParsedDate[2]
  }
  catch (error) {
    return '';
  }
}

export const timeParser = (time: number) => {
  const hours = Math.floor(time / (60 * 60)).toString();
  const minutes = Math.floor((time % (60 * 60)) / 60).toString();
  const seconds = Math.floor((time % (60 * 60)) % 60).toString();
  return Number(hours) >= 1
      ? hours + ' ore ' + minutes + ' min ' + seconds + ' secondi'
      : Number(minutes) >= 1 ? minutes + ' min ' + seconds + ' secondi'
          : seconds + ' secondi';
}