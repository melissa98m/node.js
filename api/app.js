const express = require('express');
const app = express();

app.get('/api' , (req , res) => {
    res.send('Root API')
})

app.get('/api/v1' , (req , res) => {
    res.send('API Version 1')
})

app.listen('8080' , ()=>{
    console.log('listening on 8080')
})



