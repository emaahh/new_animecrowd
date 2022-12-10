import { MongoClient, ObjectId } from 'mongodb'
const uri = "mongodb://Emanuele:h297k1fklCm2SMfp@animedata-shard-00-00.dsmjr.mongodb.net:27017,animedata-shard-00-01.dsmjr.mongodb.net:27017,animedata-shard-00-02.dsmjr.mongodb.net:27017/?ssl=true&replicaSet=atlas-mud1pv-shard-0&authSource=admin&retryWrites=true&w=majority";


export default function handler(req, res) {
    const { Data } = req.query

    //email
    var datiaccount1 = Data[0];
    //pass
    var datiaccount2 = Data[1];
    //anime to add
    var datiaccount3 = Data[2];
    //state of anime
    var datiaccount4 = Data[3];

    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("animeDB");
        
        dbo.collection("Users").find({Email: datiaccount1, Password: datiaccount2}).toArray(function(err, result) {
            if (err) throw err;

                if(datiaccount4 != 4){

                    if(result[0].Lista) {
                        var oldAnimeVisti = result[0].Lista
                        oldAnimeVisti.push({_id: datiaccount3, state: datiaccount4})
    
                        dbo.collection("Users").updateOne({Email: datiaccount1, Password: datiaccount2}, {$set: {Lista: oldAnimeVisti}})
    
                        res.send('oke');
                        db.close();
                    }
                    else{
                        var oldAnimeVisti = [{_id: datiaccount3, state: datiaccount4}]
    
                        dbo.collection("Users").updateOne({Email: datiaccount1, Password: datiaccount2}, {$set: {Lista: oldAnimeVisti}})
    
                        res.send('oke');
                        db.close();
                    }

                }else{

                    if(result[0].Preferiti) {
                        var oldAnimeVisti = result[0].Preferiti
                        oldAnimeVisti.push({_id: datiaccount3})
    
                        dbo.collection("Users").updateOne({Email: datiaccount1, Password: datiaccount2}, {$set: {Preferiti: oldAnimeVisti}})
    
                        res.send('oke');
                        db.close();
                    }
                    else{
                        var oldAnimeVisti = [{_id: datiaccount3}]
    
                        dbo.collection("Users").updateOne({Email: datiaccount1, Password: datiaccount2}, {$set: {Preferiti: oldAnimeVisti}})
    
                        res.send('oke');
                        db.close();
                    }

                }
                

        });
    })

}


