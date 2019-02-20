let express = require('express')
let app = express()
let webpack  =require('webpack')
let middle  =  require('webpack-dev-middleware')
let config = require('./webpack.config.js')
let compile = webpack(config)
app.use(middle(compile))

app.get('/user',function(req,res){
   res.json({name:'lilei'})
})
app.listen(3000)