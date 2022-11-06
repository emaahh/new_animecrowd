import { MongoClient, ObjectId } from 'mongodb'
const uri = "mongodb://Emanuele:h297k1fklCm2SMfp@animedata-shard-00-00.dsmjr.mongodb.net:27017,animedata-shard-00-01.dsmjr.mongodb.net:27017,animedata-shard-00-02.dsmjr.mongodb.net:27017/?ssl=true&replicaSet=atlas-mud1pv-shard-0&authSource=admin&retryWrites=true&w=majority";


export default function handler(req, res) {

    const { query } = req.query
    
        //db
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
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
