const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

function queryStringify(data) {
  let res = 'frame.html?';
  Object.entries(data).map(i => {
    res += i.toString().replace(',', '=') + '&'
  })
  res = res.slice(0, -1)
  return res;
}

class HTTPTransport {
  get = (url, options = {}) => {

    if (options.hasOwnProperty('data')) {
      url = url + this._queryStringify(options.data)
    }
    return this.request(url, {
      ...options,
      method: METHODS.GET
    }, options.timeout);
  };
  put = (url, options = {}) => {
    return this.request(url, {
      ...options,
      method: METHODS.PUT
    }, options.timeout)
  };
  post = (url, options = {}) => {
    return this.request(url, {
      ...options,
      method: METHODS.POST
    }, options.timeout)
  };
  delete = (url, options = {}) => {
    return this.request(url, {
      ...options,
      method: METHODS.DELETE
    }, options.timeout)
  };

  // PUT, POST, DELETE

  // options:
  // headers — obj
  // data — obj
  request = (url, options, timeout = 5000) => {
    console.log(options)

    let {
      methods,
      data,
      headers
    } = options;
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(methods, url);
        xhr.setRequestHeader = headers;


        xhr.timeout = timeout;
        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.ontimeout = reject;

        if (methods === METHODS.GET || !data) {
          xhr.send();
        } else {
          xhr.send(data);
        }
        xhr.onload = function () {
          resolve(xhr);
        };
      })
      .catch(err => console.log(err))
  };

  _queryStringify(data) {
    let res = 'frame.html?';
    Object.entries(data).map(i => {
      res += i.toString().replace(',', '=') + '&'
    })
    res = res.slice(0, -1)
    return res;
  }
}

const http = new HTTPTransport();

http.get('https://google.com/', {
  data: {
    a: 1,
    b: 2,
    c: {
      d: 123
    },
    k: [1, 2, 3]
  }
})
