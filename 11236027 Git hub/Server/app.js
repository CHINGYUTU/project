const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

const mainRouter = require('./router/main');
const authRouter = require('./router/auth');
const adminRouter = require('./router/admin');

app.use(bodyParser.json())
app.use('/api', mainRouter)
app.use('/auth',authRouter)
app.use('/admin',adminRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})