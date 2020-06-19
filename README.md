# üKool

## Eesmärk ja lühikirjeldus

Ü-Kool on veebikeskkond, kus tuuakse kokku üliõpilane ja tema õppejõud. Õppejõul on võimalik kõik enda edasiantav informatsioon laadida üles veebikeskkonda, näiteks kodusedtööd, mis on ideaalne lahendus üliõpilasele, kes soovib hoida pidevalt silma peal kogul toimuval õppetööl. Projekti eesmärgiks on elimineerida kodutööde kohta käiva informatsiooni kadu. üKooli puhul on tegemist võit-võit situatsiooniga, kus üliõpilane teab mida ta tegema peab ning õppejõud näeb seda, kas tudengil on kodutöö tehtud või mitte.

## Tiimiliikmed

- Paul Oskar Soe
- Karl-Markus Pihlakas
- Tauri Miilits
- Daniel Gurevitš

## Ekraanipildid

![sisselogimine](Screenshot_login.png)
![dashboard](Screenshot_dashboard.png)


## Testimise dokumentatsioon

### Kasutaja loomine ja autoriseerimine

| Testi lugu        | Ootatud tulemus          | Tegelik tulemus  | Kas läbis  |
| ------------- |:-------------:| -----:|
| Kasutaja loomine html input väärtustega      | html input väärtustega luuakse andmebaasi kasutaja | html input väärtustega luuakse andmebaasi kasutaja | jah |
| Parooli hashimine      | parooli tekst hashitakse pikaks stringiks      |   parooli tekst hashitakse pikaks stringiks | jah |
| Kasutaja sisselogimine õigete input väärtustel | Kasutaja logitakse sisse      |   Kasutaja logitakse sisse | jah | 
| Sisselogimise input väljade valideerimine, kui puudub väärtus väljale, siis kuvatakse error message | Saadeti error message, et vajalik väli on puudu      |   Saadeti error message, et vajalik väli on puudu | jah | 


## Kasutatud tehnoloogiad ja nende versioonid

- MonoDB
- expressJS
- ReactJS
- NodeJS
- Javascript
- CSS

## Kasutatud serveri andmed

## Paigaldusjuhised

[Node installeerimine](https://nodejs.org/en/download/)
[Yarni installeerimine](https://classic.yarnpkg.com/en/docs/install/)

### Moodulite alla laadimine ja koodi käivitumine:

### API käivitumines

```
cd api
npm install
npm start
```

### Kliendi poole käivitumine

```
cd client
npm install
npm start
```

## Litsents

Antud projektil on MIT litsents - vaata [LICENSE](LICENSE) faili täpsema info jaoks.
