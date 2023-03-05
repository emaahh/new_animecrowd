// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async function handler(req, res) {
    let result = '';

    fetch('https://animecrowd.it/api/findnew')
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                result += '<div class="posts"><h1>'+element.Nome+'</h1><Image src="'+element.Copertina+'"/><a href="https://www.animecrowd.it/anime/'+ element._id +'">https://www.animecrowd.it/anime/'+ element._id +'</a></div>'
            });
            res.send(result);
        });  
}



