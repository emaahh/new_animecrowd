const EXTERNAL_DATA_URL = 'https://www.animecrowd.it/api/allanimeapi';


const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://www.animecrowd.it/</loc>
            <lastmod>${`${currentDate}`}</lastmod>
            <changefreq>always</changefreq>
        </url>
        <url>
            <loc>https://www.animecrowd.it/legal/privacy</loc>
            <lastmod>${`${currentDate}`}</lastmod>
            <changefreq>always</changefreq>
        </url>
        <url>
            <loc>https://www.animecrowd.it/legal/terms</loc>
            <lastmod>${`${currentDate}`}</lastmod>
            <changefreq>always</changefreq>
        </url>
        ${posts
            .map(({ _id }) => {
                return `
                    <url>
                        <loc>https://www.animecrowd.it/anime/${`${_id}`}</loc>
                        <lastmod>${`${currentDate}`}</lastmod>
                        <changefreq>weekly</changefreq>
                    </url>
                `;
            }).join('')
        }
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL);
  const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;