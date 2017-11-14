module.exports = async (ctx) => {
  const userInfo = {
    fullname: 'fullname from api',
    isLogin: true,
  };
  ctx.session.user = Object.assign({}, ctx.session.user, {
    userInfo,
  });

  ctx.body = {
    code: 200,
    data: userInfo,
    msg: 'success',
  };
};
