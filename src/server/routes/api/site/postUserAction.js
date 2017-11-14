module.exports = async (ctx) => {
  // do something
  // const pathname = ctx.request.body.pathname;
  // const name = ctx.request.body.name;
  // const type = ctx.request.body.type;
  // const description = ctx.request.body.description;

  ctx.body = {
    code: 200,
    data: null,
    msg: 'success',
  };
};
