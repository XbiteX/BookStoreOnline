const jwt = require("jsonwebtoken");


// questo middleware serve per verificare che nel payload del token ci sia il ruolo admin, se è così allora significa che l'utente è l'admi, quindi può accedere a questa rotta
const logMiddleware = (req, res, next) => {
    const tokenRaw = req.headers["authorization"];
    // console.log(tokenRaw)
    if (!tokenRaw) {
        return res.status(401).json({ message: "Token non fornito, accesso negato" });
    }   
    
    const [bearer, token] = tokenRaw.split(' '); // Splitto il token in bearer (che dovrebbe contenere Bearer) e token (che contiene il token)
    console.log(bearer, token)
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ message: "Formato del token non valido" });
    }

    try{
        jwt.verify(token, process.env.CHIAVE_JWT); // Verifico che la chiave sia corretta
        // Se la verifica non ha successio lancia un errore quindi evito di mettere la funzione in una variabile
    }catch(error) {
        return res.status(401).json({ message: "Token non valido" });
    }

    // Verifica e decodifica il token
    const decoded = jwt.verify(token, process.env.CHIAVE_JWT); // "decoded" è il payload del token
    console.log("decoded", decoded)
    console.log("decoded", decoded.ruolo)
    // Verifica se l'utente ha il ruolo "admin"
    if (decoded.ruolo !== 'admin') {
        return res.status(403).json({ message: 'Accesso negato. Ruolo non autorizzato.' });
    }


  
    next(); 
  };
  
  module.exports = logMiddleware;
  