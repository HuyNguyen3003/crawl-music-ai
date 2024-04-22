const axios = require('axios');
const fs = require('fs');

const headers = {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'fr',
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          'Pragma': 'no-cache',
          'Sec-Ch-Ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"Linux"',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'X-App-Id': 'web_global_seaart',
          'X-Device-Id': '85ee18e1-bcf3-46c3-911e-21e45a46c3fc',
          'X-Platform': 'web',
          'Cookie': '_ga=GA1.1.895849764.1713759069; deviceId=85ee18e1-bcf3-46c3-911e-21e45a46c3fc; lang=fr; _ga_YDMZ43CD3E=GS1.1.1713759069.1.1.1713760907.25.0.0; _ga_4X5PK5P053=GS1.1.1713759070.1.1.1713760907.26.0.0',
          'Referer': 'https://www.seaart.ai/fr/searchView?keyword=Blurred%20futuristic%20background',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
}

const delay = async (time) => {
          setTimeout(() => {

          }, time);
}





const handleCrawData = async (index) => {
          try {
                    let seaart = {}
                    if (fs.existsSync(`data/seaart.json`)) {
                              seaart = await JSON.parse(fs.readFileSync(`data/seaart.json`, 'utf8'));
                              seaart = seaart[`seaart`];
                    }

                    const response = await axios.post('https://www.seaart.ai/api/v1/square/search', {
                              obj_name: 'Blurred futuristic background',
                              obj_type: 1,
                              url: '',
                              page: index,
                              page_size: 50,
                    }, {
                              headers: headers
                    });
                    const resData = response.data["data"].items;



                    if (resData.length < 1) throw new Error('Data is empty!');
                    const handleData = await resData.map((item) => {
                              return { image_path: item.cover };
                    });
                    console.log(handleData);

                    seaart[`${index}`] = handleData;
                    fs.writeFileSync(`data/seaart.json`, JSON.stringify({ seaart }));
                    console.log(`write:${index} is successful!`);


          } catch (error) {
                    console.error(error);
          }
};



/**
 * loop function crawl data
 */
const loopCrawl = async (page = 1, lastpage = 10, time = 2000) => {
          let status = 1;
          while (status && page <= lastpage) {
                    await delay(time)
                    try {
                              console.log(`delay ${time} milisecon`);
                              await delay(5000)
                              await handleCrawData(page)
                              page = page + status;
                    } catch (error) {
                              console.error(error);
                              status = 0
                    }


          }
}


loopCrawl(1, 15);


