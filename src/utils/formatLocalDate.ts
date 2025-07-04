export function formatLocalDate(date?: Date | string, locale: string = "en-US"): string {
  if (!date) return "N/A"

  const parsedDate = typeof date === "string" ? new Date(date) : date

  if (isNaN(parsedDate.getTime())) return "Invalid date"

  return parsedDate.toLocaleString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  })
}
