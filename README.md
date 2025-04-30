# BookStoreOnline
a school project


rotte:
/login serve agli utenti per autenticarsi, prima di accedere alla "biblioteca online" devono autenticarsi
per atenticarsi bisogna fare un POST verso <nome del sito fornit da vercel>/login 
e il body sarà così formato:
```json 
{
    "isa": "codice isa fornito dall'utente tramite un form",
    "password": "password fornita dall'utente tramite un form"
}
```
se l'utente viene trovato nel database allora il backend invierà un codcice JWT al frontend, da quel momento il poi il frontend
ogni volta che farà una richiesta al server dovrà includere nel campo header questo codice jwt, il server una volta ricevuta la richesta 
controllerà nel header il codice jwt e un middleware verificherà che questo codice jwt sia corretto.





# tabelle
### la tabella degli studenti sarà così formata

|isa|password|nome|cognome|
|---|--------|----|-------|
|12345678|password|marco|rossi|