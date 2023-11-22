import nodemailer from "nodemailer"



const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_FROM,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  })
  
  transporter
  .verify()
  .then(()=>console.log("gmail enviando con exito ..."))
  .catch((error)=>console.log(error));

  export default transporter;
