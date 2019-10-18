import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';

dotenv.config()

export const sendSMSMEssage = (to: string, text: string) => {
    console.log('to:', to)
    axios.post(process.env.NEXMO_URL, {
        api_key: process.env.NEXMO_KEY,
        api_secret: process.env.NEXMO_SECRET,
        to,
        from: "피자호빵",
        text
    })
        .then(res => console.log(res.status))
        .catch(err => {
            const today = new Date().toString();
            const errorMessage = `(${today})Error occured in sending sms message: ${err} `
            console.error(`Error occured in sending sms message: `, err)
            fs.appendFile(__dirname + "/../logs/sendingSMS", errorMessage, (err) => {
                if (err) {
                    console.error('Failed to write file, ', err)
                } else {
                    console.log('The file was saved!')
                }
            })
        })
}