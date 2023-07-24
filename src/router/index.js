// 做全局路由拦截

import { createRouter, createWebHistory } from 'vue-router'
import { verifyLogin } from '../utils/user/index'

console.log(import.meta.env.VITE_BASE_URL)

const modules = import.meta.glob('@/views/**/Index.vue')
// const modulesAsync = import.meta.glob("@/views/**/Index.vue", { eager: true })
// // 异步获取modules之后，获取default导出就比较困难，会产生大量冗余代码且不好操作
// // 暂时再新增一个modulesAsync对象，获取同步得到的modules
// 如果这样做，就会无法懒加载，还是得用异步的操作
// 想要懒加载，就无法提前拿到default，看能不能在路由跳转前做拦截，给meta赋值，

// console.log('----------获取路由模块扁平化数组(异步)----------')
console.log(modules)
// console.log(modulesAsync)

// 可以判断是否有父级路由，有的话作为父级路由的子路由，否则为一级路由，h5好像基本不会有嵌套路由的情况。
// 如果页面都需要导航栏之类的公共组件，嵌套路由操作会更简洁，目前想到的应用场景只有这个。
// 如果做嵌套路由，那么同类型就要区分文件夹，不过可以是否有Index为区分，加文件夹实现。

// 嵌套路由
// 取当前path的上层路由
// .replace(/\/[^/]*$/g, '')
// 判断当前路由是否已存在路由表，如果存在，则往改路由中添加子路由，这样每次都要遍历整个路由表，低效。
// 以路由来判断，
// 直接操作对象，对象再转数组还是操作数组更优呢？先直接操作数组吧

// 当前路径为/a/b/c/d
// 先判断/下有无/a
// /下有/a，则在/a下判断有无/a/b，无则继续在/下判断有无/a/b
// /a下有/a/b，则在/a/b下判断有无/a/b/c，无则继续在/a下判断有无/a/b/c
// /a/b下有/a/b/c，则在/a/b/c的children内添加/a/b/c/d

// /a/b/c/d/e
// /a   /a/b  /a/b/c  /a/b/c/d
// .find(obj => obj.id === 2);

// 要添加的路径是否以已有的路由路径开头

// 是否以当前路由开头，是的话判断是否有children，继续在children内判断，否的话直接加当前路由同级

//     }
//   }
// }

let routes = []

// 将获取的扁平化模块转为路由树结构
async function initRoute(routes, path, component) {
  console.log('---------------1.5')
  let route = routes.find((obj) => path.startsWith(obj.path + '/'))
  if (route) {
    if (route.children) {
      initRoute(route.children, path, component)
    } else {
      route.children = []
      route.children.push({
        path,
        name: path.replace(/\/(\w)/g, (match, p1) => {
          return p1.toUpperCase()
        }),
        component
      })
    }
  } else {
    routes.push({
      path,
      name: path.replace(/\/(\w)/g, (match) => {
        return match[1].toUpperCase()
      }),
      component
    })
  }
  console.log('---------------1.6')
}

const regex = /\/src\/views(.*?)\/Index\.vue/

for (const key in modules) {
  if (Object.hasOwnProperty.call(modules, key)) {
    // initRoute(routes, key.match(regex)[1], key, {})
    initRoute(routes, key.match(regex)[1], modules[key])
  }
}

