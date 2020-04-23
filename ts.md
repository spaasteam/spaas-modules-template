### nuxt配置ts

1.安装所需插件

- yarn add -D @nuxt/typescript ts-node @types/node @nuxt/typescript-build @nuxt/types @nuxt/typescript-runtime
- yarn add  vue-property-decorator

2.[ts语法糖](https://github.com/kaorun343/vue-property-decorator)

3.在 nuxt.config.js 文件中配置 ts 的 loader
```js
{
    test: /\.ts$/,
    exclude: [/node_modules/, /vendor/, /\.nuxt/],
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/, /TSX\.vue$/],
      transpileOnly: true,
    },
 }
   ```
以及添加 **buildModules: ['@nuxt/typescript-build']**

### nuxt已经支持lang="ts/tsx"写法


### 引入ts问题


1.tslint是否需要加？
 
  暂定
  
2.vue-property-decorator 与@vue/composition-api 对比？


>区别：

- 1.出品地方
 
    [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)社区出品

    [vue-class-component](https://class-component.vuejs.org/)官方出品

- 2.内部区别
   
   1.vue-class-component提供了Vue、Component等

   2.vue-property-decorator深度依赖了vue-class-component，拓展出了更多操作符：@Prop、@Emit、@Inject、@Model、@Provide、@Watch
   
   3.vue-property-decorator在vue-class-component的基础上增加了更多与Vue相关的装饰器，使Vue组件更好的跟TS结合使用。这两者都是离不开装饰器的，（decorator）装饰器已在ES提案中。Decorator是装饰器模式的实践。装饰器模式呢，它是继承关系的一个替代方案。动态地给对象添加额外的职责。

- 3.使用vuex
  
  1.如果引入了vue-property-decorator，但使用vuex，必须引用vuex-class

vue-property-decorator 优点
- 装饰器
  
    1.@Component (from vue-class-component)
    
    2.@Prop
    
    3.@Model
    
    4.@Watch
    
    5.@Emit
    
    6.@Inject
    
    7.@Provide


综合以上描述,故使用vue-property-decorator


### FAQ：

1.typscript中是无法识别非代码资源
 
 参考连接：[typscript中是无法识别非代码资源](https://www.cnblogs.com/chen-cong/p/10445635.html)

 解决方法： declare module 'xxx'

2.当引入外部文件时，记得声明文件。以防出现错误

3.Property 'validate' does not exist on type 'Element | Element[] | Vue | Vue[]'. Property 'valid...
[参考](https://www.jianshu.com/p/36bd22333a70)

4.Property '$message' does not exist on type 
参考:
```js
this['$message']
```