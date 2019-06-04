// Sort education/experience by current first followed by historical.

const sortHistory = history => {
  let sortedHistory = [];
  return sortedHistory.concat(
    findCurrentHistory(history),
    findPastHistory(history)
  );
};

const findCurrentHistory = historyItem => {
  return historyItem
    .filter(item => item.current === true)
    .sort((a, b) => new Date(b.from) - new Date(a.from));
};

const findPastHistory = historyItem => {
  return historyItem
    .filter(item => item.current === false)
    .sort((a, b) => new Date(b.to) - new Date(a.to));
};

export default sortHistory;
