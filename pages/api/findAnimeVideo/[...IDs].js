var DOMParser = require('dom-parser');

export default function handler(req, res) {
    const { IDs } = req.query

    var base = IDs[0];
    var link = IDs[1];
        
    var baseurl = 'https://www.animeworld.tv'

    let PreLink = []

    fetch(baseurl + '/play/'+ base + '/' + link)
        .then(res => res.text())
        .then(text => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(text, 'text/html');
            var newsRow = parser.parseFromString(doc.getElementById('download').innerHTML, 'text/html');

            var f = newsRow.getElementsByTagName("a")[1].getAttribute('href');

            PreLink.push(f)

            res.send(PreLink);
        })
}

        
