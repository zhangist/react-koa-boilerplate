# React Koa Boilerplate

An universal React(v16) and Koa(v2) isomorphic boilerplate.

Hint: This boilerplate is used by Shulive Box.  
Hint: Some of the built-in fonts and logos are copyright owned by Shulive Box, please replace them when using this boilerplate.

### Getting Started
- Require Node.js v7.6 or later.
- `npm install pm2 -g` to install pm2 global for production.
- `npm install` to install dependencies and devDependencies.
- `npm run dev` to start up the development environment.
- `npm run build` to compile and bundle the client and server files.
- `npm start` to deploy the production server.
- `npm run prd` to deploy the production server with pm2.

### Technology Stack
- [React(v16)](https://github.com/facebook/react)
- [React Router(v4)](https://github.com/ReactTraining/react-router)
- [Redux](https://github.com/reactjs/redux)
- [Stylus](https://github.com/stylus/stylus)
- [PostCSS](https://github.com/postcss/postcss)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Koa(v2)](https://github.com/koajs/koa)
- [Webpack(v3)](https://github.com/webpack/webpack)
- [Babel](https://github.com/babel/babel)
- [ESLint](https://github.com/eslint/eslint)
- [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html)

### Why Isomorphic
#### SEO
An application that can only run in the client-side cannot serve HTML to crawlers, so it will have poor [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization) by default. Web crawlers function by making a request to a web server and interpreting the result. but if the server returns a blank page, it’s not of much value. There are workarounds, but not without jumping through some hoops.

#### Performance
By the same token, if the server doesn’t render a full page of HTML but instead waits for client-side JavaScript to do so, users will experience a few critical seconds of blank page or loading spinner before seeing the content on the page. There are plenty of studies showing the drastic effect a slow site has on users, and thus revenue.

#### Maintainability
While the ideal case can lead to a nice, clean separation of concerns, inevitably some bits of application logic or view logic end up duplicated between client and server, often in different languages. Common examples are date and currency formatting, form validations, and routing logic. This makes maintenance a nightmare, especially for more complex apps.

### Reference
[react-isomorphic-boilerplate](https://github.com/chikara-chan/react-isomorphic-boilerplate)

### Change logs
##### v2.1.0
- Add font icon.(Using icomoon: https://icomoon.io/app/#/select)
- Add upload file.
- Add i18n.
- Directory structure change.

##### v2.0.0
- Update react to v16.
- Directory structure change.
