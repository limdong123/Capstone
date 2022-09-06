
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
// const AWS =require('aws-sdk');
// const multerS3 =require('multer-s3');
// AWS.config.loadFromPath(__dirname+'/config/s3.json');
// const s3 =new AWS.S3();

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './images/');
    },
    filename(req, file, callback) {
        callback(null, `${file.originalname}.jpg`);
    },
});

// const storage=multerS3({
//         s3: s3,
//         bucket:'multerapstone',
//         acl:'public-read-write',
//         key:function(req,file,cb){
//             cb(null,`/images/${file.originalname}.jpg`);
//         }
//     })
//
// const compare_storage=multerS3({
    //         s3: s3,
    //         bucket:'multerapstone',
    //         acl:'public-read-write',
    //         key:function(req,file,cb){
    //             cb(null,`/databases/${file.originalname}.jpg`);
    //         }
    //     })


const upload = multer({ storage: storage });
//cosnt com_upload=multer({storage : compare_storage});


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

        const contract = network.getContract('fabinfo');

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
        const result = await contract.evaluateTransaction('queryFinger', data.UserID);
        var cut = result.toString().split('"');
        image1.image = Buffer.from(cut[1],'base64');
        fs.writeFileSync(`./images/${data.UserID}_block.jpg`, image1.image); //S3 Block Chain Finger Print
        const img1=`${data.UserID}.jpg`;
        const img2=`${data.UserID}_block.jpg`;
        console.log('state : Images Compare to Use Python code');
        //const python = spawn('python3', ['app.py', img1, img2]);
        const python = spawn('python3', ['run_at_server2.py', img1, img2]);
        var dataToSend='';
        python.stdout.on('data', function(data){
            
            dataToSend = data.toString();
            console.log(dataToSend);
            
            // if (dataToSend == 'matched')
            //     { console.log(`state : matched :: images between ${img1} & ${img2} are matched success!!!`)
            //     // const authResult = contract.evaluat]\
            //     Transaction('queryInfoAge', req.params.info_index);
            //     // return res.send(authResult.what);
            //     res.status(200).json({what:'matched'});
            //     return;
                
            // }else if(dataToSend=='unmatched')
            //     console.log(`state : unmatched :: images between ${img1} & ${img2} are unmateched :(`);
            //     //res.send(result={what:unmatches});
            //     res.status(200).json({what:`unmatched`});
            //     return;
            if (dataToSend.includes('yes'))
                { console.log(`state : matched :: images between ${img1} & ${img2} are matched success!!!`)
                // const authResult = contract.evaluat]\
                //Transaction('queryInfoAge', req.params.info_index);
                // return res.send(authResult.what);
                res.status(200).json({what:'matched'});
                return;
                
            }else if(dataToSend.includes('no')){
                console.log(`state : unmatched :: images between ${img1} & ${img2} are unmateched :(`);
                //res.send(result={what:unmatches});
                res.status(200).json({what:`unmatched`});
                return;
            
            }
                
                
        })
        console.log('state : Images Compare Finish');
        // python.on('close', (code) => {
        //     //console.log(`child process close all stdio with code ${code}`);
        //     console.log('state : Images Compare Finish');
        //     if(dataToSend == `matched`){
        //         console.log('state : redirect To User Adultauth');
        //         console.log({auth : `${data.UserID}`});
        //         //clean(`./database/${data.UserID}`)
        //         //clean(`./images/${data.UserID}.jpg`)
        //         console.log('state : block chang image and app image delete');
        //         res.send({auth : `${data.UserID}`});
               
                
        //     };
        // });
} catch (error) {
    if(error.code=="ENOENT"){
        console.log("file delete error create");
    }
        console.error(`state : no InfoID in blockchain: ${error}`);
        res.status(200).json({what: "noID"});
        process.exit(1);
    }
});

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
        finger.image= Buffer.from(fs.readFileSync(`./images/${req.body.infoid}.jpg`)).toString('base64');
        //python change image use 
        //python image change
        // const python = spawn('python3', ['img_converter_for_blockchain.py', req.body.infoid+'.jpg']);
       

        //  python.stdout.on('data', async (data) => {
        //          console.log(data.toString);
        //          console.log("state : Image Preprocessing Continue ...");

        //      })
        // python.on('close', async (code) => {
            
        //     console.log('state : Images Preprocessing Complete');
        //     finger.image= Buffer.from(fs.readFileSync(`./images/cvt_${req.body.infoid}.jpg`)).toString('base64');
             
        // })
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
     
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

     
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
      
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

      
        const network = await gateway.getNetwork('mychannel');

      
        const contract = network.getContract('fabinfo');
      
       
        console.log('state : upload INFO to singup')
    
        await contract.submitTransaction('createInfo', req.body.infoid, req.body.name, finger.image, req.body.age, req.body.inf);
        //test
        
        //console.log(req.body.infoid, req.body.name, finger.image, req.body.age, req.body.inf);
        console.log('state : Transaction has been submitted');
        console.log('state : sigup complete')
        res.json({signup : "complete"});
        //clean(`./images/${req.body.infoid}.jpg`);
        //clean(`./images/cvt_${req.body.infoid}.jpg`);
        console.log('state : image delete')
        gateway.disconnect();
} catch (error) {
        console.error(`state : Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})
async function clean(file){
    fs.unlinkSync(file, function(err){
        if(err){
            console.log("Error :", err)
        }
    })
}
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
        gateway.disconnect();
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
//app.use(Router);

app.listen(8080);