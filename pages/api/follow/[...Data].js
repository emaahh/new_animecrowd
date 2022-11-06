import { MongoClient, ObjectId } from 'mongodb'
const uri = "mongodb://Emanuele:h297k1fklCm2SMfp@animedata-shard-00-00.dsmjr.mongodb.net:27017,animedata-shard-00-01.dsmjr.mongodb.net:27017,animedata-shard-00-02.dsmjr.mongodb.net:27017/?ssl=true&replicaSet=atlas-mud1pv-shard-0&authSource=admin&retryWrites=true&w=majority";


export default function handler(req, res) {
    const { Data } = req.query

    //myemail
    var myemail = Data[0];
    //mypass
    var mypass = Data[1];
    //utente da seguire
    var userid = Data[2];

    MongoClient.connect(uri, function(err, db) {
            
        if (err) throw err;
        var dbo = db.db("animeDB");
                
        dbo.collection("Users").find({Email: myemail, Password: mypass}).toArray(function(err, result) {
            if (err) throw err;
            var myid = ObjectId(result[0]._id)
            var oldPinUserArr = result[0].Amici
            

            dbo.collection("Users").find({_id : ObjectId(userid)}).toArray(function(err, resultuser) {
                oldPinUserArr.push({_id: userid});
                var oldMiSeguono;
                var newMiSeguono;

                console.log(resultuser[0].MiSeguono)
                if(resultuser[0].MiSeguono) {
                    oldMiSeguono = resultuser[0].MiSeguono
                    newMiSeguono = oldMiSeguono.push({_id: myid})

                    dbo.collection("Users").updateOne({_id : ObjectId(userid)}, {$set: {MiSeguono: oldMiSeguono}})
                    dbo.collection("Users").updateOne({Email: myemail, Password: mypass}, {$set: {Amici: oldPinUserArr}})

                    res.send(resultuser[0].NomeUtente);
                }
                else{
                    oldMiSeguono = [{_id:'no'},{_id: myid}]
                    newMiSeguono = oldMiSeguono

                    dbo.collection("Users").updateOne({_id : ObjectId(userid)}, {$set: {MiSeguono: newMiSeguono}})
                    dbo.collection("Users").updateOne({Email: myemail, Password: mypass}, {$set: {Amici: oldPinUserArr}})

                    res.send(resultuser[0].NomeUtente);
                }

                /*dbo.collection("Users").updateOne({_id : ObjectId(userid)}, {$set: {MiSeguono: newMiSeguono}})
                dbo.collection("Users").updateOne({Email: myemail, Password: mypass}, {$set: {Amici: oldPinUserArr}})*/

            });
                        
        });
    });


}