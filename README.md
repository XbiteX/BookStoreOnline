# Libreria scolastica
questo è un progetto scolastico per gestire una biblioteca


il deployment del backend è stato fatto con render





## rotte:
### /login 
serve agli utenti per autenticarsi, prima di accedere alla "biblioteca online" devono autenticarsi
per atenticarsi bisogna fare un POST verso https://bookstoreonline.onrender.com/login 
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



### /books
ritorna i libri in basa a nessuno, uno o più filtri
- /books?category=Scienze pure --> filtra i dati in base alla categoria (es. Sceinze pure, Tecnologie, Letteratura...)
- /books?subject=Scienze pure --> filtra i dati in base alla disciplina (es. Metallurgia, Informatica, Fiscia, Guerra)
- /books?author=Scienze pure --> filtra i dati in base all'autore (es. Giovanni Pascoli, Giovanni Tonzig, Pippo Caio)
- /books?title=Scienze pure --> filtra i dati in base al titolo (es. Il visconte dimezzato, Fondamenti di meccanica classica...)
- /books?language=Scienze pure --> filtra i dati in base alla lingua (es. it, en, es)
- /books?status=Scienze pure --> filtra i dati in base alla status (es. disponibile, non disponibile, solo consultazione...)

### /addBook
*work in progress* permette all'admin di aggiungere un libro specifio, i parametri necessari sono l'id (che rappresenta il codice d'inventario) la collocazione, l'autore, la lingua e il titolo

### /deleteBook
*work in progress* permette all'admin di eliminare un libro specifio, i parametri necessari sono l'id 

### /updateBook
*work in progress* permette all'admin di aggiornare un libro specifio, i parametri necessari sono ancora da vedere come saranno


# tabelle
### la tabella degli users sarà così formata

|isa|password|nome|cognome|ruolo|
|---|--------|----|-------|-----|
|12345678|password|marco|rossi|studente|

### la tabella per i books sarà così formata

| _id | CDD        | Collocazione | Autore                               | Titolo                                 | Note | Stato      | Casa editrice           | Prestabile | lingua     | argomenti   |
|--------------|------------|--------------|---------------------------------------|----------------------------------------|------|------------|--------------------------|------------|---------------|--------------|
| 22           | 671.36 CON | Scienze pure | ASSOCIAZIONE ITALIANA DI METALLURGIA | Convegno nazionale trattamenti termici |      | Prestabile | ASS.ITALIANA METALLURGIA | VERO       |  italiana| Metallurgia  |


"disciplina" indica di cosa tratta quel libro (es. guerra, fisica, metallurgia, poetica...)
