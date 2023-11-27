
export function formatAmount(num: string | number, currency: string = 'USD') {
  const n = num ? Number(num).toFixed(2) : '0.00'
  return `${currency === "USD" ? "USD " : "₦ "}${n
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
}

export function formatDate(date: string) {
  const dateString = new Date(date).toDateString()
  return dateString.replace(" ", ", ")
}