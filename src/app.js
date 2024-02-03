import express  from "express"
import { router as apiRouter } from "./router/api/api.router.js"
import { router as webRouter } from "./router/web/web.router.js"

const app = express( )

app.listen(8080, ()=>{
    console.log(`conected to port ${8080}`)
})


app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use('/static',express.static('./static'))

app.use('/',webRouter)
app.use('/api',apiRouter)