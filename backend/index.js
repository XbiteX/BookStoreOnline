const auth = require('./middleware/auth.js'); // importo il file auth.js
const authAdmin = require('./middleware/authAdmin.js'); // importo il file authAdmin.js
const buildazioneToken = require('./utilities.js'); // importo il file utilities.js
const express = require('express');
const jwt = require('jsonwebtoken'); // importo il pacchetto jsonwebtoken
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
        return client.db('BookStoreOnline'); // nome del database
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
 
app.get('/', (req, res) => {
    res.send('Hello there!');
});

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

        let token = buildazioneToken(user.nome, process.env.CHIAVE_JWT, user.ruolo) // creazione del token attraverso la funzione importata
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

app.get("/books" ,auth, async (req, res) => {
    if(!database) {
        return res.status(500).json({message: 'Internal server error'});
    }
    try{
        // Prendi i parametri di query dalla richiesta
        const category = req.query.category; // categoria del libro
        const subject = req.query.subject; // disciplina del libro
        const author = req.query.author; // autore del libro
        const title = req.query.title; // titolo del libro
        const language = req.query.language; // lingua del libro
        const status = req.query.status; // stato del libro

        const filter = {}; // <-- inizializza un oggetto vuoto per il filtro
            if (category) {
                filter["Categoria"] = category; // <-- aggiungi il filtro per categoria se categoria è fornita
            }
            if (subject) {
                filter["Disciplina"] = subject; // <-- aggiungi il filtro per materia se materia è fornita
            }
            if (author) {
                filter["Autore"] = author; // <-- aggiungi il filtro per autore se autore è fornita
            }
            if (title) {
                filter["Titolo"] = title; // <-- aggiungi il filtro per Titolo se Titolo è fornita
            }
            if (language) {
                filter["Lingua"] = language; // <-- aggiungi il filtro per Lingua se Lingua è fornita
            }
            if (status) {
                filter["Stato"] = status; // <-- aggiungi il filtro per Stato se Stato è fornita
            }

        console.log(filter); // <-- logga il filtro per vedere cosa contiene
        const result = await database.collection('books').find(filter).toArray();
        console.log(result); // <-- logga il risultato per vedere cosa contiene
        return res.json(result);
    } catch(error){
        console.error(`Internal getting books`, error);
        return res.status(500).json({message: 'Internal erroe'});
    }
});


//rotta per aggiungere un libro, solo l'admin lo può fare
app.post("/addBook",authAdmin, async (req, res) => {
    if(!database) {
        return res.status(500).json({message: 'Internal server error'});
    }
    try{
        // // const book = req.body; // prendo il libro dal body della richiesta
        // console.log(book); // logga il libro per vedere cosa contiene
        // const result = await database.collection('books').insertOne(book); // inserisco il libro nel database
        // console.log(result); // logga il risultato per vedere cosa contiene
        // return res.json(result); // ritorna il risultato al client
        return res.status(200).json({message: 'tt ok'}); // ritorna un messaggio di successo al client
    } catch(error){
        console.error(`Internal adding book`, error);
        return res.status(500).json({message: 'Internal erroe'});
    }
});

//rotta per eliminare un libro, solo l'admin lo può fare
app.delete("/deleteBook",authAdmin, async (req, res) => {
    if(!database) {
        return res.status(500).json({message: 'Internal server error'});
    }
    try{
        // const bookId = req.body.id; // prendo l'id del libro dal body della richiesta
        // console.log(bookId); // logga l'id del libro per vedere cosa contiene
        // const result = await database.collection('books').deleteOne({_id: bookId}); // elimino il libro dal database
        // console.log(result); // logga il risultato per vedere cosa contiene
        // return res.json(result); // ritorna il risultato al client
    } catch(error){
        console.error(`Internal deleting book`, error);
        return res.status(500).json({message: 'Internal erroe'});
    }
});

//rotta per modificare un libro, solo l'admin lo può fare
app.patch("/updateBook",authAdmin, async (req, res) => {
    if(!database) {
        return res.status(500).json({message: 'Internal server error'});
    }
    try{
        // const bookId = req.body.id; // prendo l'id del libro dal body della richiesta
        // console.log(bookId); // logga l'id del libro per vedere cosa contiene
        // const result = await database.collection('books').deleteOne({_id: bookId}); // elimino il libro dal database
        // console.log(result); // logga il risultato per vedere cosa contiene
        // return res.json(result); // ritorna il risultato al client
    } catch(error){
        console.error(`Internal deleting book`, error);
        return res.status(500).json({message: 'Internal erroe'});
    }
});
 
