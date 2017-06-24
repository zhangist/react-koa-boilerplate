const routes = [
  {
    component: require('./common/containers/Root'),
    routes: [
      {
        path: '/',
        exact: true,
        component: require('./home/containers/App')
      },
      {
        path: '/explore',
        component: require('./explore/containers/App')
      },
      {
        path: '/about',
        component: require('./about/containers/App')
      }
    ]
  }
]

export default routes
