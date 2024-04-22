const axios = require('axios');
const fs = require('fs');

let headers = {
    Accept: 'application/json, text/plain, */*',
    'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
    'Content-Type': 'application/json',
    'Sec-Ch-UA': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
    'Sec-Ch-UA-Mobile': '?0',
    'Sec-Ch-UA-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    Referer: 'https://www.udio.com/',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
};
const delay = async (time) => {
    setTimeout(() => {

    }, time);
}


/**
 * crawl data from udio.com and save to file json
 */
const handleCrawData = async (pageParam, pageSize) => {
    try {
        let udio = {}
        if (fs.existsSync(`data/udio.json`)) {
            udio = await JSON.parse(fs.readFileSync(`data/udio.json`, 'utf8'));
            udio = udio[`udio`];
        }

        const response = await axios.post(
            'https://www.udio.com/api/songs/search',
            {
                searchQuery: {
                    sort: 'trending_score',
                },
                trendingId: "900fc3ed-455a-4ae2-bbfb-2a8c0d56beb0",
                pageParam: pageParam,
                pageSize: pageSize
            },
            {
                headers: headers
            }
        );

        let resData = await response.data.data;
        if (resData.length < 1) throw new Error('Data is empty!');
        const handleData = await resData.map((item) => {
            return { title: item.title, lyrics: item.lyrics, song_path: item.song_path, image_path: item.image_path };
        });
        console.log(handleData)

        udio[`${pageParam}-${pageSize}`] = handleData;
        fs.writeFileSync(`data/udio.json`, JSON.stringify({ udio }));
        console.log(`write :${pageParam}-${pageSize} is successful!`);


    } catch (error) {
        console.error(error);
    }
};

/**
 * loop function crawl data
 */
const loopCrawl = async (pageParam = 0, pageSize = 100, time = 2000) => {
    let status = 1;
    while (status && pageParam <= 200) {
        await delay(time)
        try {
            console.log(`delay ${time} milisecon`);

            await delay(5000)
            await handleCrawData(pageParam, pageSize);
            pageParam = pageParam + status;
        } catch (error) {
            console.error(error);
            status = 0
        }



    }
}


// ple check file data/udio.json find last index in obj ex: "number a-number b"
// run loopCrawl(number a + 1)
loopCrawl(0);
