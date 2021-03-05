const express=require('express')
require('./db/mongoose')
const venderRouter=require('./routers/vender')
const userRouter=require('./routers/user')
const bodyParser=require('body-parser')

const app=express()
const port=process.env.PORT || 3000

app.get('',(req,res)=>{
  res.send({
    "Id":"Its working"
  })
})

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(venderRouter)
app.use(userRouter)

app.listen(port,()=>{
    console.log("Server is up on the port "+port)
})
