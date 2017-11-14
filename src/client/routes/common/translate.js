const translate = (key) => {
  const window = global.window || {};
  const reduxStore = window.REDUX_STATE || {};
  const appData = reduxStore.appData || {};
  const messageList = appData.translate || {};
  const arr = Object.entries(messageList);
  let res;
  arr.forEach((item) => {
    if (item[0] === key) {
      const value = item[1];
      res = value;
    }
  });
  return res || key;
};

export default translate;
