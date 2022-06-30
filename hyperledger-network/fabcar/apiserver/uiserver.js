const express = require('express');
const bodyParser = require('body-parser');
const {spwan, spawn} = require('child_process');
const multer = require('multer')
const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());
// Setting for Hyperledger Fabric
const { Gateway,Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const http= require('http');

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './images/');
    },
    filename(req, file, callback) {
        callback(null, `${file.originalname}.jpg`);
    },
});
// var storage2 = multer.diskStorage({
//     destination(req, file, callback) {
//         callback(null, './finger/');
//     },
//     filename(req, file, callback) {
//         callback(null, `${file.originalname}.jpg`);
//     },
// });
const upload = multer({ storage: storage });
// const finger = multer({ storage: storage2 });

//const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
  //      const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
app.set("view engine","pug");

app.get('/api/', function (req, res) {

    res.render('index');

});

app.get('/api/createinfo', function (req, res) {

    res.render('createinfo');

});
// app.post('/api/data', finger.array('photo', 10), (req, res) => {
//     console.log(req.body)
//     const data = req.body
//     res.status(200).json({
//         message: 'success!',
//     });
// })

// app.get('/api/queryInfos', async function (req, res)  {
//     try {
// const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
//         const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// // Create a new file system based wallet for managing identities.
//         const walletPath = path.join(process.cwd(), 'wallet');
//         const wallet = await Wallets.newFileSystemWallet(walletPath);
//         console.log(`Wallet path: ${walletPath}`);

//         // Check to see if we've already enrolled the user.
//         const identity = await wallet.get('appUser');
//         if (!identity) {
//             console.log('An identity for the user "appUser1" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }
//   // Create a new gateway for connecting to our peer node.
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

//         // Get the network (channel) our contract is deployed to.
//         const network = await gateway.getNetwork('mychannel');

//         // Get the contract from the network.
//         const contract = network.getContract('fabinfo');

//         // Evaluate the specified transaction.
//         // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
//         // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
//         const result = await contract.evaluateTransaction('queryAllCars');
// 	console.log(JSON.parse(result));
//         console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
//         res.render("allcars",{ list:JSON.parse(result)});
// } catch (error) {
//         console.error(`Failed to evaluate transaction: ${error}`);
//         res.status(500).json({error: error});
//         process.exit(1);
//     }
// });


app.get('/api/query/:info_index', async function (req, res) {
    try {
   
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
  // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabinfo');
// Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryFinger', req.params.info_index);
        
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});
} catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
}
);
//solo playing - finger and compare
// app.get('/api/query/solo/:info_index', async function (req, res) {
//     try {
//         const image1 = {image : ''};
//         const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
//         const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// // Create a new file system based wallet for managing identities.
//         const walletPath = path.join(process.cwd(), 'wallet');
//         const wallet = await Wallets.newFileSystemWallet(walletPath);
//         console.log(`Wallet path: ${walletPath}`);

//         // Check to see if we've already enrolled the user.
//         const identity = await wallet.get('appUser');
//         if (!identity) {
//             console.log('An identity for the user "appUser1" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }
//   // Create a new gateway for connecting to our peer node.
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

//         // Get the network (channel) our contract is deployed to.
//         const network = await gateway.getNetwork('mychannel');

//         // Get the contract from the network.
//         const contract = network.getContract('fabinfo');
// // Evaluate the specified transaction.
//         // queryInfo transaction - requires 1 argument, ex: ('queryInfo', 'INFO4')
//         // queryAllInfo transaction - requires no arguments, ex: ('queryAllInfo')
//         const result = await contract.evaluateTransaction('queryFinger', req.params.info_index);
//         var cut = result.toString().split('"');''
//         image1.image = Buffer.from(cut[1],'base64');
//         fs.writeFileSync(`./database/${req.params.info_index}_1`, image1.image);

     
//         const img1=`${req.params.info_index}_1`;
//         const img2=`${req.params.info_index}`;
            
//             const python = spawn('python3', ['app.py', img1, img2]);
            
//             console.log('data sended')
//             var dataToSend;
//             python.stdout.on('data', function(data){
//                 console.log('server resending test')
//                 //console.log(data)
//                 dataToSend = data.toString()
//                 if (dataToSend == 'matches')
//                    { console.log(`matched :: images between ${img1} & ${img2} are matched success!!!`)
//                     // const authResult = contract.evaluateTransaction('queryInfoAge', req.params.info_index);
//                     // return res.send(authResult.what);
//                     return ;
                   
//                 }else
//                     console.log(`unmatched :: images between ${img1} & ${img2} are unmateched :(`);
//                     //res.send(result={what:unmatches});
//                     res.status(200).json({response:unmatches});
                    
//             })
//             python.on('close', (code) => {
//                 console.log(`child process close all stdio with code ${code}`);
//                 if(dataToSend !== `unmatches`)res.redirect(`/api/queryauth/INFO0`);
//                 //res.send(dataToSend)
//             });
        
// } catch (error) {
//         console.error(`Failed to evaluate transaction: ${error}`);
//         res.status(500).json({error: error});
//         process.exit(1);
//     }
// }
// );


