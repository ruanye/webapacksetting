let path = require('path')
let HtmlWebPackPlugin = require('html-webpack-plugin')
let CleanWepackPlugin = require('clean-webpack-plugin')
let CopyWebpackPlugin  = require('copy-webpack-plugin')
let webpack = require('webpack')
module.exports={
  mode:'production',
  entry:'./src/index.js',
   devServer:{
     contentBase:'./dist'
   },
   output:{
	  filename:'js/main[hash].js',
	  path:path.resolve(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  resolve:{
    // modules:[path.resolve('node_modules')],
    extensions:['.js','.css','.json','.vue'],
    alias:{
        // bootstrap:'bootstrap/dist/css/bootstrap.css'
     },
     mainFileds:['style','main']
  },
  plugins:[
    new HtmlWebPackPlugin({
		  template:'./src/index.html',
		  filename:'index.html'
    }),
    new CleanWepackPlugin('./dist'),
    new CopyWebpackPlugin([
      {from:'img',to:'./img'}
    ]),
    new webpack.BannerPlugin('made by ry')
  ]
}