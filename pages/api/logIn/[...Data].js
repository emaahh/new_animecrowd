import { MongoClient, ObjectId } from 'mongodb'
const uri = "mongodb://Emanuele:h297k1fklCm2SMfp@animedata-shard-00-00.dsmjr.mongodb.net:27017,animedata-shard-00-01.dsmjr.mongodb.net:27017,animedata-shard-00-02.dsmjr.mongodb.net:27017/?ssl=true&replicaSet=atlas-mud1pv-shard-0&authSource=admin&retryWrites=true&w=majority";


export default function handler(req, res) {
    const { Data } = req.query

    var email = Data[0];
    var pass = Data[1];
    
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("animeDB");
        dbo.collection("Users").find({Email: email, Password: pass}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
    
}