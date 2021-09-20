export function* onRequestSaga(request) {
  const { path, opts = {}, hidden = false, refresh = false } = request.args;
  const method = (opts && opts.method) || 'GET';

  const options = { ...opts };
  const additionalHeaders = {};
  const url = path;
  options.headers = { ...options.headers, ...additionalHeaders };

  // all request bodies we stringify
  if (options && options.body) {
    options.body = JSON.stringify(options.body);
  }

  const requestPayload = yield {
    url,
    method,
    ...options,
    meta: {
      path,
      method,
      origReq: request,
    },
    responseType: 'text',
  };

  return requestPayload;
}

export function* onSuccessSaga(response, action) {
  // check for session to be aborted and perform ops.
  return response;
}

export function* onErrorSaga(error, action) {
  const { path, method, origReq } = action.request.meta;

  if (error.status >= 400 && error.status < 500) {
    //perform clean up
    return { error };
  }

  //have a delay and retry logic

  return { error };
}

export function* onAbortSaga(action) {
  //dispatch api complete action
}