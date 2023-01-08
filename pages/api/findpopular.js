// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from 'mongodb'
const uri = "mongodb://Emanuele:h297k1fklCm2SMfp@animedata-shard-00-00.dsmjr.mongodb.net:27017,animedata-shard-00-01.dsmjr.mongodb.net:27017,animedata-shard-00-02.dsmjr.mongodb.net:27017/?ssl=true&replicaSet=atlas-mud1pv-shard-0&authSource=admin&retryWrites=true&w=majority";
var DOMParser = require('dom-parser');
var parser = new DOMParser();

export default function handler(req, res) {
    var arrCompleto = []
    
    fetch('https://myanimelist.net/topanime.php?type=airing')
        .then((response) => response.text())
        .then((data) => {
           
            var doc = parser.parseFromString(data, 'text/html');
           


            doc.getElementsByTagName('tr').forEach((element, index) => {
                if(index > 0){
                    arrCompleto.push({Nome: element.getElementsByTagName('a')[1].innerHTML, Valutazione: element.getElementsByClassName('text on score-label')[0].innerHTML})
                }

                if(doc.getElementsByTagName('tr').length == index+1){
                    
                    callMongo()
                    console.log('callMongo')
                }
            });

            
           
            
        
        
        });

    function callMongo(){
        MongoClient.connect(uri, async function(err, dbo) {
            let final_result = []
            let i = 0;

            arrCompleto.forEach((item, index) => {

                    dbo.db("animeDB").collection("Anime").find({"Nome" : { '$regex' : item.Nome, "$options": "$i" }}).toArray(async function(err, result) {
                        
                        if(result[0] != undefined) {
                            i++
                            final_result.push({_id: result[0]._id, Nome: result[0].Nome, Copertina: result[0].Copertina, Stato: result[0].Stato, Generi: result[0].Generi, Uscita: result[0].Uscita, Valutazione: item.Valutazione});
    
                            if(arrCompleto.length == i){
                                console.log('fatto')
                                
                                res.end(JSON.stringify(final_result));
                            }
                        }else{
                            i++
    
                            if(arrCompleto.length == i){
                                console.log('fatto')
                                
                                res.end(JSON.stringify(final_result));
                                dbo.close();
                            }
                        }
                        
                });
            });
    
        });
    }
    
}



