import QRCode from 'qrcode'

QRCode.toFile(`${process.cwd()}/new.png`, 'https://www.npmjs.com/package/qrcode')
// // With promises
// QRCode.toDataURL('https://www.npmjs.com/package/qrcode', { type: '' })
//     .then(url => {
//         console.log(url)
//     })
//     .catch(err => {
//         console.error(err)
//     })

// // With async/await
// const generateQR = async text => {
//     try {
//         console.log(await QRCode.toDataURL(text))
//     } catch (err) {
//         console.error(err)
//     }
// }
