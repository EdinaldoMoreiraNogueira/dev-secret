const sendEmail = require('../../resourses/ses/sendEmail');
module.exports =(drawResult, ownerEmail) => {
    const emails = drawResult.map(
        (result) => sendEmail(ownerEmail, result-giver, result-receiver)
    )

    return Promise.all(emails)
}