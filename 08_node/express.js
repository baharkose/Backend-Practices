const express = require("express")
const app = express()
const Port=3000

app.get('/sum', (req, res)=>{
    const {num1, num2, num3, num4} = req.query;

    const sum = parseInt(num1) + parseInt(num2) + parseInt(num3) + parseInt(num4);
    res.send(`the sum is ${sum}.`)
})

// listen dememiz lazım
app.listen(3000, ()=>{
    console.log("contact")
})


