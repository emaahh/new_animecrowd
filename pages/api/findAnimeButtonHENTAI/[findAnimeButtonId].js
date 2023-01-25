var DOMParser = require('dom-parser');

export default function handler(req, res) {
    const { findAnimeButtonId } = req.query

    var baseurl = 'http://www.hentaiworld.me/'
    let PreLink = []

    fetch(baseurl + '/watch/' + findAnimeButtonId)
        .then(res => res.text())
        .then(text => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(text, 'text/html');
            var newsRow = parser.parseFromString(doc.getElementsByClassName('episodes range  active ')[0].innerHTML, 'text/html');

            

            newsRow.getElementsByTagName("li").forEach((element, index) => {
                var tt = parser.parseFromString('<'+element.innerHTML+'</a>', 'text/html')
                
                console.log()
                
                let d = tt.rawHTML.match(/href="([^"]*)/)[1].replace('/watch/'+findAnimeButtonId+'/', '')
                let b = index

                PreLink.push({_id: index, src: d, title:b+1})
                        
            })

            res.send(PreLink);
                        
        });

}
