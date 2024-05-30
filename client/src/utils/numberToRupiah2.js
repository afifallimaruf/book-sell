export function numberToRupiah2(number1, number2) {
  let result = number1 + number2;
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return formatter.format(result);
}
