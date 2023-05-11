// vue.config.js
const JavaScriptObfuscator = require('webpack-obfuscator')
const path = require("path");
const resolve = dir => path.join(__dirname, dir);
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const env = require('./config/prod.env')
module.exports = {
  // 项目部署的基本路径,默认假设你的应用将会部署在域名的根部,比如，https://www.vue-cli.com/
  // 如果你的应用是部署在一个子路径下，那么你需要在这里指定子路径，比如，
  // 如果你部署在 https://www.my-vue.com/my-app/; 那么将这个值改为 “/my-app/”
  publicPath: "/",
 
  // 将构建好的文件输出到哪里 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
  // 注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  outputDir: "dist",
 
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
 
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',
 
  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,
 
  // 是否在开发环境下通过eslint-loader在每次保存时lint代码。这个值会在@vue/cli-plugin-eslint 被安装之后生效。
  // 设置为 true 时, eslint-loader 会将 lint 错误输出为编译警告。默认情况下， 
  // 警告仅仅会被输出到命令行，且不会使得编译失败。
  // 如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 lintOnSave: 'error'。
  // 这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
  lintOnSave: false,
 
  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 
  // template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,
 
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式
  // 转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],
 
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
 
  // 向 CSS 相关的 loader 传递选项
  css: {
    // 当为true时，css文件名可省略 module 默认为 false
    modules: false,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    extract: false,
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    /*为预处理器 loader 传递自定义选项*/
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_variable.scss";`,// 预设全局css变量
      },
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    },
  },
 
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 
  // webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("vue$", 'vue/dist/vue.esm.js')
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("utils", resolve("src/utils"))
      .set("api", resolve("src/api"));
  },
 
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于
  //一个内核时自动启用，仅作用于生产构建。
  parallel: require("os").cpus().length > 1,
 
  // 向 PWA 插件传递选项。
  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
 
  // 所有 webpack-dev-server 的选项都支持。
  // 注意：有些值像 host、port 和 https 可能会被命令行参数覆写。
  // 有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作。
  // 本地服务配置
  devServer: {
    host: "0.0.0.0",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌
 
    // 配置跨域代理
    proxy: {
    // 说明：
    // 浏览器有同源策略不支持跨域，但服务器没有，通过proxy配置，将对于接口服务器的请求代理到本地服务器，
    // 再由本地服务器转发到接口服务器（target目标服务器），所以设置代理后，
    // 接口请求路径会变成代理服务器地址，即本地地址localhost 或者 127.0.0.1
 
    // 配置：
    // '/api'可以是任何值，表示以/api开头的请求，实际项目中所以路径以/api开头的请求都会被本地服务器转发
    '^/test': {
      // target指想要被代理的后端接口服务器地址(目标路径)(真正请求的服务器地址)
      target: 'http://test-approve.uatas.id/',
      ws: true, // 是否启用websockets
      changeOrigin: true, //是否允许跨越
      // pathRewrite用以在发送请求时，重写请求路径
      // 如果在实际的请求路径中你不希望出现/api，那么可以重写路径，在请求路径中去掉/api，如下所示
      pathRewrite: {
        // 举例：
        // 如果你的接口服务地址为：http://192.168.6.267:8080，你的接口路径为/base/company/list
        // 那么为了可以使用/api代理，你可以在接口路径前添加/api，如：/api/base/company/list
        // 那么你的请求就会被本地服务代理到真正的接口地址，解决了跨域问题
        // 但是你的请求路径就会变成：http://192.168.6.267:8080/api/base/company/list，路径中多余/api
        // 那么你可以通过重写（如下方式）去掉/api
        // 或者你可以选择将/api改为/base，就不需要重写路径了，具体的使用根据业务来决定
        '^/test': ''
      }
    }
  },
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new webpack.DefinePlugin({
            'process.env': env
          }),
          new JavaScriptObfuscator({
            rotateUnicodeArray: true, // 必须为true
            compact: true, // 紧凑 从输出混淆代码中删除换行符。
            controlFlowFlattening: false, // 此选项极大地影响了运行速度降低1.5倍的性能。 启用代码控制流展平。控制流扁平化是源代码的结构转换，阻碍了程序理解。
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: false, // 此选项大大增加了混淆代码的大小（最多200％） 此功能将随机的死代码块（即：不会执行的代码）添加到混淆输出中，从而使得更难以进行反向工程设计。
            deadCodeInjectionThreshold: 0.4,
            debugProtection: false, // 调试保护  如果您打开开发者工具，可以冻结您的浏览器。
            debugProtectionInterval: true, // 如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，这使得使用“开发人员工具”的其他功能变得更加困难。它是如何工作的？一个调用调试器的特殊代码;在整个混淆的源代码中反复插入。
            disableConsoleOutput: true, // 通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。
            domainLock: [], // 锁定混淆的源代码，使其仅在特定域和/或子域上运行。这使得有人只需复制并粘贴源代码并在别处运行就变得非常困难。多个域和子域可以将代码锁定到多个域或子域。例如，要锁定它以使代码仅在www.example.com上运行添加www.example.com，以使其在example.com的任何子域上运行，请使用.example.com。
            identifierNamesGenerator: 'hexadecimal', // 使用此选项可控制标识符（变量名称，函数名称等）的混淆方式。
            identifiersPrefix: '', // 此选项使所有全局标识符都具有特定前缀。
            inputFileName: '',
            // log: false,
            renameGlobals: false, // 不要启动 通过声明启用全局变量和函数名称的混淆。
            reservedNames: [], // 禁用模糊处理和生成标识符，这些标识符与传递的RegExp模式匹配。例如，如果添加^ someName，则混淆器将确保以someName开头的所有变量，函数名和函数参数都不会被破坏。
            reservedStrings: [], // 禁用字符串文字的转换，字符串文字与传递的RegExp模式匹配。例如，如果添加^ some * string，则混淆器将确保以某些字符串开头的所有字符串都不会移动到`stringArray`。
            rotateStringArray: true, //
            seed: 0, // 默认情况下（seed = 0），每次混淆代码时都会得到一个新结果（即：不同的变量名，插入stringArray的不同变量等）。如果需要可重复的结果，请将种子设置为特定的整数。
            selfDefending: false, // 此选项使输出代码能够抵抗格式化和变量重命名。如果试图在混淆代码上使用JavaScript美化器，代码将不再起作用，使得理解和修改它变得更加困难。需要紧凑代码设置。
            sourceMap: false, // 请确保不要上传嵌入了内嵌源代码的混淆源代码，因为它包含原始源代码。源映射可以帮助您调试混淆的Java Script源代码。如果您希望或需要在生产中进行调试，可以将单独的源映射文件上载到秘密位置，然后将浏览器指向该位置。
            sourceMapBaseUrl: '', // 这会将源的源映射嵌入到混淆代码的结果中。如果您只想在计算机上进行本地调试，则非常有用。
            sourceMapFileName: '',
            sourceMapMode: 'separate',
            stringArray: true, // 将stringArray数组移位固定和随机（在代码混淆时生成）的位置。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
            stringArrayEncoding: false, // 此选项可能会略微降低脚本速度。使用Base64或RC4对stringArray的所有字符串文字进行编码，并插入一个特殊的函数，用于在运行时将其解码回来。
            stringArrayThreshold: 0.75, // 您可以使用此设置调整字符串文字将插入stringArray的概率（从0到1）。此设置在大型代码库中很有用，因为对strin
            transformObjectKeys: true,
            unicodeEscapeSequence: false //允许启用/禁用字符串转换为unicode转义序列。Unicode转义序列大大增加了代码大小，并且可以轻松地将字符串恢复为原始视图。建议仅对小型源代码启用此选项。
          }, [])
        ]
      }
    }
  },
 
  // 第三方插件选项
  // 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。
  pluginOptions: {}
};