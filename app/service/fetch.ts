/**
 * CFetch
 * 基于原生fetch封装了拦截器功能，暴露出来的CFetch跟原生fetch用法一致，只是增加了拦截器功能。拦截器用法参考axios的拦截器用法。
 * 拦截器: interceptors
 */

// 定义用来存储拦截请求和拦截响应结果的处理和错误结果处理的函数集合
let interceptorsReq: any = [];
let interceptorsReqError: any = [];
let interceptorsRes: any = [];
let interceptorsResError: any = [];

function CFetch(input: RequestInfo | URL, init = {}) {
  // interceptorsReq是拦截请求的拦截处理函数集合
  interceptorsReq.forEach((item: any) => {
    init = item(init);
  });
  // 在原生fetch外面封装一个promise，为了在promise里面可以对fetch请求的结果做拦截处理。
  // 同时，保证CFetch函数返回的结果是个promise对象。
  return new Promise((resolve, reject) => {
    // 发起fetch请求，fetch请求的形参是接收上层函数的形参
    window
      .fetch(input, init)
      .then((res) => {
        // interceptorsRes是拦截响应结果的拦截处理函数集合
        interceptorsRes.forEach((item: any) => {
          // 拦截器对响应结果做处理，把处理后的结果返回给响应结果。
          res = item(res);
        });
        // 将拦截器处理后的响应结果resolve出去
        resolve(res);
      })
      .catch((err) => {
        // interceptorsResError是拦截响应错误结果的拦截处理函数集合
        interceptorsResError.forEach((item: any) => {
          // 拦截器对响应错误结果做处理，把处理后的结果返回给响应结果。
          err = item(err);
        });
        reject(err);
      });
  });
}

// interceptors拦截器提供request和response两种拦截器功能。
// 可以通过request和response的use方法来绑定两种拦截器的处理函数。
// use方法接收两个参数，参数为一个callback函数，callback函数用来作为拦截器的成功处理函数，errorCallback作为错误处理函数
// request.use方法会把callback放在interceptorsReq中，等待执行。
// response.use方法会把callback放在interceptorsRes中，等待执行。
// 拦截器的处理函数callback接收一个参数。
// request拦截器的callback接收的是请求发起前的config；
// response拦截器的callback接收的是网络请求的response结果。
const interceptors = {
  request: {
    use(cb: any, errorCB: any) {
      interceptorsReq.push(cb);
      errorCB && interceptorsReqError.push(errorCB);
    },
  },
  response: {
    use(cb: any, errorCB: any) {
      interceptorsRes.push(cb);
      errorCB && interceptorsResError.push(errorCB);
    },
  },
};

// 暴露导出这个对象
export { CFetch, interceptors };
