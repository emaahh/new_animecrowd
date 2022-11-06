import { MongoClient, ObjectId } from 'mongodb'
const uri = "mongodb://Emanuele:h297k1fklCm2SMfp@animedata-shard-00-00.dsmjr.mongodb.net:27017,animedata-shard-00-01.dsmjr.mongodb.net:27017,animedata-shard-00-02.dsmjr.mongodb.net:27017/?ssl=true&replicaSet=atlas-mud1pv-shard-0&authSource=admin&retryWrites=true&w=majority";
//"mongodb+srv://Emanuele:h297k1fklCm2SMfp@animedata.dsmjr.mongodb.net/test?authSource=admin&replicaSet=atlas-mud1pv-shard-0&readPreference=primary&ssl=true"

export default function handler(req, res) {

    const { findAnimeId } = req.query
    if(ObjectId.isValid(findAnimeId)){
        var o_id = new ObjectId(findAnimeId);
        //db
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true },  function(err, db) {
            if (err) throw res.send(['nessun risultato']);
            var dbo = db.db("animeDB");
            dbo.collection("Anime").find({"_id" : o_id}).toArray(function(err, result) {
                if (err) throw res.send(['nessun risultato']);
                res.send(result);
                db.close();
            });
        });
    }else{
        res.send(['nessun risultato']);
    }
    

    
    
}
