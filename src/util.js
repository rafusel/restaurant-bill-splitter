export const extractFloatStringFromCurrencyString = (string) => (
  string.replace(/[^0-9.]/g,'')
);
