module.exports = async (ctx) => {
  const file = ctx.req.file || false;
  if (!file) {
    ctx.body = {
      code: 400,
      data: 'file not upload',
      msg: 'error',
    };
  } else {
    ctx.body = {
      code: 200,
      data: file,
      msg: 'success',
    };
  }
};
