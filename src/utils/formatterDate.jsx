export const formatDate = (dateString) => {
  const date = dateString?.slice(0, 10)?.split('-')?.reverse()?.join('.')
  return `${date}`
}
