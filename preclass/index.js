const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res)=> res.send('hello world!'))

app.post('/', function(req, res){
    res.send('Got a Post request')
})

app.put('/user', function(req, res){
    res.send('Got a Put request at /user')
})

app.delete('/user',(req, res)=>{
    res.send('Got a Delete request at /user')
})

app.use(express.static('public'))




app.listen(port, ()=> console.log('example app listening at http://localhost:${port}'))