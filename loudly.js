const axios = require('axios');
const fs = require('fs');

let headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
    'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'Referer': 'https://www.loudly.com/',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
}
const delay = async (time) => {
    setTimeout(() => {

    }, time);
}



/**
 * crawl data from loudly.com and save to file json
 */
const handleCrawData = async (page) => {
    try {
        let loudly = {}
        if (fs.existsSync(`dataCrawl/loudly.json`)) {
            loudly = await JSON.parse(fs.readFileSync(`dataCrawl/loudly.json`, 'utf8'));
            loudly = loudly[`loudly`];
        }

        const response = await axios.get(`https://soundtracks.loudly.com/songs?page=${page}&sort_by[]=quality_score:desc`,
            {},
            {
                headers: headers
            }
        );

        let resData = await response.data.items;
        if (resData.length < 1) throw new Error('Data is empty!');
        const handleData = await resData.map((item) => {
            return { song_path: item.music_file_path };
        });

        loudly[`${page}`] = handleData;
        fs.writeFileSync(`dataCrawl/loudly.json`, JSON.stringify({ loudly }));
        console.log(`write :${page} is successful!`);


    } catch (error) {
        console.error(error);
    }
};


/**
 * loop function crawl data
 */
const loopCrawl = async (page = 1, time = 2000) => {
    let status = 1;
    while (status) {
        await delay(time)
        try {
            console.log(`delay ${time} milisecon`);

            await delay(5000)
            await handleCrawData(page);
            page = page + status;
        } catch (error) {
            console.error(error);
            status = 0
        }


    }
}

// ple check file dataCrawl/loudly.json and find last index in obj ex: "number a"
// run loopCrawl(number a + 1)
//loopCrawl(1);


