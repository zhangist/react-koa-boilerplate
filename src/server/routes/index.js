import Router from 'koa-router';
import apiSite from './api/site';
import apiUser from './api/user';

const router = new Router();
router.use(apiSite.routes(), apiSite.allowedMethods());
router.use(apiUser.routes(), apiUser.allowedMethods());

export default router;
