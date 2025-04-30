
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
 
const app = express();
app.use(cors());
app.use(bodyParser.json());
 
require('dotenv').config();
 
let database;
 
const connectToData = async () => {
    try{
        const client = await MongoClient.connect(process.env.MONGO_URI);
        console.log('connect to database');
        return client.db('MONGODB');
    } catch(error){
        console.error(error);
        process.exit(1);
    }
   
}
 
const startServer = async () => {
    database = await connectToData();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}
 


//LOGIN route
app.post("/login", async (req,res)=>{
    if(!database){
        return res.status(500).json({message: "database not connected"});
    }
    try{
        const codiceISA = req.body.isa; // prende il codice isa dal body della richiesta
        const password = req.body.password; // prende la password dal body della richiesta

        if(!codiceISA){return res.status(400).json({message: "codice ISA non fornito"});}
        if(!password){return res.status(400).json({message: "password non fornita"});}

        const user = await database.collection("users").findOne(
            {
                isa: codiceISA,
                password: password
            })

        console.log(user)

        if(!user){
            return res.status(400).json({message:"utente non trovato"})
        }

        let token = buildazioneToken(user.nome, process.env.CHIAVE_JWT) // creazione del token attraverso la funzione importata
        console.log(token) 

        const decoded = jwt.verify(token, process.env.CHIAVE_JWT); //verifica della correttezza del token

        if (!decoded) { //se il tokejn non è valido / non corrisponde mostra un messaggio di errore
            return res.status(401).json({ message: "Token non valido" });
        }else{
            console.log("token valido")
        }

        res.json({ //ritorna il token al client
            success:true,
            token:token,
            message: "token generato con successo"
        })
    }catch(error) {
        console.error(error);
    }


})



startServer();

app.get("/mostViewedBooks",  async (req, res) => {
    if(!database) {
        return res.status(500).json({message: 'Internal server error'});
    }
    try{
        const result = await database.collection('books').find({}).sort({views: -1}).limit(10).toArray();
        return res.json(result);
    } catch(error){
        console.error('Internal getting most viewed books', error);
        return res.status(500).json({message: 'Internal getting most viewed books'});
    }
});

 