app.post('/api/upload', upload.array('photo', 3),async function (req, res) {//S3 add
    try {
        console.log('state : Upload INFO data, Finger Image To server')
        const data = req.body
        console.log('InfoID : ' + data.UserID)
        console.log('Select : ' + data.Select)
        const image1 = {image : ''};
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
  // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabinfo');
// Evaluate the specified transaction.
    
        console.log('state : Query to Block Chain to get Figner Image');
        const result = await contract.evaluateTransaction('queryFinger', data.UserId);
        var cut = result.toString().split('"');
        image1.image = Buffer.from(cut[1],'base64');
        fs.writeFileSync(`./database/${data.UserId}_1`, image1.image); //S3 Block Chain Finger Print

     
        const img1=`${data.UserId}_1`;
        const img2=`${data.UserId}`
        //const img2='Bigbang.jpg'
        console.log('state : Images Compare to Use Python code');
        const python = spawn('python3', ['app.py', img1, img2]);
        //const python = spawn('python', ['code11.py'])
        //console.log('data sended')
        var dataToSend;
        python.stdout.on('data', function(data){
            //console.log('server resending test')
            //console.log(data)
            dataToSend = data.toString()
            if (dataToSend == 'matches')
                { console.log(`state : matched :: images between ${img1} & ${img2} are matched success!!!`)
                // const authResult = contract.evaluateTransaction('queryInfoAge', req.params.info_index);
                // return res.send(authResult.what);
                return ;
                
            }else
                console.log(`state : unmatched :: images between ${img1} & ${img2} are unmateched :(`);
                //res.send(result={what:unmatches});
                res.status(200).json({what:`unmatches`});
                
        })
        python.on('close', (code) => {
            //console.log(`child process close all stdio with code ${code}`);
            console.log('state : Images Compare Finish');
            if(dataToSend !== `unmatches`){
                console.log('state : redirect To User Adultauth');
                console.log({auth : `${data.UserId}`});
                res.send({auth : `${data.UserId}`});
                //res.redirect(`/api/queryauth/${data.UserId}`);
                
            };
                //res.redirect(`/api/queryauth/${data.UserId}`)};
            //res.send(dataToSend)
        });
        
} catch (error) {
        console.error(`state : Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
}


);

app.get('/api/queryauth/:info_index', async function (req, res) {
    try {
const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
  // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabinfo');
// Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryInfoAge', req.params.info_index);
        console.log(`state : Transaction has been evaluated, result is: ${result.toString()}`);
        console.log(JSON.parse(result.toString()));
        res.json(JSON.parse(result.toString()));
} catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
    
});

app.post('/api/addinfo/', upload.array('photo', 3), async function (req, res) { 
    try {
        const finger = {image : ''};
        finger.image= Buffer.from(fs.readFileSync(`./images/${req.body.infoid}.jpg`)).toString('base64');//S3
        console.log('state : upload INFO to singup')
        
const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
  // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabinfo');
// Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        //console.log(finger.image);
        await contract.submitTransaction('createInfo', req.body.infoid, req.body.name, finger.image, req.body.age, req.body.inf);
        
        console.log('state : Transaction has been submitted');
        console.log('state : sigup complete')
        res.json({signup : "complete"});
// Disconnect from the gateway.
        //await gateway.disconnect();
} catch (error) {
        console.error(`state : Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})
//solo sign up
app.post('/api/signup/', async function (req, res) { 
    try {
        const data = req.body
        console.log('InFo Id : ' + data.UserId)
        console.log('Select : ' + data.Select)

const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
  // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabinfo');
// Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')

        await contract.submitTransaction('createInfo', req.body.infoid, req.body.name, req.body.finger, req.body.age, req.body.inf);

        console.log('Transaction has been submitted');
        res.send('Transaction has been submitted INFO ADDED');
// Disconnect from the gateway.
        await gateway.disconnect();
} catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})



// app.put('/api/changeowner/:car_index', async function (req, res) {
//     try {
// const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
//         const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// // Create a new file system based wallet for managing identities.
//         const walletPath = path.join(process.cwd(), 'wallet');
//         const wallet = await Wallets.newFileSystemWallet(walletPath);
//         console.log(`Wallet path: ${walletPath}`);

//         // Check to see if we've already enrolled the user.
//         const identity = await wallet.get('appUser1');
//         if (!identity) {
//             console.log('An identity for the user "appUser1" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }
//   // Create a new gateway for connecting to our peer node.
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: 'appUser1', discovery: { enabled: true, asLocalhost: true } });

//         // Get the network (channel) our contract is deployed to.
//         const network = await gateway.getNetwork('mychannel');

//         // Get the contract from the network.
//         const contract = network.getContract('fabcar');
// // Submit the specified transaction.
//         // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
//         // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
//         await contract.submitTransaction('changeCarOwner', req.params.car_index, req.body.owner);
//         console.log('Transaction has been submitted');
//         res.send('Transaction has been submitted');
// // Disconnect from the gateway.
//         await gateway.disconnect();
// } catch (error) {
//         console.error(`Failed to submit transaction: ${error}`);
//         process.exit(1);
//     } 
// })

app.listen(8080);