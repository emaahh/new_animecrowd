import { MongoClient, ObjectId } from 'mongodb'
const uri = "mongodb://Emanuele:h297k1fklCm2SMfp@animedata-shard-00-00.dsmjr.mongodb.net:27017,animedata-shard-00-01.dsmjr.mongodb.net:27017,animedata-shard-00-02.dsmjr.mongodb.net:27017/?ssl=true&replicaSet=atlas-mud1pv-shard-0&authSource=admin&retryWrites=true&w=majority";


export default function handler(req, res) {
    
    var {query} = req.query
    
    console.log(query)

    const arrfilter = query.split(/[,.\s]/);


    //var result = [new RegExp(arrfilter.join(","))];

    var final = []


    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("animeDB");

        dbo.collection("Anime").find({}).toArray(function(err, result) {
            if (err) throw err;

                result.forEach((element, index) => {

                    var generi = element.Generi.replace(/ - /g, ',').split(/[,.\s]/)

                    const multipleExist = arrfilter.every(value => {
                        return generi.includes(value);
                    });

                    if(multipleExist == true){
                        final.push(element)
                    }

                    if(result.length-1 == index){
                        res.send(final);
                    }

                });

            db.close();
        });
    });
    
    
}
