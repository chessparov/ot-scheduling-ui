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
