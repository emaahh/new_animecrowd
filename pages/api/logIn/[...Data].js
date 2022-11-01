import { MongoClient, ObjectId } from 'mongodb'
const uri = "mongodb+srv://Emanuele:h297k1fklCm2SMfp@animedata.dsmjr.mongodb.net/test?authSource=admin&replicaSet=atlas-mud1pv-shard-0&readPreference=primary&ssl=true";


export default function handler(req, res) {
    const { Data } = req.query

    var email = Data[0];
    var pass = Data[1];
    
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("animeDB");
        dbo.collection("Users").find({Email: email, Password: pass}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
    
}