console.log('-------------------routes---------------------')
console.log(routes)
console.log('-------------------routes---------------------')

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    // {
    //     path: "/403",
    //     name: "403",
    //     component: () => import("/admin/src/views/403/Index.vue"),
    //     meta: {}
    //   },
    //   {
    //     path: "/404",
    //     name: "404",
    //     component: () => import("/admin/src/views/404/Index.vue"),
    //     meta: {}
    //   },
    //   {
    //     path: "/about",
    //     name: "About",
    //     component: () => import("/admin/src/views/about/Index.vue"),
    //     meta: {}
    //   },
    //   {
    //     path: "/add",
    //     name: "Add",
    //     meta: {},
    //     component: () => import("/admin/src/views/add/Index.vue"),
    //     children: [
    //         {
    //             path: "/add/add",
    //             name: "AddAdd",
    //             component: () => import("/admin/src/views/add/add/Index.vue"),
    //             meta: {},
    //             children: [
    //                 {
    //                     path: "/add/add/quota",
    //                     component: () => import("/admin/src/views/add/add/quota/Index.vue"),
    //                     name: "AddAddQuota"
    //                 },
    //                 {
    //                     path: "/add/add/quota2",
    //                     component: () => import("/admin/src/views/add/add/quota2/Index.vue"),
    //                     name: "AddAddQuota2"
    //                 }
    //             ]
    //         },
    //         {
    //             path: "/add/del-all",
    //             component: () => import("/admin/src/views/add/del-all/Index.vue"),
    //             name: "AddDel-all"
    //           },
    //           {
    //             path: "/add/edit",
    //             component: () => import("/admin/src/views/add/edit/Index.vue"),
    //             name: "AddEdit",
    //             children: [
    //               {
    //                 path: "/add/edit/quota",
    //                 component: () => import("/admin/src/views/add/edit/quota/Index.vue"),
    //                 name: "AddEditQuota"
    //               },
    //               {
    //                 path: "/add/edit/quota2",
    //                 component: () => import("/admin/src/views/add/edit/quota2/Index.vue"),
    //                 name: "AddEditQuota2"
    //               }
    //             ]
    //           },
    //           {
    //             path: "/add/list",
    //             component: () => import("/admin/src/views/add/list/Index.vue"),
    //             name: "AddList"
    //         }
    //     ]
    // },
    // {
    //     path: "/address",
    //     name: "Address",
    //     component: () => import("/admin/src/views/address/Index.vue"),
    //     meta: {},
    //     children: [
    //         {
    //             path: "/address/add",
    //             name: "AddressAdd",
    //             component: () => import("/admin/src/views/address/add/Index.vue"),

    //             meta: {},
    //             children: [
    //                 {
    //                     path: "/address/add/quota",
    //                     component: () => import("/admin/src/views/address/add/quota/Index.vue"),
    //                     name: "AddressAddQuota"
    //                 },
    //                 {
    //                     path: "/address/add/quota2",
    //                     component: () => import("/admin/src/views/address/add/quota2/Index.vue"),
    //                     name: "AddressAddQuota2"
    //                 }
    //             ]
    //         },
    //         {
    //             path: "/address/del-all",
    //             component: () => import("/admin/src/views/address/del-all/Index.vue"),
    //             name: "AddressDel-all"
    //           },
    //           {
    //             path: "/address/edit",
    //             component: () => import("/admin/src/views/address/edit/Index.vue"),
    //             name: "AddressEdit",
    //             children: [
    //               {
    //                     path: "/address/edit/quota",
    //                     component: () => import("/admin/src/views/address/edit/quota/Index.vue"),
    //                     name: "AddressEditQuota"
    //                   },
    //                   {
    //                     path: "/address/edit/quota2",
    //                     component: () => import("/admin/src/views/address/edit/quota2/Index.vue"),
    //                     name: "AddressEditQuota2"
    //                 }
    //             ]
    //         },
    //         {
    //             path: "/address/list",
    //             name: "AddressList"
    //         }
    //     ]
    // },
    // {
    //     path: "/home",
    //     name: "Home",
    //     component: () => import("/admin/src/views/home/Index.vue"),
    //     meta: {
    //         name: "home",
    //         isRouter: true,
    //         auth: false
    //     },
    //     children: [
    //         {
    //             path: "/home/aa",
    //             name: "HomeAa",
    //             component: () => import("/admin/src/views/home/aa/Index.vue"),
    //             meta: {
    //                 name: "homeaa",
    //                 isRouter: true,
    //                 auth: false
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: "/notfond",
    //     name: "Notfond",
    //     component: () => import("/admin/src/views/notfond/Index.vue"),
    //     meta: {}

    // }
    // {
    //   path: "/about",
    //   name: "Test",
    //   meta: {
    //     title: "Debugger",
    //   },
    //   component: () => import("@/views/test/index.vue"),
    // }
    ...routes
  ]
})

// router.beforeEach(async (to, from, next) => {
//   console.log(to)
//   const componentMeta = to.matched[to.matched.length-1].components.default
//   // 对组件的默认导出对象进行操作
//   console.log('componentMeta')
//   console.log(componentMeta)
//   // to.meta = await componentMeta().meta
//   // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   // else
//   next()
// })

router.beforeResolve(async (to, from, next) => {
  console.log(to)
  console.log(from)
  const componentMeta = to.matched[to.matched.length - 1].components.default
  console.log('componentMeta')
  console.log(componentMeta)
  // 对组件的默认导出对象进行操作
  to.meta = componentMeta.meta
  // 进行路由拦截
  console.log('to.meta')
  console.log(to.meta)

  if (!to?.meta?.auth) {
    console.log('不需要登录，直接去页面')
    next()
  } else if (await verifyLogin()) {
    console.log('需要登录，并且已登录，直接去页面')
    next()
  } else {
    console.log('需要登录，未登录，跳登录')
    next('/login')
  }
})
router.afterEach((to) => {
  console.log('afterEach---to')
  console.log(to.meta)
  // 修改页面标题
  document.title = to?.meta?.title || '默认标题'
})

console.log(router)

export default router
