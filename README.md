**插件使用说明**

- 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
- 下载后放到项目 js_sdk 目录下（使用HBuild X导入插件即可）

## 1. 配置 

- 请参考 [uni-app跨域解决方案（踩坑）](https://blog.csdn.net/paopao79085/article/details/91948809) 配置跨域方案

## 2. 使用示例

```js
/**
 * @/api/user.js
 */
import { get, post } from '@/js_sdk/mrpzx-request'

export function login(username, password) {
  return post('user/login', { username, password })
}
```

## 3. 其他

- 本插件配合Vuex使用，如不需要，改写index.js去掉store部分即可
- 本插件由 [封装的request网络请求](https://ext.dcloud.net.cn/plugin?id=159) 改写而来，去掉了个人不需要的东西
