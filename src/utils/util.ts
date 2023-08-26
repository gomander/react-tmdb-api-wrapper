export const formatDate = (input: string) => {
  const dateStrings = input.split('-')
  const dateNumbers = dateStrings.map(string => Number(string))
  dateNumbers[1]--
  return Intl.DateTimeFormat(
    'en-US', { day: 'numeric', month: 'short', year: 'numeric' }
  ).format(Date.UTC(dateNumbers[0], dateNumbers[1], dateNumbers[2]))
}
