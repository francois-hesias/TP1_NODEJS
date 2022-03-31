const http = require('https');
const path = require('path');
const {fileURLToPath} = require('url');
const {readFile, stat} = require('fs/promises');
const fs = require('fs');

const options = {
    key: fs.readFileSync('/home/ubuntu/Desktop/NodeJS/TP1/CERT/key.pem'),
    passphrase: 'hesias',
    cert: fs.readFileSync('/home/ubuntu/Desktop/NodeJS/TP1/CERT/cert.pem')
};
const serv = http.createServer((request,result) => {
    result.statusCode = 200
    result.setHeader('Content-Type', 'text/plain')
    const url = request.url;
    let uri = url.substring(1);
    let commande = uri.split("/");
    console.log(commande)
    if (commande[0] === "info"){
        result.write("JSON")
    } else {
        if (commande.length === 2 ){
            result.write(`Bonjour ${commande[1]}`);
        } else  {
            result.write("Je n'ai pas votre nom")
        }

    }
    result.end()
    
});

const read = async (file) => {
    try {
        const data = await readFile(file)
        console.log(data.toString('utf-8'))
    } catch (error) {
        console.log(error)
    }
}

const port = 5600;
serv.listen(port,() =>{
    console.log(`running  on https://localhost:${port}`);
})
