const express = require('express');
const {spwan, spawn} = require('child_process');
const app = express()
const port = 3000
app.get('/', (req,res) => {

    var dataToSend;
    img1 = 'test_imgth11.BMP'
    img2 = 'test_img11middle.BMP'
    const python = spawn('python3', ['app.py', img1, img2]);
    //const python = spawn('python', ['code11.py'])
    console.log('data sended')
  
    python.stdout.on('data', function(data){
        console.log('server resending test')
        //console.log(data)
        dataToSend = data.toString()
        if (dataToSend == 'matches')
            console.log(`matched :: images between ${img1} & ${img2} are matched success!!!`)
        else
            console.log(`unmatched :: images between ${img1} & ${img2} are unmateched :(`)
        
    })
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend)
    });
})

app.listen(port, () => console.log(`example app listening on port ${port}`))
