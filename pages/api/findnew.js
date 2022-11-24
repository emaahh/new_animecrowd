// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from 'mongodb'
const uri = "mongodb://Emanuele:h297k1fklCm2SMfp@animedata-shard-00-00.dsmjr.mongodb.net:27017,animedata-shard-00-01.dsmjr.mongodb.net:27017,animedata-shard-00-02.dsmjr.mongodb.net:27017/?ssl=true&replicaSet=atlas-mud1pv-shard-0&authSource=admin&retryWrites=true&w=majority";

let Parser = require('rss-parser');
let parser = new Parser();

export default async function handler(req, res) {
    let feed = await parser.parseURL('https://www.animeworld.tv/rss/episodes');
    let final_result = []
    let i = 0;

    MongoClient.connect(uri, async function(err, dbo) {
        

        feed.items.forEach((item, index) => {
            
            let link = item.link.replace('https://www.animeworld.tv/play/','').split("/")[0];
            let Nome = item.title

                dbo.db("animeDB").collection("Anime").find({"IdAW" : link}).toArray(async function(err, result) {
                    
                    if(result[0] != undefined) {
                        i++
                        final_result.push({_id: result[0]._id, Nome: Nome, Copertina: result[0].Copertina, Stato: result[0].Stato, Generi: result[0].Generi, Uscita: result[0].Uscita, Trama: result[0].Trama});

                        if(feed.items.length == i){
                            console.log('fatto')
                            
                            res.end(JSON.stringify(final_result));
                        }
                    }else{
                        i++

                        if(feed.items.length == i){
                            console.log('fatto')
                            
                            res.end(JSON.stringify(final_result));
                        }
                    }
                    
            });
        });

    });
    
}



