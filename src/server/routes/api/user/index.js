const router = require('koa-router')();
const multer = require('koa-multer');

const upload = multer({ dest: process.env.UPLOAD_DIR });

const postRefreshUserInfo = require('./postRefreshUserInfo');
const postUpload = require('./postUpload');

router.use(async (ctx, next) => {
  if (ctx.session.user) {
    await next();
  } else {
    // 未登录
    ctx.status = 401;
    ctx.body = {
      code: ctx.status,
      data: {},
      msg: 'error',
    };
  }
});
router.post('/refresh-user-info', postRefreshUserInfo);
router.post('/upload', upload.single('file'), postUpload);

module.exports = router;
