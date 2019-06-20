const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

sgMail.send({
  to: 'jstathopulos@gmail.com',
  from: 'task@example.com',
  subject: 'This my frist creation!',
  text: 'I hope this one actully gets to you.',
})
