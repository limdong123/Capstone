import {Router} from 'express';
const router =Router();
import { Gateway,Wallets } from 'fabric-network';
import path from 'path';
import fs from 'fs';
import http from 'http';
import multer from 'multer';
import {spawn} from 'child_process';

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './images/');
    },
    filename(req, file, callback) {
        callback(null, `${file.originalname}.jpg`);
    },
});
const upload = multer({ storage: storage });
router.get('/api/query/:info_index', async function (req, res) {
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



router.post('/api/upload', upload.array('photo', 3),async function (req, res) {//S3 add
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

router.get('/api/queryauth/:info_index', async function (req, res) {
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

router.post('/api/addinfo/', upload.array('photo'), async function (req, res) { 
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

export default router;