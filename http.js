/**
 * 通用uni-app网络请求
 *
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
export default {
    config: {
        baseUrl: "",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data: {},
        method: "GET",
        dataType: "json",
        /* 如设为json，会对返回的数据做一次 JSON.parse */
        responseType: "text",
        success() {},
        fail() {},
        complete() {}
    },
    interceptor: {
        request: null,
        response: null,
        error: null
    },
    request(options) {
        if (!options) {
            options = {}
        }
        options.baseUrl = options.baseUrl || this.config.baseUrl
        options.dataType = options.dataType || this.config.dataType
        options.url = options.baseUrl + options.url
        options.data = options.data || {}
        options.method = options.method || this.config.method

        return new Promise((resolve, reject) => {
            options.complete = (response) => {
                if (response.statusCode == 200) {
                    if (this.interceptor.response) {
                        response = this.interceptor.response(response)
                    }
                    resolve(response)
                } else {
                    if (this.interceptor.error) {
                        response = this.interceptor.error(response)
                    }
                    reject(response)
                }
            }

            const config = Object.assign({}, this.config, options)

            if (this.interceptor.request) {
                this.interceptor.request(config)
            }

            uni.request(config);
        });
    },
    get(url, data, options) {
        if (!options) {
            options = {}
        }
        options.url = url
        options.data = data
        options.method = 'GET'
        return this.request(options)
    },
    post(url, data, options) {
        if (!options) {
            options = {}
        }
        options.url = url
        options.data = data
        options.method = 'POST'
        return this.request(options)
    },
    put(url, data, options) {
        if (!options) {
            options = {}
        }
        options.url = url
        options.data = data
        options.method = 'PUT'
        return this.request(options)
    },
    delete(url, data, options) {
        if (!options) {
            options = {}
        }
        options.url = url
        options.data = data
        options.method = 'DELETE'
        return this.request(options)
    }
}
