module.exports = async (ctx) => {
  const userInfo = Object.assign({}, ctx.session.user.userInfo, {
    expire: new Date().getTime(),
  });
  ctx.session.user = Object.assign({}, ctx.session.user, {
    userInfo,
  });

  ctx.body = {
    code: 200,
    data: userInfo,
    msg: 'success',
  };
};
