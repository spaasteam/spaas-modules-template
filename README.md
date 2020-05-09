<!--
 * @Description: 项目说明文档
 * @Author: barret
 * @Date: 2019-07-22 14:04:01
 * @LastEditTime: 2020-05-09 16:11:49
 * @LastEditors: Please set LastEditors
 -->
# spaas-admin-template
[![Build Status](https://travis-ci.com/levy9527/nuxt-element-dashboard.svg?branch=master)](https://travis-ci.com/levy9527/nuxt-element-dashboard)[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/levy9527/nuxt-element-dashboard/pulls)[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

## Table of Contents

- **[Changelog](#changelog)**
- **[Feature](#feature)**
- **[快速开始](#快速开始)**
- **[工程结构](#工程结构)**
- **[开发](#开发)**
  - **[新建页面](#新建页面)**
  - **[TS指南](#TS使用指南)**
  - **[调用接口](#调用接口)**
  - **[CRUD](#CRUD)**
  - **[设置代理](#设置代理)**
  - **[使用Pont](#使用Pont)**
- **[环境变量](#环境变量)**
- **[构建](#构建)**
- **[License](#license)**
- **[单独部署](#单独部署)**
- **[快速生成文件模板](#快速生成文件模板)**
- **[commit规范](#commit规范)**

## Changelog
[详细更新内容](https://github.com/spaasteam/spaas-admin-template/blob/master/CHANGELOG.md)

## Feature

在[Nuxt.js](https://github.com/nuxt/nuxt.js)的基础上，集成以下技术栈：

- UI库：[element-ui](http://element.eleme.io/#/)
- ajax库： [axios](https://github.com/axios/axios)
- css预处理器：[less](http://lesscss.org/)
- 代码格式化：[prettier](https://github.com/prettier/prettier)
- 环境变量: [dotenv](https://www.npmjs.com/package/dotenv)

[⬆ Back to Top](#table-of-contents)

## 快速开始

```bash
# 安装依赖
yarn

# 使用mock接口进行开发
yarn mock

# 使用mock接口进行开发，且不会有登录拦截
yarn mock:nologin

# 使用后端接口进行开发
yarn dev

# 使用webpack进行生产构建
yarn build

# 生成静态站点
yarn generate
```

[⬆ Back to Top](#table-of-contents)

## 工程结构

``` 
spaas-modules-template
├─ .babelrc
├─ .editorconfig
├─ .env
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .grenrc.js
├─ .mocks
│    └─ mocks.ts
├─ .npmignore
├─ .npmrc
├─ .prettierignore
├─ .prettierrc
├─ .stylelintrc
├─ .travis.yml
├─ CHANGELOG.md
├─ README.md
├─ build.sh
├─ jsconfig.json
├─ main
│    ├─ api
│    │    ├─ api-lock.json
│    │    ├─ api.d.ts
│    │    ├─ index.ts
│    │    └─ petstore
│    ├─ components                             公用组件
│    │    ├─ NoPermission                                无权限
│    │    ├─ NotExist                                     404
│    │    ├─ RightPanel                                   右侧面板（开发模式专用）
│    │    ├─ Sticky                                       
│    │    ├─ SvgIcon                                      SVG
│    │    ├─ copyright.vue                                公共底部
│    │    ├─ icon-font.vue                                icon组件
│    │    ├─ layoutHead                                   公共头部
│    │    ├─ menu-list                                    菜单栏
│    │    ├─ route-tab.vue                                路由切换
│    │    └─ scrollbar                                    滚动条
│    ├─ config
│    │    ├─ pont-config.json
│    │    └─ pont-template-nuxt.ts
│    ├─ const                                 常量文件夹
│    │    ├─ config.ts                                    配置静态文件
│    │    ├─ cookie-keys.ts                               存储的 cookie key 数组
│    │    ├─ filter.ts                                    日期转换filter
│    │    ├─ meta.ts                                      meta配置信息
│    │    ├─ pattern.ts                                   正则校验文件
│    │    └─ route-info.json                              面包屑配置文件
│    ├─ icons                                 icon
│    │    ├─ index.ts
│    │    ├─ svg
│    │    └─ svgo.yml
│    ├─ layouts                               公共模板
│    │    ├─ default.vue                                  默认模板
│    │    └─ login.vue                                    登录模板
│    ├─ libs                                 pont-libs
│    │    └─ fetch.ts                                     重写fetch
│    ├─ middleware                            中间件
│    │    ├─ auth.ts                                      路由鉴权中间件
│    │    ├─ breadcrubMixin                               面包屑
│    │    └─ emitter.ts                                   发送/接收组件
│    ├─ nuxt.config.js                       nuxt入口配置文件
│    ├─ pages                                nuxt 自动生成路由
│    │    ├─ _.vue
│    │    ├─ icons.vue
│    │    ├─ index.vue
│    │    ├─ login.vue
│    │    └─ noPermission.vue
│    ├─ plugins                              应用插件，在Vue.js 初始化前运行，可在这里引入第三方类库
│    │    ├─ README.md
│    │    ├─ apiInject.ts                                 pont注册api文件
│    │    ├─ axios-port.ts                                全局注册server文件
│    │    ├─ axios.ts                                     
│    │    ├─ element.ts                                   引入 element-ui 组件
│    │    ├─ globalPlugin.ts                              
│    │    ├─ router.ts                                    修改页面title文件
│    │    └─ store.ts                                     
│    ├─ services                             api请求文件夹
│    │    ├─ README.md
│    │    ├─ apiClient.ts
│    │    └─ v1
│    ├─ static                               静态资源目录
│    │    ├─ README.md
│    │    ├─ default_icon.svg
│    │    └─ favicon.ico
│    ├─ store                               vuex 状态管理
│    │    ├─ app.ts
│    │    ├─ index.ts
│    │    └─ types.ts
│    ├─ styles                              样式文件夹
│    │    ├─ README.md
│    │    ├─ export.less 
│    │    ├─ global.less                                全局混入
│    │    ├─ reset.less                                 样式重置
│    │    └─ var.less                                   样式变量，支持less变量自动引入，即不用在less中import就能直接使用变量
│    ├─ types                               声明types
│    │    ├─ element-global.d.ts
│    │    ├─ images.d.ts
│    │    ├─ json.d.ts
│    │    ├─ less.d.ts
│    │    ├─ nuxt.d.ts
│    │    └─ vue-shims.d.ts
│    ├─ utils                              工具函数库
│    │    ├─ clipboard.ts
│    │    ├─ type.ts
│    │    └─ utils.ts
│    └─ views                              编写页面代码的地方, 因为pages下创建 `components` 会加载出路由，所以在这里拆分路由方便就近管理原则
│           ├─ icons
│           ├─ index
│           ├─ login
│           └─ main-layout
├─ modules                                子应用文件
├─ package.json
├─ proxy.config.ts                       上下文js
├─ spaas.config.js
├─ ts.md                                 Ts一些FAQ
├─ tsconfig.json
└─ yarn.lock
```
[⬆ Back to Top](#table-of-contents)

## 开发

### 新建页面

Nuxt.js 会依据 `pages` 目录中的所有 `*.vue` 文件生成应用的路由配置

在`pages`目录下新建一个名为 `hello.vue` 的页面

```html
<template>
  <h1>Hello world!</h1>
</template>
```

即可在 <http://localhost:3000/hello> 访问到新建的页面

[⬆ Back to Top](#table-of-contents)

### TS使用指南

#### [用法](https://github.com/kaorun343/vue-property-decorator)

#### 例子

``` js
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Watch('child')
  onChildChanged(val: string, oldVal: string) {}

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged1(val: Person, oldVal: Person) {}

  @Watch('person')
  onPersonChanged2(val: Person, oldVal: Person) {}
}
```
#### 你想写的更飘逸吗？下边demo供你查看
  1.[blog-vue-typescript](https://github.com/biaochenxuying/blog-vue-typescript)

#### Ts指南
  1.https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Functions.html
  2.https://jkchao.github.io/typescript-book-chinese/

[⬆ Back to Top](#table-of-contents)

### 调用接口

使用`this.$axios` 调用接口：

- 建议使用`$get $post $[methods]`等方法，respone中会直接返回请求的body
- 可以在 `*.vue` 文件中的生命周期钩子函数中调用
- 可以在 `methods` 里调用
- 可以在 `store/*.ts` 的 `actions` 里调用

```js
// vue文件
export default {
  mounted() {
    this.$axios.$get(url)
  },
  methods: {
    fetchData() {
      this.$axios.$get(url)
    }
  }
}
```

```js
// store/index.ts
export const actions = {
  async fetchData({commit}, {params}) {
    let resp = await this.$axios.$get(url, {params})
    commit('update', resp)
  }
}
```

[⬆ Back to Top](#table-of-contents)

### CRUD

注意方法前有$

```js
// GET 请求
this.$axios.$get('/users', {params: {key: value})
.then(resp => {
})
.catch(e => {})
```

```js
// POST 请求
this.$axios.$post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
 .then(resp => {
  })
.catch(e => {})
```

```js
// PUT 请求
this.$axios.$put('/user/1', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
 .then(resp => {
  })
.catch(e => {})
```

```js
// DELETE 请求
this.$axios.$delete('/user/1')
 .then(resp => {
  })
.catch(e => {})
```

```js
// 或
this.$axios({
  method: 'delete',
  url: '/users',
  data: {
    rows: [1,2],
  }
})
```

[⬆ Back to Top](#table-of-contents)

### 设置代理

开发时，api使用的都是相对路径，通过代理来解决跨域问题。

在 `nuxt.config.js` 中找到 `config` 变量，修改 `mock` 设置：

```sh
env: {
    mock: {
      '/api': 'http://mock.api.server',
    },
    dev: {
      '/api': 'http://real.api.server',
    }
  }
```

则对于所有以 `/api` 开头的请求：

1. 在 `yarn mock` 模式下，都会变成 `http://mock.api.server/api`

1. 在 `yarn dev` 模式下，都会变成 `http://real.api.server/api`

**注意，每次修改代理设置，都需要重新启动应用才能生效**

## 使用Pont

[![Pont接入指南](https://s1.ax1x.com/2020/05/07/YZUeCF.png)](https://imgchr.com/i/YZUeCF)

###  使用
#### 全局安装pont
  npm i -g pont-engine
#### VSvode插件
  Pont

### 本地MOCK

``` js
export default {
  '/petstore': {
    target: "http://127.0.0.1:8111",  //端口为pont-config.json里边的port，其他默认
    pathRewrite: {
      '^/petstore/': '/v2/'
    }
  }
};
```




### 调用

`eg:`

``` js
<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component({})
export default class AppType extends Vue {
  created() {
    console.log(
      this.$api.petstore.pet.findPetsByStatus
        .request({
          status: 'sold'
        })
        .then(res => {
          console.log(res)
        }),
      '11'
    )
  }
}
</script>
```

### 接口diff

因Pont是通过api文件里边的接口进行diff接口改动的，所以多人合作时，因避免多次拉取接口，以免造成冲突

### Pont文档（https://github.com/alibaba/pont）


### [详细教程请异步](https://deepexi.yuque.com/spaas/flnw3h/qlsfst)


[⬆ Back to Top](#table-of-contents)

## 环境变量

使用.env设置环境变量, 即在项目根目录新建一个.env文件, 填写环境变量即可。

**注意，该文件不能提交至版本控制系统中。**

.env文件示例:

```sh
# 左边是变量名(一般大写，下划线分割单词)，右边是变量值
# 注意=号两边不能有空格
TESTING_VAR=just-fot-testing
ANOTHER_VAR=another
```

可以在项目的vue文件或js文件中读取

```js
mounted() {
  console.log(process.env.TESTING_VAR) // 输出 just-fot-testing
}
```

**自带的环境变量说明**

| 环境变量名  | 说明                                                         | 是否必须             | 默认值                   | 示例 |
| ----------- | ------------------------------------------------------------ | ----------------------- | ------------------------- | ----------- |
| PUBLIC_PATH | 对应webpack的publicPath，用于指定静态文件访问路径 | 是 |  | http://cdn.deepexi.com |
| API_SERVER | axios的baseURL，可不传。不传时，使用相对路径发送请求 | 否 |    | https://www.easy-mock.com |
| NO_LOGIN    | 是否登陆拦截，传1则不会有登录拦截                            | 否 |                          | 1 |
| COOKIE_PATH | 用于设置cookie的path，如果多个项目需要共享cookie，则应该保证项目在共同的目录下，且设置COOKIE_PATH为它们的共同目录地址 | 否                      | /                   | /xpaas |

## less 样式变量

框架引入了 @nuxtjs/style-resources 模块，会在所有 less 文件中自动引入配置的 less 文件。相关配置在 nuxt.config.js 中，配置项 styleResources。配置后，需要使用 var.less 中的变量时，不用自己引入样式文件。

具体配置[点击此处](https://github.com/nuxt-community/style-resources-module)

```js
styleResources: {
  less: '~assets/var.less'
},
```


[⬆ Back to Top](#table-of-contents)

## 构建

构建会读取根目录下的.env文件获取环境变量, 默认生成的是hash路由模式的spa, 在`dist`目录输出静态文件

命令如下:

```sh
yarn build
```

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)



## 单独部署

```js
.env 加上

SINGLE_BUILD=1
```

[⬆ Back to Top](#table-of-contents)




## 快速生成文件模板


- 使用
 ```js
  yarn new or npm run new

  view 是创建视图文件
  component 生成全局组件模板
 ```

  ![image](https://deepexi-spaas.oss-cn-shenzhen.aliyuncs.com/uat/spaas-cli/WX20190716-143202%402x.png)

### component 选项

 选中选项后会要求输入组件名字，确认后会在 src/compoennts 下创建输入的组件目录


### view

> 关于是否是 index 这个选项，说实话，我也想不到其他好的描述方式，只能在这里描述下这个功能的作用
>
> 首先，我们写一个 view 文件，有可能只有一个页面，这时候，它就不是 index 
>
> 如果我们写一个 view 文件是一个列表页，它的增加，修改需要跳转页面，则需要在同级目录下为其创建额外的路由，这时候它就是 index


参数说明

- isIndex

  - 为 true 时 主要在 pages 下创建多了一个 以 name 命名的文件夹后又为它创建了 index.vue 引入

  ![image](https://deepexi-spaas.oss-cn-shenzhen.aliyuncs.com/uat/spaas-cli/1.png)

  - 为 false 时 直接为 pages 对应目录创建了 name.vue

  ![image](https://deepexi-spaas.oss-cn-shenzhen.aliyuncs.com/uat/spaas-cli/2.png)


- choice template
现在有 default，常规模板, data-table 一个简单的 table 模板

  ![image](https://deepexi-spaas.oss-cn-shenzhen.aliyuncs.com/uat/spaas-cli/template.png)

- choice appType  

  应用下拉框类型选择  
  1：enable（显示）
  2：none（不显示）
  3：disabled（显示并不可编辑）

  ![image](https://deepexi-spaas.oss-cn-shenzhen.aliyuncs.com/uat/spaas-cli/appType.png)

- 流程

  ![流程图](https://deepexi-spaas.oss-cn-shenzhen.aliyuncs.com/uat/spaas-cli/%20flowChart.png)


### 路由匹配问题

![image](https://deepexi-spaas.oss-cn-shenzhen.aliyuncs.com/uat/spaas-cli/route-question.png)


[⬆ Back to Top](#table-of-contents)



### commit规范

为了流程规范化，我们采用了 git commit [规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)

共用下列类型

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing or correcting existing tests
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

这些规范有点不好记，但是我们引入了 [cz-cli](https://github.com/commitizen/cz-cli)

package.json 下引入了下面的命令

```js
"scripts": {
  "commit": "npx git-cz"
}
```



[⬆ Back to Top](#table-of-contents)
