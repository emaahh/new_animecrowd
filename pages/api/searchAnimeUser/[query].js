import { MongoClient, ObjectId } from 'mongodb'
const uri = "mongodb+srv://Emanuele:h297k1fklCm2SMfp@animedata.dsmjr.mongodb.net/test?authSource=admin&replicaSet=atlas-mud1pv-shard-0&readPreference=primary&ssl=true";


export default function handler(req, res) {

    const { query } = req.query
    
        //db
        MongoClient.connect(uri, function(err, db) {
            if (err) throw err;
            var dbo = db.db("animeDB");
            var totalresult;
            dbo.collection("Anime").find({"Nome" : {$regex : query, $options: 'i'}}).toArray(function(err, result) {
                if (err) throw err;

                totalresult = result

                dbo.collection("Users").find({"NomeUtente" : {$regex : query, $options: 'i'}}).toArray(function(err, results) {
                    if (err) throw err;
                        totalresult = totalresult.concat(results)
                        res.send(totalresult);
                    db.close();
                });

            });
        });
    
    
}
