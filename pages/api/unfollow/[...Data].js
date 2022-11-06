import { MongoClient, ObjectId } from 'mongodb'
const uri = "mongodb://Emanuele:h297k1fklCm2SMfp@animedata-shard-00-00.dsmjr.mongodb.net:27017,animedata-shard-00-01.dsmjr.mongodb.net:27017,animedata-shard-00-02.dsmjr.mongodb.net:27017/?ssl=true&replicaSet=atlas-mud1pv-shard-0&authSource=admin&retryWrites=true&w=majority";


export default function handler(req, res) {
    const { Data } = req.query

   //myemail
   var myemail = Data[0];
   //mypass
   var mypass = Data[1];
   //utente da smettere di seguire
   var userid = Data[2];

    //db
    MongoClient.connect(uri, function(err, db) {
                
        if (err) throw err;
        var dbo = db.db("animeDB");
                
        dbo.collection("Users").find({Email: myemail, Password: mypass}).toArray(function(err, result) {
            if (err) throw err;

            var oldPinUserArr = result[0].Amici
            var myId = result[0]._id;
            

            dbo.collection("Users").find({_id : ObjectId(userid)}).toArray(function(err, resultuser) {

                function arrayRemove(arr, value) { 

                    return arr.filter(function(ele){ 
                        return ele._id != value; 
                    });
                }

                function arrayRemovebuhhh(arre, valuee) { 

                    return arre.filter(function(ele){ 
                        if(ele._id != undefined){
                            return ele._id.toString() != valuee.toString(); 
                        }
                        
                    });
                }

                var result = arrayRemove(oldPinUserArr, userid);


                var oldMiSeguono;
                var newMiSeguono;
                
                oldMiSeguono = resultuser[0].MiSeguono

                newMiSeguono = arrayRemovebuhhh(oldMiSeguono, myId);


                dbo.collection("Users").updateOne({_id : ObjectId(userid)}, {$set: {MiSeguono: newMiSeguono}})
                dbo.collection("Users").updateOne({Email: myemail, Password: mypass}, {$set: {Amici: result}})
                

                res.send(resultuser[0].NomeUtente);
                db.close();
            });
                        
        });
    });


}