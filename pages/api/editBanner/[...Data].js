import { MongoClient, ObjectId } from 'mongodb'
const uri = "mongodb://Emanuele:h297k1fklCm2SMfp@animedata-shard-00-00.dsmjr.mongodb.net:27017,animedata-shard-00-01.dsmjr.mongodb.net:27017,animedata-shard-00-02.dsmjr.mongodb.net:27017/?ssl=true&replicaSet=atlas-mud1pv-shard-0&authSource=admin&retryWrites=true&w=majority";


export default function handler(req, res) {
    const { Data } = req.query

    //email
    var datiaccount1 = Data[0];
    //pass
    var datiaccount2 = Data[1];
    //new banner
    var datiaccount3 = Data[2];

    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("animeDB");
        dbo.collection("Users").updateOne({Email: datiaccount1, Password: datiaccount2}, {$set: {Sfondo: datiaccount3}})
        res.send('oke');
        db.close();
    });

}


