## webpack  配置篇 

## 打包多页应用
- src 下面创建4个文件 index.html b.html index.js b.js 
- 入口需要配置成对象
```
entry:{
		home:'./src/index.js'
		b:'./src/b.js'
	}
```
- 出口需要多个出口，改变filename的写法
filename:'[name.js]' 
- 保证html页面引入自己对应的js
- chunks 代码块 来完成  
chunks:['home']  
如果home也许使用other 
chunks:['home','other']

## 配置soure-map源码映射 作用 用来调试源码

- mode:'production'

```
devtools:'source-map'

```
- 测试npm run dev  
- source-map 会单独生成一个sourcemap文件 可以帮我们调试源代码 大而全 会显示当前报错的列和行

- eval-source-map 不会产生单独的文件 但是会显示报错的行和列

- cheap-module-source-map 不会产生列 但是是一个单独的文件 

- cheap-module-eval-source-map 不会产生文件也不会产生列 会直接集成在文件里 

## 实时编译
watch:true 
- 监控的选项
```
watchOptions:{
	poll:1000  //每秒问我多少次
	aggreatmentTimeout:500 //防抖 一直输入代码
	ignored:/node_modules/
}
```
##  webpcak 常用插件 CleanWebpackPlugin CopyWebpackPlugin BannerPlugin 
yarn add clean-webpack-plugin 
1. 清除缓存插件,可以写字符串 也可以写成数组
```
   new CleanWebpackPlugin('./dist')
```
2. 拷贝插件  
yarn add copy-webpack-plugin 
``` 
new CopyWebpackPlugin([
    {from:'img',to:'./img'}
  ])
``` 
3. 版权插件 webpack自带插件 
 let webpack = require('webpack')
 new webpack.BannerPlugin('make 2019 by ry')

## webpack处理 跨域问题
- webpack 自带express
1. 代理的方式  重写的方式 把请求代理到express服务器上 
```
 proxy:{ // 
      '/api':{
         target:'http://localhost:3000',
         pathRewrite:{'/api':''}
       }// 配置了一个代理
    }
```
2.  我们前端只想单纯来模拟数据
-before  webpack 提供的方法 钩子
```
   before(app){  
       app.get('/user',(req,res)=>{
         res.json({name:'leilei'})
       })
    }
```
3. 有服务端 不用代理处理 在服务端中启动webpack 端口用服务端端口
- yarn add webpack-dev-middleware -D
server.js修改如下 
```
let webpack = require('webpack');

let middle = require('webpack-dev-middleware');

let config = require('./webpack.config.js');

let compiler = webpack(config);

app.use(middle(compiler));
```
    
## resolve用法
extensions 拓展名 
alias:别名  bootstrap:'bootstrap/dist/css/bootstrap.css'
mainFields 可以配置先找哪个入口
mainFiles：入口文件的名字 
```
resolve:{
    modules:[path.resolve('node_modules')],
    extensions:['.js','.css','.json','.vue'],
    mainFields:['style','main']
    mainFiles:[], // 入口文件的名字 index.js
    alias:{ 
       bootstrap:'bootstrap/dist/css/bootstrap.css'
    }
 }
```
## 区分环境
webpack.config.js改成 webpack.base.js
新建文件 webpack.prod.js 和 webpack.dev.js
- 配置开发环境的写法
```
webpack.dev.js 
let {smart} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = smart(base,{
   mode: 'development',
   devServer:{

   },
   devtool:'source-map'
})
```
- 配置生产环境的写法 
```
let {smart} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = smart(base,{
   mode: 'production',
   optimization:{
     minimizer:[

     ]
   },
   plugins:[
     
   ]
})
```
## webpack 优化
1. noparse
module: {
    noParse: /jquery/, // 不去解析jquery中的依赖库 
    ...
}
2. dllplugin

3. 






















