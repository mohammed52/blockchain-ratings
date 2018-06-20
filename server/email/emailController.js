"use-strict";

// import _ from 'lodash';
import SelectedOptions from '../db/mongo/models/selectedOptionsModel';
import nodemailerHelper from './nodemailerHelper'
import { controllers } from '../db';
import path from 'path';
// const selectedOptionsController = controllers && controllers.selectedOptionsController;

// send email
// export function sendEmail(req, res) {

//   // setup email data with unicode symbols
//   let mailOptions = {
//     from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
//     to: 'mohammed.petiwala52@gmail.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world?', // plain text body
//     html: '<b>Hello world?</b>Click <a href="http://localhost:5000/sendquote">here</a> to send quote-2' // html body
//   };

//   nodemailerHelper(mailOptions);

//   return res.redirect('/');
// }
export function sendDocsToEmail(req, res) {
  console.log("req.body", req.body);
  console.log("req.params", req.params);
  console.log("process.cwd()", process.cwd());
  console.log("  __dirname", __dirname);

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'hwd3o6upqvrgvot4@ethereal.email', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    // html: '<b>Hello world?</b>Click <a href="http://localhost:5000/sendquote">here</a> to send quote-3'
    html: '<b>Hello world?</b>Click <a href="http://localhost:5000/sendquote">here</a> to send quote-2', // html body
    attachments: [
      {
        filename: 'maptest.txt',
        path: path.join(process.cwd(), 'server/email/maptest.txt')
      }]
  };

  nodemailerHelper(mailOptions);
  return res.status(251).json({
    'MAP': 'Hello World2'
  })
// return res.redirect('/');
// return res.json({
//   "MAP is this working": "yes it is"
// });
}

// export function sendQuote(req, res) {
//   console.log("MAP sendQuote is working");


//   async function getData() {
//     const response = await controllers.selectedOptionsController.allSelectedOptions();
//     console.log("response", response);
//     return response
//   }

//   getData().then((response) => {
//     console.log('MAP RESPONSE RECEIVED')
//     console.log("res", res);
//     console.log("response", response);
//     let mailOptions = {
//       from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
//       to: 'mohammed.petiwala52@gmail.com', // list of receivers
//       subject: 'Hello ✔', // Subject line
//       text: 'MEK', // plain text body
//       html: 'MEK' // html body
//     };

//     nodemailerHelper(mailOptions)
//   }
//   );
//   return res.redirect('/')
// }
