export const formatDate = (dateString) => {
  const date = dateString?.slice(0, 10)?.split('-')?.reverse()?.join('.')
  return `${date}`
}
// {
//   advert.video_content?.publication_time
// ?.slice(0, 10)
// ?.split('-')
// ?.reverse()
// ?.join('.')
// }
