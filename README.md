# Libreria scolastica
questo è un progetto scolastico per gestire una biblioteca


il deployment del backend è stato fatto con render





## rotte:
### /login 
serve agli utenti per autenticarsi, prima di accedere alla "biblioteca online" devono autenticarsi
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

### /filter
serve per filtrare i libri presenti nel database secondo determinate query:
- /filter?category=Scienze pure --> filtra i dati in base alla categoria (es. Sceinze pure, Tecnologie, Letteratura...)
- /filter?subject=Scienze pure --> filtra i dati in base alla disciplina (es. Metallurgia, Informatica, Fiscia, Guerra)
- /filter?author=Scienze pure --> filtra i dati in base all'autore (es. Giovanni Pascoli, Giovanni Tonzig, Pippo Caio)
- /filter?title=Scienze pure --> filtra i dati in base al titolo (es. Il visconte dimezzato, Fondamenti di meccanica classica...)
- /filter?language=Scienze pure --> filtra i dati in base alla lingua (es. it, en, es)
- /filter?status=Scienze pure --> filtra i dati in base alla status (es. disponibile, non disponibile, solo consultazione...)



# tabelle
### la tabella degli studenti sarà così formata

|isa|password|nome|cognome|
|---|--------|----|-------|
|12345678|password|marco|rossi|

### la tabella per i libri sarà così formata

| Codice libro | CDD        | Collocazione | Autore                               | Titolo                                 | Note | Stato      | Casa editrice           | Prestabile | Categoria     | Disciplina   |
|--------------|------------|--------------|---------------------------------------|----------------------------------------|------|------------|--------------------------|------------|---------------|--------------|
| 22           | 671.36 CON | ARMADIO N.18 | ASSOCIAZIONE ITALIANA DI METALLURGIA | Convegno nazionale trattamenti termici |      | Prestabile | ASS.ITALIANA METALLURGIA | VERO       | Scienze pure | Metallurgia  |


"Categoria" indica il più grande insieme di libri (es. scienze pure, tecnologie, letteratura, storia...)
"disciplina" indica di cosa tratta quel libro (es. guerra, fisica, metallurgia, poetica...)
