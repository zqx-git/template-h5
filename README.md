# vue3-demo

## 引入组件库

### postcss-px-to-viewport-8-plugin

说明：px-to-vw

### vite-plugin-compression

说明：打包后文件 gizp 压缩

### less

说明：css 预处理器

### Vant

说明：组件库

### unplugin-vue-components、unplugin-auto-import

说明：按需自动加载 UI 组件、按需自动加载 api 插件

### eslint

说明：格式化校验

### eslint-config-prettier

说明：解决 eslint 和 prettier 冲突，以 prettier 为主

### stylelint

说明：style 自动修复及其书写顺序

### stylelint-config-standard

说明：stylelint 推荐规范文件

### stylelint-config-recommended-vue

说明：在 vue3 中使用 stylelint

### stylelint-order

说明：给样式排序

"stylelint": "^15.10.2",
"stylelint-config-recommended-less": "^1.0.4",
"stylelint-config-recommended-vue": "^1.5.0",
"stylelint-config-standard": "^34.0.0",
"stylelint-less": "^1.0.8",
"stylelint-order": "^6.0.3",

# 未解决的问题

## 使用 define 的全局变量不被 eslint 识别

vite.config.js 中添加 define：{**AAA**: JSON.stringify('fffffs')}，AutoImport 的 eslintrc 配置没有导入 define 的选项。生成的.eslintrc-auto-import.json 文件内，没有**AAA**，全局使用**AAA**会提示：'**AAA**' is not defined.临时解决方案：1. 在.eslintrc.cjs 内手动添加 globals: { **AAA**: 'readonly' } 2. 在.eslintrc-auto-import.json 内"globals"中手动添加"**AAA**": true。

# 模块介绍

## 路由模块

### 实现功能：

自动引入：写在 views 内的所有 Index.vue 都会被添加为路由，如：src/views/address/add/quota/Index.vue，路由地址为/address/add/quota。原理：import.meta.glob
支持嵌套路由：嵌套路由。原理：将 import.meta.glob 获取到的组件，以 path 为判断标准，进行树状结构还原。
路由懒加载：懒加载。原理：import.meta.glob 匹配到的文件默认是懒加载的，通过动态导入实现。
自定义 meta: 在 router.beforeResolve 中给 meta 赋值，此时已经拿到路由对应的组件，可进行操作。

### 踩坑过程：

原计划使用 import.meta.glob 拿到所有组件，发现拿到的是扁平化数组，想到要做嵌套路由（h5 其实很少用到嵌套路由，只想到一个应用场景：tabbar 或导航栏之类的公共组件），嵌套路由使用扁平化的数组无法直接遍历生成。
那么是否能直接拿到树状结构？查看文档发现 import.meta.glob 不支持，于是准备改用 node 的 fs 和 path 模块。项目内无法使用 node 模块，只能在最外层加一个 router.config.js 文件，在 vite.config.js 引入调用，然后使用 vite 定义全局常量替换 define: { **ROUTES**: **ROUTES** },再次在 router/index.js 将**ROUTES**加入路由信息，这么一套下来更麻烦了。
于是又改为采用原计划，使用 import.meta.glob 拿到所有组件，再手动将扁平化数组转为树状结构。刚开始想法是根据 path 的/先进行分割，然后逐步判断。比如当前路径为/a/b/c/d，那么先判断/下有无/a，/下有/a，则在/a 下判断有无/a/b，无则继续在/下判断有无/a/b，/a 下有/a/b，则在/a/b 下判断有无/a/b/c，无则继续在/a 下判断有无/a/b/c，/a/b 下有/a/b/c，则在/a/b/c 的 children 内添加/a/b/c/d......想着想着觉得不对劲，并且越看越乱，简单的算法被我搞这么复杂。
突然灵机一动，想到直接判断要添加的路径是否以已有的路由路径开头（startsWith），比如要加一个路由/a/b/c/d，判断/a/b/c/d 是否以路由 path 开头，是的话判断是否有 children，继续在 children 内判断，否的话直接加当前路由同级。
实际发现给/list/address 添加子路由 add 的时候，会添加到/list/add 下面，应该是/list/address/add，结果变成了/list/add/add，因为/list/address/add 也是以/list/add 开头的，当/list/add 在/list/address 前面时，就会把/add 加到/list/add 下面。
解决方案就是给 path+'/'再判断，这样保证/list/address/add 是以/list/address/开头的，而不是/list/add/
每次添加路由都要遍历路由数组，低效，对精益求精的程序员来说，这很不对，所有我在想要不要先搞成对象，操作对象比数组更优，最后再把对象转为数组，但是路由耽误的时间，暂时先这样，记一下后面优化。
这时还有一个问题，那就是如何添加 meta 信息？
写自动路由就是为了不再手动写路由 json，总不能再单独写个 json 维护吧...想来想去犯了难。
想了好久最后决定写在导入的组件内，在 script 中 export 出来，拿组件的时候，把 export 的 meta 信息加到路由信息内。那就需要拿到导入的具体模块信息，import.meta.glob 匹配到的文件默认是懒加载的，直接使用 await 获取模块信息是可行的，但打包会报错 await 不能在顶层使用，有兼容问题，配置 target: 'esnext'打包完成，发现浏览器不支持。使用 promise 进行转太过于冗余且麻烦。
如果 import.meta.glob 使用 eager: true，获取到的是同步组件内容，无法给路由的 component 使用。就这么又试了半天，发现还是不能既给路由的 component 使用，又获取组件内的 export。最后导入了两次模块信息，一个同步，一个异步，异步给路由的 component 使用，同步的给路由的 meta 使用。
看起来是没什么问题了，但又有新的问题，那就是：路由不再懒加载了。
因为使用 eager: true 之后，会把组件都加载一遍，所以 meta 信息不能在生成路由的时候添加了。
最终决定在 router.beforeEach 中给路由的 meta 赋值，但 beforeEach 还拿不到路由组件信息，于是改为在 router.beforeResolve 拿路由组件信息并修改 meta。

## 校验模块

### 实现功能：

eslint，stylelint

stylelint 踩了很多坑，新版本 15 不支持 vue3，需要安装 stylelint-config-recommended-vue 插件，在保存文件自动格式化的时候，发现 vue 文件内的 style 标签包含 lang="less"时，style 内样式不会格式化，因为不会被识别，但只要把 lang="less"去掉就可以，搜了网上博客，stylelint 用的 14 版本的，但他们用的都是 scss，说要安装 scss 什么的，less 反复实验就是不成功。折腾了半天，因为我用的是 15 版本，就以为是新版本和项目内插件的兼容问题，官方文档也看了一遍又一遍，愣是没看出问题。后来想到先 lint 校验一下试试，看看项目的 stylelint 能不能识别到，结果 npm run lint:style 发现是能识别到的，搞了半天是 vscode 没识别到，于是又翻看 vscode 插件 stylelint 的介绍文档，依旧看不出问题，最后发现 stylelint.config 未设置，设置为和项目一致，完美解决。
