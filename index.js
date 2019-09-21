import http from './http'
import store from '../store'

http.config.baseUrl = "/api/"

//设置请求前拦截器
http.interceptor.request = (config) => {
    //添加通用参数
    config.header['X-AUTH-DEVICE'] = ''

    if (store.getters.token) {
        config.header['X-AUTH-TOKEN'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}
//设置请求结束后拦截器
http.interceptor.response = (response) => {
    //判断返回状态 执行相应操作
    
    /**
     * status.succeed为0是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (!res.status.succeed) {
        uni.showToast({
            title: res.status.error_desc || res.status.error_code,
            duration: 2000
        })

        if (res.status.error_code === 100 || res.status.error_code === 101) {
            uni.showModal({
                title: '',
                content: res.status.error_desc,
                confirmText: '重新登录',
                cancelText: '取消',
                success: function (res) {
                    if (res.confirm) {
                        store.dispatch('logout').then(() => {
                            uni.navigateTo({
                                url: '/pages/index/login'
                            })
                        })
                    }
                }
            })
        }
        return Promise.reject('error')
    }
    return response;
}

http.interceptor.error = (response) => {
    if (response.statusCode == 401) {
        uni.showModal({
            title: '',
            content: '您的帐号已过期，请重新登陆',
            confirmText: '重新登录',
            cancelText: '取消',
            success: function (res) {
                if (res.confirm) {
                    store.dispatch('logout').then(() => {
                        uni.navigateTo({
                            url: '/pages/index/login'
                        })
                    })
                }
            }
        })
    } else {
      uni.showModal({
          title: '温馨提示',
          content: response.data
      })
    }
    return Promise.reject(response)
}

export function get(url, params) {
    return http.get(url, params)
}

export function post(url, params) {
    return http.post(url, params)
}
