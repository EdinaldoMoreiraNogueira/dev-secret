const aws = require('aws-sdk');

const ses = aws.SES({region: 'us-east-1'})

module.exports = (ownerEmail, giver, receiver) => {
    const params = {
        Destination: {
            ToAddresses: [giverEmail],
        },
        Message: {
            Body: { 
                Text: {
                    Data: `Seu amigo secreto é o(a) ${receiver.name}`
                }
            },
            Subject: {
                Data: '[Seja.Dev] amigo secreto'
            },
        },
        Source: ownerEmail,
    }
    
    return ses.sendEmail(params).promise();

}