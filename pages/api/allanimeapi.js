// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from 'mongodb'
const uri = "mongodb+srv://Emanuele:h297k1fklCm2SMfp@animedata.dsmjr.mongodb.net/test?authSource=admin&replicaSet=atlas-mud1pv-shard-0&readPreference=primary&ssl=true";


export default function handler(req, res) {
    MongoClient.connect(uri, { useUnifiedTopology: true },  function(err, db) {
        if (err) throw err;
        var dbo = db.db("animeDB");

        dbo.collection("Anime").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
}
