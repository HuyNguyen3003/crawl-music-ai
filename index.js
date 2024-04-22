
const axios = require('axios');
const fs = require('fs');
const path = require('path');


const account = require('./data/account-ari.json');
const udio = require('./data/udio.json');

const accountData = account['account'];
const udioData = udio['udio'];

const pathUdioMusic = 'data-local/music';
const pathUdioImage = 'data-local/image';




//Hàm tải tệp âm thanh và hình ảnh
async function downloadFiles() {


          for (let item in udioData["0-100"]) {
                    // Tải tệp âm thanh
                    const songFilename = path.basename(`${udioData["0-100"]}.mp3`);
                    const songPath = path.join(pathUdioMusic, songFilename);
                    const songStream = fs.createWriteStream(songPath);
                    await axios({
                              method: 'get',
                              url: `${udioData["0-100"].song_path}`,
                              responseType: 'stream'
                    }).then(response => {
                              response.data.pipe(songStream);
                              console.log(`${songFilename} downloaded successfully!`);
                    }).catch(error => {
                              console.error(`Error downloading ${songFilename}: ${error}`);
                    });

                    // Tải hình ảnh
                    const imageFilename = path.basename(`${udioData["0-100"]}.jpg`);
                    const imagePath = path.join(pathUdioImage, imageFilename);
                    const imageStream = fs.createWriteStream(imagePath);
                    await axios({
                              method: 'get',
                              url: `${udioData["0-100"].image_path}`,
                              responseType: 'stream'
                    }).then(response => {
                              response.data.pipe(imageStream);
                              console.log(`${imageFilename} downloaded successfully!`);
                    }).catch(error => {
                              console.error(`Error downloading ${imageFilename}: ${error}`);
                    });
          }
}
downloadFiles();

// /////////////////////////////
// let cookieLogin = {}

// async function login() {
//           try {
//                     const response = await axios.post(
//                               'https://ari-sound.aurumai.io/endpoints/auth/login?hash_id=f0fe6f5cdb3f0e58a4fd8f8030b2eb9620b2fbfc',
//                               'username=admin&password=Admin123!%40%23',
//                               {
//                                         headers: {
//                                                   "accept": "*/*",
//                                                   "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
//                                                   "cache-control": "no-cache",
//                                                   "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//                                                   "pragma": "no-cache",
//                                                   "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
//                                                   "sec-ch-ua-mobile": "?0",
//                                                   "sec-ch-ua-platform": "\"Linux\"",
//                                                   "sec-fetch-dest": "empty",
//                                                   "sec-fetch-mode": "cors",
//                                                   "sec-fetch-site": "same-origin",
//                                                   "x-requested-with": "XMLHttpRequest",
//                                                   "cookie": "_us=1713869990; _us=1713870501; _ga=GA1.1.1000752719.1713253822; __stripe_mid=f0a4dcd0-615f-4226-a9b6-a9218d388e6d602aba; PHPSESSID=52584afbc4e47ea9cf8e23dd69103ef8; _ga_SFGWBCDFBN=GS1.1.1713513410.7.1.1713514739.0.0.0; _uads=a%3A2%3A%7Bs%3A4%3A%26quot%3Bdate%26quot%3B%3Bi%3A1713861671%3Bs%3A5%3A%26quot%3Buaid_%26quot%3B%3Ba%3A0%3A%7B%7D%7D; mode=night; __stripe_sid=3f49dcea-b53f-457f-a1e6-cd043ec1bae6c7f7d1; user_id=c9cd8d3a4356b945bdbd1127e2904c1987389146171378359080a8edd1d700d5f544c205c529fe40e5; _us=1713870502",
//                                                   "Referer": "https://ari-sound.aurumai.io/admin/songs",
//                                                   "Referrer-Policy": "strict-origin-when-cross-origin"
//                                         }
//                               }
//                     );

//                     console.log('Login successful!');
//                     console.log("Cookies:", response.headers['set-cookie']);
//                     cookieLogin = response.headers['set-cookie'];
//           } catch (error) {
//                     console.error('Error logging in:', error);
//           }
// }

// // Call the function to log in
// login();







