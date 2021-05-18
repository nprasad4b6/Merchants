const express = require('express')
const {merchantRouter} = require('./routers/Merchants')

const app= express()

// parses input json i.e parse input data received from request so that we can acess them as object
app.use(express.json())

app.use(merchantRouter)

module.exports = app