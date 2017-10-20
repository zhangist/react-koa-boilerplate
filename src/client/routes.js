const App = require('./containers/common/App');
const Home = require('./containers/home');
const Explore = require('./containers/explore');
const About = require('./containers/about');

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/explore',
        component: Explore,
      },
      {
        path: '/about',
        component: About,
      },
    ],
  },
];

export default routes;
