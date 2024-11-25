export const currencyFormatter = (total) => {
  const formatter = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  });

  return formatter.format(total);
};
