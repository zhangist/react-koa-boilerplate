const router = require('koa-router')();

const postLogin = require('./postLogin');
const postLogout = require('./postLogout');
const postUserAction = require('./postUserAction');
const postChooseLocale = require('./postChooseLocale');

router.post('/login', postLogin);
router.post('/logout', postLogout);
router.post('/user-action', postUserAction);
router.post('/choose-locale', postChooseLocale);

module.exports = router;
