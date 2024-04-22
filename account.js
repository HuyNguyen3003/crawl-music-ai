

const axios = require('axios');
const fs = require('fs');
const headers = {
    "accept": "*/*",
    "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_us=1713838170; _us=1713838425; _ga=GA1.1.1000752719.1713253822; __stripe_mid=f0a4dcd0-615f-4226-a9b6-a9218d388e6d602aba; PHPSESSID=52584afbc4e47ea9cf8e23dd69103ef8; _ga_SFGWBCDFBN=GS1.1.1713513410.7.1.1713514739.0.0.0; mode=night; _uads=a%3A2%3A%7Bs%3A4%3A%26quot%3Bdate%26quot%3B%3Bi%3A1713836935%3Bs%3A5%3A%26quot%3Buaid_%26quot%3B%3Ba%3A0%3A%7B%7D%7D; __stripe_sid=d63994d7-1f48-4bca-9b57-ed499054aa5714db24; user_id=a8bc2162337a75b3c51c303dedacd21036318d4717137517702fafb94c1a406141838654e63852cbdf; _us=1713838425",
    "Referer": "https://ari-sound.aurumai.io/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
}

const delay = async (time) => {
    setTimeout(() => {

    }, time);
}



const handleCreateUser = async (index) => {
    try {
        let account = {}
        if (fs.existsSync(`data/account-ari.json`)) {
            account = await JSON.parse(fs.readFileSync(`data/account-ari.json`, 'utf8'));
            account = account[`account`];
        }

        const response = await axios.post('https://ari-sound.aurumai.io/endpoints/auth/signup?hash_id=aaccb8bb2b4c442a7c16a9b209c9ff448c6c5f35', {
            name: `accountdev${index}`,
            username: `accountdev${index}`,
            email: `accountdev${index}@gmail.com`,
            password: 'accountdev',
            c_password: 'accountdev'
        }, {
            headers: headers
        });
        console.log(response.data.status);
        if (response.data.status === 200) {
            const handleData = {
                usename: `accountdev${index}`,
                gmail: `aaccountdev${index}@gmail.com`,
                password: "accountdev"
            }
            account[`${index}`] = handleData;
            fs.writeFileSync(`data/account-ari.json`, JSON.stringify({ account }));
            console.log(`creact aaccountdev${index} is successful!`);
        } else {
            throw new Error('error!');
        }

    } catch (error) {
        console.log(error)
    }
}




const loopCreate = async (index, lastindex = index + 100, time = 2000) => {
    let status = 1;
    while (status && index <= lastindex) {
        await delay(time)
        try {
            console.log(`delay ${time} milisecon`);

            await delay(5000)
            await handleCreateUser(index);
            index = index + status;
        } catch (error) {
            console.error(error);
            status = 0
        }



    }
}

loopCreate(13, 200)




