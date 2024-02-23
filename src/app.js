import express  from "express"
import { router as apiRouter } from "./router/api/api.router.js"
import { router as webRouter } from "./router/web/web.router.js"
import { connect } from "./database/database.js"
import { cookie } from "./middleware/cookies.js"
import { authentication } from "./middleware/authentication.js"

await connect()
const app = express( )

app.listen(8080, ()=>{
    console.log(`conected to port ${8080}`)
})


app.use(cookie)
app.use(authentication)
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use('/static',express.static('./static'))

app.use('/',webRouter)
app.use('/api',apiRouter)