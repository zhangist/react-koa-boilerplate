module.exports = async (ctx) => {
  const locale = ctx.request.body.locale || '';
  if (locale) {
    ctx.cookies.set('lang', locale, {
      expires: new Date('9999-01-01'),
      signed: false,
    });
    ctx.body = {
      code: 200,
      data: null,
      msg: 'success',
    };
  } else {
    ctx.body = {
      code: 400,
      data: 'locale not found',
      msg: 'success',
    };
  }
};
