let path = require('path')
let HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports={
  mode:'development',
  entry:{
	  home:'./src/index.js',
	  b:'./src/b.js'
  },
  output:{
	  filename:'[name].js',
	  path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new HtmlWebPackPlugin({
		template:'./src/index.html',
		filename:'index.html',
		chunks:['home','b']
	}),
    new HtmlWebPackPlugin({
		template:'./src/b.html',
		filename:'b.html',
		chunks:['b']
	})
  ]
}