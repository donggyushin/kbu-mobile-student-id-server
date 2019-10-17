import App from './app';
import './database/mongoose'
const PORT = 4000

App.listen(PORT, () => console.log(`KBU-MOBILE-STUDENT-ID-SERVER running on port ${PORT}`))