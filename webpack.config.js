let path = require('path')
let HtmlWebPackPlugin = require('html-webpack-plugin')
let CleanWepackPlugin = require('clean-webpack-plugin')
let CopyWebpackPlugin  = require('copy-webpack-plugin')
let webpack = require('webpack')
module.exports={
  mode:'production',
  entry:'./src/index.js',
  devServer:{
     before(app){
       app.get('/user',function(req,res){
         res.json({name:"hanmeimei"})
       })
     }
  },
  output:{
	  filename:'main[hash].js',
	  path:path.resolve(__dirname,'dist')
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