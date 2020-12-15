const mongoose = require('mongoose');

const Shema = {
    owner: String,
    ownerEmail: String,
    adminKey: String,
    externalId: String,
    participants: [
{
        _id: false,  
        externalId: String,
        email: String,
        name: String,

}
    ],
    drawResults: [{

        _id: false,
        give: String,
        receiver: String,

    }],
}

module.exports = mongoose.model('edinaldo', Shema);