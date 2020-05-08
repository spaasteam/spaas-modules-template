import Vue from 'vue'
import routeInfoMap from '@/const/route-info.json'
import { matchAllRoutes, getLastMatchRoute } from './utils'

const pathToRegexp = require('path-to-regexp')

interface isBcmList {
  [key: string]: Array<any>
}
// @ts-ignore
const data: isBcmList = Vue.observable({
  $bcmList: []
})

// 重置路由，并设置新值
function setBreadcrumbList(routePaths, params) {
  data.$bcmList.splice(0, data.$bcmList.length)

  routePaths.forEach(path => {
    const routeInfo = routeInfoMap[path]

    if (routeInfo) {
      const toPath = pathToRegexp.compile(path)

      data.$bcmList.push({
        path,
        fullPath: toPath(params),
        ...routeInfo
      })
    }
  })
}

const findPathIndex = path =>
  data.$bcmList.findIndex(v => v.path && pathToRegexp(v.path).test(path))

export default {
  provide: {
    ...data,
    $bcm: {
      /**
       * 设置单个
       * @param {*} path
       * @param {*} title
       */
      setTitleByPath(path, title) {
        const index = findPathIndex(path)
        if (index > -1) {
          const router = data.$bcmList[index]
          router.title = title
          delete router.render
          data.$bcmList.splice(index, 1, router)
        }
      },
      /**
       * 设置多个
       * @param {*} path
       * @param {*} array{
          "title": "测试",
          "enable": true,
          "appType": 1,
           path?: 跳转路径，如果 enable false 可以省略
       *
       * }
       */
      setMultiByPath(path, array) {
        const index = findPathIndex(path)

        if (index > -1) {
          data.$bcmList.splice(index, 1, ...array)
        }
      },
      /**
       *
       * @param {*} path  要替换的 路由 path
       * @param {*} render 传入渲染的 render 方法
       */
      setJSXByPath(path, render) {
        const index = findPathIndex(path)
        if (index > -1) {
          const router = data.$bcmList[index]
          router.render = render
          data.$bcmList.splice(index, 1, router)
        }
      }
    }
  },
  watch: {
    $route: {
      handler(this: any) {
        const { params } = this.$route

        const routePath = getLastMatchRoute(this.$route.matched)

        const routePaths = matchAllRoutes(routePath)

        setBreadcrumbList(routePaths, params)
      },
      immediate: true
    }
  }
}
