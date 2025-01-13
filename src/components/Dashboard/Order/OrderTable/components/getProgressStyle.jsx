export const getProgressStyle = (onlineViews, expectedViews) => {
  const ratio = (onlineViews / expectedViews) * 100;
  if (ratio >= 100) return { background: '#ec2020', color: '#f8f8f8' };
  if (ratio >= 80) return { background: '#fd8b00', color: '#764306' };
  if (ratio >= 50) return { background: '#0bd244', color: '#00681e' };
  return { background: 'rgb(86 112 241)', color: 'rgb(228 232 253)' };
};