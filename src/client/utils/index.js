import request from 'superagent';

/**
* @param  {Object} opts
* @return {Object}         Return Promise
*/
function ajax(opts) {
  const defaults = {
    url: null,
    type: 'post',
    data: {},
  };

  const options = Object.assign({}, defaults, opts);
  const promise = request[options.type](options.url).withCredentials();
  Object.keys(options).forEach((key) => {
    if (!key.match(/url|type|data/)) {
      promise.set(key, options[key]);
    }
  });
  const action = options.type === 'get' ? 'query' : 'send';

  return new Promise((resolve) => {
    promise[action](options.data).then((res) => {
      resolve(res.body);
    }).catch((err) => {
      console.log(err);
    });
  });
}

/**
* @return {Object} Return url params
*/
function getURLParams() {
  const search = location.search.slice(1); // eslint-disable-line
  const rParam = /([^&]*)=([^&]*)/g;
  const ret = {};
  const param = rParam.exec(search);

  while (param) {
    const value = param[2];
    ret[param[1]] = value;
  }

  return ret;
}

export default {
  ajax,
  getURLParams,
};
