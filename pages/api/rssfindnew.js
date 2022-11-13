// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async function handler(req, res) {
    let result = '';

    fetch('https://newanimecrowd.vercel.app/api/findnew')
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                result += '<div><h1>'+element.Nome+'</h1><img src="'+element.Copertina+'"/><p>https://www.animecrowd.it/anime/'+ element._id +'</p></div>'
            });
            res.send(result);
        });


    


    


    
}



