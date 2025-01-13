export function sortData({ tableData, sortKey, reverse }) {
  if (!sortKey) return tableData;

  const sortedData = [...tableData].sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}
