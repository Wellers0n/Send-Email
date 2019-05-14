import koa from 'koa'
import json from 'koa-json'
import cors from 'koa-cors'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import route from 'koa-router'
// import nodemailer from 'nodemailer'

const app = new koa()
const router = new route()

//middlewares
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(logger());
app.use(json());

router.get('/', async (ctx:any, next:any) => {
    ctx.body = 'aqui'
})

app.listen(3001, () => {
    console.log('server ON: http://54.233.187.62:3001')
})
