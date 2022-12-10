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
    //rimuovi da lista(5) o dai preferiti(6)
    var datiaccount4 = Data[3];

    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("animeDB");
        
        dbo.collection("Users").find({Email: datiaccount1, Password: datiaccount2}).toArray(function(err, result) {
            if (err) throw err;

            if(datiaccount4 == 5){
                var oldPinUserArr = result[0].Lista
                var myId = result[0]._id;
                
                function arrayRemove(arr, value) { 
        
                    return arr.filter(function(ele){ 
                        return ele._id != value; 
                    });
                }
    
                var result = arrayRemove(oldPinUserArr, datiaccount3);
    
                dbo.collection("Users").updateOne({Email: datiaccount1, Password: datiaccount2}, {$set: {Lista: result}})
                    
                res.send('oke');
                db.close();

            }else if(datiaccount4 == 6){
                var oldPinUserArr = result[0].Preferiti
                var myId = result[0]._id;
                
                function arrayRemove(arr, value) { 
        
                    return arr.filter(function(ele){ 
                        return ele._id != value; 
                    });
                }
    
                var result = arrayRemove(oldPinUserArr, datiaccount3);
    
                dbo.collection("Users").updateOne({Email: datiaccount1, Password: datiaccount2}, {$set: {Preferiti: result}})
                    
                res.send('oke');
                db.close();
            }

        });
    })

}


