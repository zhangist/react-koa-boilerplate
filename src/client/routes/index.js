const App = require('./common/app');

// site
const Default = require('./site/default');
const Explore = require('./site/explore');
const About = require('./site/about');
const Login = require('./site/login');
const ChooseLocale = require('./site/chooseLocale');

// home
const Home = require('./home/default');
const Upload = require('./home/upload');

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Default,
      },
      {
        path: '/explore',
        component: Explore,
      },
      {
        path: '/about',
        component: About,
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/choose-locale',
        component: ChooseLocale,
      },
      {
        path: '/home',
        component: Home,
      },
      {
        path: '/upload',
        component: Upload,
      },
    ],
  },
];

export default routes;
