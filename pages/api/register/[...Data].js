import { MongoClient, ObjectId } from 'mongodb'
const uri = "mongodb://Emanuele:h297k1fklCm2SMfp@animedata-shard-00-00.dsmjr.mongodb.net:27017,animedata-shard-00-01.dsmjr.mongodb.net:27017,animedata-shard-00-02.dsmjr.mongodb.net:27017/?ssl=true&replicaSet=atlas-mud1pv-shard-0&authSource=admin&retryWrites=true&w=majority";
var nodemailer = require('nodemailer');

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//mail di benvenuto
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'animecrowdinfo@gmail.com',
        pass: 'tiuxjtzynjiycmrt'
    },
    tls: {
        rejectUnauthorized: false
    }
});

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export default function handler(req, res) {
    const { Data } = req.query

    //username
    var datiaccount1 = Data[0];
    //email
    var datiaccount2 = Data[1];
    //pass
    var datiaccount3 = Data[2];

    // current timestamp in milliseconds
    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    let finalDate = year + "-" + month + "-" + date;

    let codiceSegretogenerato = generateString(20)

    MongoClient.connect(uri, function (err, db) {
        if (err) throw err;
        var dbo = db.db("animeDB");
        dbo.collection("Users").find({ Email: datiaccount2 }).toArray(function (err, result) {
            if (err) throw err;
            if (JSON.parse(result.length) == 0) {
                //db
                MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("animeDB");
                    dbo.collection("Users").insertOne({ NomeUtente: datiaccount1, Email: datiaccount2, Password: datiaccount3, Avatar: "https://i.imgur.com/WMw4pS1.png", DataAccount: finalDate, CodiceRipristino: codiceSegretogenerato, Amici: [{ Amico: "" }] }, function (err, response) {
                        if (err) throw err;
                        console.log(response)


                        var mailOptions = {
                            from: ' "AnimeCrowd" <animecrowdinfo@gmail.com>',
                            to: datiaccount2,
                            subject: 'Benvenuto su AnimeCrowd!',
                            text: 'Ciao ' + datiaccount1 + '! Benvenuto su AnimeCrowd.it 😄,\nda adesso in poi puoi accedere a tutti i servizi presenti sul sito.\nNon riceverai più email, quindi per restare aggiornato seguici sul nostro canale Telegram: https://t.me/+Bosmk92oY_AzYzM0.\nCodice ripristino password: ' + codiceSegretogenerato + '\nAttenzione! Se non ricordi più la tua password o hai qualunque altro problema contatta https://t.me/emaaahhh e fornisci questo codice.\nA presto👋\nIl team di AnimeCrowd.it.'
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email inviata a ' + datiaccount2 + ': ' + info.response);
                            }
                        });

                        res.send("registato");
                        db.close();
                    });
                });

            }else{
                res.send("utente già registato");
            }


            db.close();
        });
    });


}