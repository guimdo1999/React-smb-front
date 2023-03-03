export const maskTel = (val: any) => {
    val = val.replace(/\D/g, "");
    val = val.replace(/^(\d{2})(\d)/g, "($1) $2");
    val = val.replace(/(\d)(\d{4})$/, "$1-$2");
  return val;
};
