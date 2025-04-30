const jwt = require("jsonwebtoken");

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


    // console.log("tutto ok", decoded);
  
    next(); 
  };
  
  module.exports = logMiddleware;
  