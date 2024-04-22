

const axios = require('axios');
const fs = require('fs');
const headers = {
    'Accept': '*/*',
    'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Pragma': 'no-cache',
    'Sec-Ch-Ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Linux"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'X-Requested-With': 'XMLHttpRequest',
    'Cookie': '_us=1713862041; _us=1713862124; _ga=GA1.1.1000752719.1713253822; __stripe_mid=f0a4dcd0-615f-4226-a9b6-a9218d388e6d602aba; PHPSESSID=52584afbc4e47ea9cf8e23dd69103ef8; _ga_SFGWBCDFBN=GS1.1.1713513410.7.1.1713514739.0.0.0; _uads=a%3A2%3A%7Bs%3A4%3A%26quot%3Bdate%26quot%3B%3Bi%3A1713861671%3Bs%3A5%3A%26quot%3Buaid_%26quot%3B%3Ba%3A0%3A%7B%7D%7D; mode=night; __stripe_sid=3f49dcea-b53f-457f-a1e6-cd043ec1bae6c7f7d1; _us=1713862123',
    'Referer': 'https://ari-sound.aurumai.io/discover',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
}

const delay = async (time) => {
    setTimeout(() => {

    }, time);
}
const usernames = [
    "SynthSun88",
    "BloomingBrush_",
    "NeonEchoes56",
    "CosmicDjembe33x",
    "MidnightRiser7",
    "DigitalSunrise10",
    "ReverbRain21",
    "HarmonicEscape99",
    "SonicRhapsody01",
    "MelodicFlame88",
    "PsychedelicSky45",
    "FractalBeats13",
    "VinylVoyage62",
    "BassNomad38",
    "GlitchNoir29",
    "EtherVox77",
    "TropicalPulse19",
    "HarmonicHavoc51",
    "DreamscapeSymphony42",
    "StarlitSerenade90",
    "MidnightCroons20",
    "Twilight_siren19",
    "SpectralReverie35",
    "CyberFolk40",
    "HarmonicDrive83",
    "MoonshineMelody14",
    "Velvetspark8",
    "Indieneosoul95",
    "SonicAlchemist02",
    "RebelliousChords71",
    "VinylRemedy24",
    "HarmonicEscape99",
    "DigitalNomad17",
    "DissonantHarmony31",
    "NocturnalFrequency82",
    "CyberneticJungle49",
    "EtherealLullaby09",
    "Hazzle51",
    "MiserySymphony42",
    "AstralCataclysmm",
    "Euphorian",
    "Rpsdy01",
    "futUrrhythimc",
    "Metameowlody",
    "midnightkitty00x",
    "2ammess",
    "Alezha",
    "Swiftieex",
    "Lo-FiLoveSong92",
    "GroovyGrooves",
    "Redmatrix_",
    "Lilacroses",
    "Mystichouse",
    "Souless_queeniex",
    "KinexMix",
    "Preppy_gurl",
    "Trixxi",
    "Cryptic_rose76",
    "Ihopeuok",
    "CreativeChef_83",
    "GlobetrottingGazelle",
    "Brenda",
    "dontcallmeBryan",
    "Autumnne",
    "BrainstormingBee",
    "XXDreamer_33",
    "Urbaniez",
    "Vyeyy",
    "Drxke-duh-29",
    "HypeBandit",
    "Fortnight",
    "VinylVerse",
    "Rebelx8",
    "LofiBGM",
    "Melrose82m",
    "Dr.Debbi291",
    "FlowingFlow75",
    "Indigoshadow39",
    "Serene-xignal",
    "CyberStrk",
    "AzureNightingale72",
    "MoonlightMemoriez",
    "breakinB",
    "Acix8",
    "Glitchglxy",
    "Whisperingwind",
    "VVibrancy",
    "PxltPrtrt",
    "RRvltn",
    "ElectricEscape",
    "Voltx00",
    "Mimuze",
    "Sk8terboi",
    "Goodn8borshud",
    "Zaynd",
    "Vibe_hoodz2i3",
    "MalonePost",
    "StarstruckVenti",
    "Sweetwatermelon_sugarz",
    "imstr8"
];



const handleCreateUser = async (index) => {
    try {
        let account = {}
        if (fs.existsSync(`data/account-ari.json`)) {
            account = await JSON.parse(fs.readFileSync(`data/account-ari.json`, 'utf8'));
            account = account[`account`];
        }

        const response = await axios.post('https://ari-sound.aurumai.io/endpoints/auth/signup?hash_id=f0fe6f5cdb3f0e58a4fd8f8030b2eb9620b2fbfc', {
            name: `${usernames[index]}`,
            username: `${usernames[index]}`,
            email: `${usernames[index]}@gmail.com`,
            password: 'admin!@#',
            c_password: 'admin!@#'
        }, {
            headers: headers
        });

        if (response.data.status === 200) {
            console.log(`creact account ${usernames[index]} is successful!`);
            const handleData = {
                username: `${usernames[index]}`,
                email: `${usernames[index]}@gmail.com`,
                password: 'admin!@#',
            }
            account[`${index}`] = handleData;
            fs.writeFileSync(`data/account-ari.json`, JSON.stringify({ account }));

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

loopCreate(3, 99)




