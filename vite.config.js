import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import pxtoviewport from 'postcss-px-to-viewport-8-plugin'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
// 实现 Vue及Vue相关的库、api的 按需加载
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig(({ mode }) => {
  // console.log(command)
  // 开发环境下 command 的值为 serve，生产环境下为 build

  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  // const env = loadEnv(mode, process.cwd(), '')
  const env = loadEnv(mode, process.cwd())
  console.log('122222')
  console.log(env)

  return {
    define: {
      __AAA__: JSON.stringify('fffffs')
    },
    base: env.VITE_BASE_URL,
    plugins: [
      vue(),
      viteCompression({
        algorithm: 'gzip', // 压缩算法，可选['gzip'，'brotliCompress'，'deflate'，'deflateRaw']
        threshold: 1024, // 如果体积大于阈值，则进行压缩，单位为b
        deleteOriginFile: false // 压缩后是否删除源文件
      }),
      Components({
        // dirs: ['src/**/components', 'components'], // 需要自动引入的目录，默认components
        extensions: ['vue'], // 引入文件的后缀名
        // extensions: ['vue', 'md'],
        // dts: false, // 是否生成components.d.ts文件，用于查看导入了哪些组件，默认true
        resolvers: [VantResolver()]
      }),
      AutoImport({
        eslintrc: {
          // 在项目根目录生成类型文件 .eslintrc-auto-import.json ，确保该文件在 eslint 配置中被 extends
          enabled: true,
          globalsPropValue: true
        },
        // dts: false,  // 是否生成auto-imports.d.ts文件，用于查看导入了哪些API
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            vant: ['showToast', 'showDialog', 'showNotify', 'showImagePreview']
          }
        ]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      // target: 'esnext'
    },
    css: {
      // 样式配置
      postcss: {
        // postcss配置
        plugins: [
          // postcss插件列表
          // postcssPresetEnv(), // 转换现代 CSS 语法，使其兼容旧版浏览器。
          // autoprefixer(), // 自动添加 CSS 浏览器前缀。
          // cssnano(), // 压缩和优化 CSS 代码。
          pxtoviewport({
            unitToConvert: 'px', // 需要转换的单位，默认为"px"
            viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度
            unitPrecision: 6, // 小数点后保留位数
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: ['ignore', 'hairlines'], // 需要忽略的CSS类名，不会转为视口单位，使用原有的px等单位
            minPixelValue: 1, // 设置最小的转换数值，只有大于该值时才会转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, // 是否直接更换属性值而不添加备用属性
            exclude: /(\/|\\)(node_modules)(\/|\\)/ // 排除指定文件目录下的文件，正则匹配
          })
        ]
      },
      preprocessorOptions: {
        // 预处理器选项配置，less/sass/scss
        less: {
          // less相关配置
          map: true, // 是否生成 Source Map 文件，默认为 true。
          javascriptEnabled: true, // 开启预处理器中 JavaScript 语法的支持，一些预处理器（如 Less）中提供了类似 JS 的语法，需要开启该选项才能使用。
          math: 'always', // 在 Less 中启用 math 计算功能
          additionalData: '', // 用于配置额外的 CSS 代码，例如可以在其中添加一些基础的样式或 Reset 样式表。
          globalVars: {
            //  Less 特有的配置选项，用于定义全局变量。这些全局变量可以在整个样式表中使用。
            blue: '#1CC0FF'
          }
        }
      }
    }
  }
})
