import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
let DB_ENDPOINT = "mongodb://localhost/kbumobilestudentid"
let env = process.env.NODE_ENV || 'env'
if (env === 'production') {
    DB_ENDPOINT = process.env.DATABASE_ENDPOINT_PRD;
} else if (env === 'docker') {
    DB_ENDPOINT = process.env.DATABASE_ENDPOINT_DOCKER;
}
mongoose.connect(DB_ENDPOINT, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => console.log(`✅ database connected!`))