// const headersAudio = {
//           "accept": "application/json, text/javascript, */*; q=0.01",
//           "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
//           "cache-control": "no-cache",
//           "content-type": "multipart/form-data; boundary=----WebKitFormBoundary9nDWmkyf8UnV0pBg",
//           "pragma": "no-cache",
//           "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
//           "sec-ch-ua-mobile": "?0",
//           "sec-ch-ua-platform": "\"Linux\"",
//           "sec-fetch-dest": "empty",
//           "sec-fetch-mode": "cors",
//           "sec-fetch-site": "same-origin",
//           "x-requested-with": "XMLHttpRequest",
//           "cookie": `${cookieLogin[0]};${cookieLogin[1]}`,
//           "Referer": "https://ari-sound.aurumai.io/upload-single",
//           "Referrer-Policy": "strict-origin-when-cross-origin"
// }
// const headersImage = {
//           "accept": "*/*",
//           "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
//           "cache-control": "no-cache",
//           "content-type": "multipart/form-data; boundary=----WebKitFormBoundary90iHwYubuQVViGqH",
//           "pragma": "no-cache",
//           "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
//           "sec-ch-ua-mobile": "?0",
//           "sec-ch-ua-platform": "\"Linux\"",
//           "sec-fetch-dest": "empty",
//           "sec-fetch-mode": "cors",
//           "sec-fetch-site": "same-origin",
//           "x-requested-with": "XMLHttpRequest",
//           "cookie": `${cookieLogin[0]};${cookieLogin[1]}`,
//           "Referer": "https://ari-sound.aurumai.io/upload-single",
//           "Referrer-Policy": "strict-origin-when-cross-origin"
// }
// const headerSubmit = {
//           "accept": "*/*",
//           "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
//           "cache-control": "no-cache",
//           "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//           "pragma": "no-cache",
//           "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
//           "sec-ch-ua-mobile": "?0",
//           "sec-ch-ua-platform": "\"Linux\"",
//           "sec-fetch-dest": "empty",
//           "sec-fetch-mode": "cors",
//           "sec-fetch-site": "same-origin",
//           "x-requested-with": "XMLHttpRequest",
//           "cookie": `${cookieLogin[0]};${cookieLogin[1]}`,
//           "Referer": "https://ari-sound.aurumai.io/upload-single",
//           "Referrer-Policy": "strict-origin-when-cross-origin"
// }

// ////// 1. Read the audio file as binary and upload it to the server
// ///// 2. Read the image file as binary and upload it to the server
// ///// 3. Submit the song details to the server 

// // Function to read the audio file as binary
// function readFileAsync(filePath) {
//           return new Promise((resolve, reject) => {
//                     fs.readFile(filePath, (err, data) => {
//                               if (err) reject(err);
//                               resolve(data);
//                     });
//           });
// }

// async function uploadSong() {
//           // Replace 'path_to_audio_file' with the actual path to your audio file
//           const audioFilePath = './test.mp3';
//           const audioFileData = await readFileAsync(audioFilePath);
//           const imageFilePath = './public.jpg';
//           const imageFileData = await readFileAsync(imageFilePath);

//           const formDataAdio = new FormData();
//           const blobAudio = new Blob([audioFileData], { type: 'audio/mp3' }); // Creating a Blob object
//           formDataAdio.append('audio', blobAudio, 'Neon Shadows ext v2.1.1.mp3'); // Appending the Blob to FormData

//           const formDataImage = new FormData();
//           const blobImage = new Blob([imageFileData], { type: "image/png" }); // Creating a Blob object
//           formDataImage.append('thumbnail', blobImage, 'demo.jpg'); // Appending the Blob to FormData

//           try {
//                     const responseAudio = await axios.post('https://ari-sound.aurumai.io/endpoints/upload-song?hash_id=f0fe6f5cdb3f0e58a4fd8f8030b2eb9620b2fbfc', formDataAdio, {
//                               headers: headersAudio
//                     });

//                     if (responseAudio.status === 200) {
//                               console.log('Song uploaded successfully!');
//                               console.log("data::", responseAudio.data);
//                     } else {
//                               console.error('Failed to upload song:', response.statusText);
//                     }

//                     const responseImage = await axios.post('https://ari-sound.aurumai.io/endpoints/upload-thumbnail?hash_id=f0fe6f5cdb3f0e58a4fd8f8030b2eb9620b2fbfc', formDataImage, {
//                               headers: headersImage
//                     });

//                     if (responseImage.status === 200) {
//                               console.log('Image uploaded successfully!');
//                               console.log("data::", responseImage.data);
//                     } else {
//                               console.error('Failed to upload song:', response.statusText);
//                     }


//                     const formData = new FormData();
//                     formData.append('title', 'testdemo');
//                     formData.append('description', 'testdemo');
//                     formData.append('lyrics', 'testdemo');
//                     formData.append('artist_tag', 'AI');
//                     formData.append('parts', '');
//                     formData.append('tags', 'AI');
//                     formData.append('category_id', '2');
//                     formData.append('privacy', '0');
//                     formData.append('allow_downloads', '1');
//                     formData.append('display_embed', '1');
//                     formData.append('age_restriction', '0');
//                     formData.append('song-location', `${responseAudio.data.file_path}`);
//                     formData.append('song-thumbnail', `${responseImage.data.thumbnail} `);
//                     const response = await axios.post('https://ari-sound.aurumai.io/endpoints/submit-song?hash_id=f0fe6f5cdb3f0e58a4fd8f8030b2eb9620b2fbfc', formData, {
//                               headers: headerSubmit
//                     });

//                     if (response.status === 200) {
//                               console.log('submit song sussessfully!');
//                               console.log("data::", response.data);
//                     } else {
//                               console.error('Failed to upload song:', response.statusText);
//                     }




//           } catch (error) {
//                     console.error('Error uploading song:', error);
//           }
// }

// // Call the function to upload the song
// uploadSong();











