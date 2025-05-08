const jwt = require("jsonwebtoken");

const options = {
    algorithm: "HS256",
    expiresIn: "1h",
    header:{
        "typ": "JWT"
    }
}

function buildazioneToken (codiceISA, chiave, ruolo) {

    const payload = {
        isa: codiceISA,
        ruolo: ruolo
      }

      const token = jwt.sign(payload, chiave, options);
      return token
}

module.exports = buildazioneToken