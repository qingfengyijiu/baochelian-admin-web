function parseQueryParams(data) {
    let queryStr = "";
    if(data) {
        queryStr += "?";
        for(let p in data) {
            if(data[p] != null) {
                queryStr += encodeURIComponent(p) + "=" + encodeURIComponent(data[p]) + "&";
            }
        }
    }
    queryStr = queryStr.slice(0, queryStr.length - 1);
    return queryStr;
}

async function ws(options) {
    let errorHandler = options.errorHandler;
    let errorHandlerArguments = options.errorHandlerArguments;
    if(options.errorHandler) {
        delete options.errorHandler;
    }
    if(options.errorHandlerArguments) {
        delete options.errorHandlerArguments;
    }
    try {
        let response = await fetch(options.url, options);
        let data;
        if(response.ok) {
            data = await response.json();
            return data;
        } else {
            let msg = await response.text();
            data = {
                code: response.status,
                msg: msg
            }
        }
        if(typeof errorHandler === 'function') {
            errorHandler(errorHandlerArguments);
        } else {
            if(data.code == 401 || data.code == 403) {
                window.location.href = '/login';
            }
        }
        return data;
    } catch (error) {
        alert(error);
    }
}

/**
 *
 * @param options
 * @returns {{code, msg}}
 */
ws.get = async function(options) {
    options.method = "GET";
    options.credentials = "include";
    options.headers = _.assign({
        "Content-Type": "application/json"
    }, options.headers);
    if(options.data) {
        options.url = options.url + parseQueryParams(options.data);
    }
    return await ws(options);
};

ws.post = async function(options) {
    options.method = "POST";
    options.credentials = "include";
    options.headers = _.assign({
        "Content-Type": "application/json"
    }, options.headers);
    if(options.data) {
        options.body = JSON.stringify(options.data);
    }
    return await ws(options);
};

ws.delete = async function(options) {
    options.method = "DELETE";
    options.credentials = "include";
    options.headers = _.assign({
        "Content-Type": "application/json"
    }, options.headers);
    return await ws(options);
};

export default ws;
