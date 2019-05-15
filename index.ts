import koa, {Context} from 'koa'
import json from 'koa-json'
import cors from 'koa-cors'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import route from 'koa-router'
import nodemailer from 'nodemailer'

const app = new koa()
const router = new route()

//middlewares
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(logger());
app.use(json());

router.post('*', async (ctx:Context, next: () => Promise<any>) => {
    const {description} = ctx.request.body
    console.log('foi aqui no server')
    if(description){
        ctx.status = 200
   const htmlElement = `
       <ul>
           <h1>Mensagem</h1>
           <h3>${description}</h3>
       </ul>
   `

   const transporter = nodemailer.createTransport({
       host: 'smtp.gmail.com',
       port: 587, //465 or 587 or 26
       // secure: true,
       auth: {
           user: 'seu.email@gmail.com',
           pass: 'sua_senha'
       }
   })

   const emailOptions = {
       // from: form.email,
       to: 'seu_email@gmail.com',
       // replyTo: 'atendimento@crossystem.com.br',
       subject: 'FEEDBACK WEBSITE',
       text: description,
       html: htmlElement
   }

   transporter.sendMail(emailOptions, (err, info) => {
       if(err){
           return console.log('Error ao enviar o email: ' + err)
       }

       console.log('Email enviado com sucesso: ' + info.response)
   })
   }


   await next();
})

app.listen(3001, () => {
    console.log('server ON')
})
