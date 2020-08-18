import * as functions from 'firebase-functions';
import * as firebaseAdmin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as cors from 'cors';

firebaseAdmin.initializeApp({
    serviceAccountId: 'cunino-1eecc@appspot.gserviceaccount.com',
  });

console.log(firebaseAdmin);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const corsOptions = {
    origin: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};
/**
* Here we're using Gmail to send 
*/
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().gmail.email,
        pass: functions.config().gmail.password
    }
});
firebaseAdmin.initializeApp();
exports.sendEmail  = functions.https.onRequest((req,res) => {
    const corsMiddleware = cors(corsOptions);
    corsMiddleware(req, res, async () => {
      
        // getting dest email by query string
        const dest = req.body.dest;

        const mailOptions = {
            from: 'Your Account Name <jsm.multimedia@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest.toString(),
            subject: 'I\'M A PICKLE!!!', // email subject
            html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
                <br />
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            ` // email content in HTML
        };
  
        // returning result
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.send({'Data':err.message});
            }
            return res.send({'Data':'Oleee'});
        });
    });    
});