module.exports = async (ctx) => {
  // destory session
  ctx.session = null;

  ctx.body = {
    code: 200,
    data: { isLogin: false },
    msg: 'success',
  };
};
