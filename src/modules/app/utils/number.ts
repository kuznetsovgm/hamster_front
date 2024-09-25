export function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString()
  } else if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(2) + "K" // Округление до ближайшего целого числа тысяч
  } else {
    return (num / 1000000).toFixed(2) + "M" // Округление до ближайшего целого числа миллионов
  }
}
