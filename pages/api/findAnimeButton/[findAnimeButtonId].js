var DOMParser = require('dom-parser');

export default function handler(req, res) {
    const { findAnimeButtonId } = req.query

    var baseurl = 'https://www.animeworld.tv'
    let PreLink = []

    fetch(baseurl + '/play/' + findAnimeButtonId)
        .then(res => res.text())
        .then(text => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(text, 'text/html');
            var newsRow = parser.parseFromString(doc.getElementsByClassName('server active')[0].innerHTML, 'text/html');

            const docs = parser.parseFromString(newsRow.getElementsByTagName("a")[0].getAttribute('href'), 'text/html');

            newsRow.getElementsByTagName("a").forEach((element, index) => {

                let d = element.getAttribute('href').replace('/play/'+findAnimeButtonId+'/', '')
                let b = element.innerHTML

                PreLink.push({_id: index, src: d, title:b})
                        
            })

            res.send(PreLink);
                        
        });

}
