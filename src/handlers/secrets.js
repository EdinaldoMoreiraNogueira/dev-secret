const {v4: uuidv4} = require('uuid')
require('../resourses/db/connection') ()

const SecretModel = require('../resourses/db/models/secrets')
const draw = require('../handlers/utils/draw');
const notfyParticipants = require('./utils/notfyParticipants')

module.exports.create = async (event, context) => {
     context.callbackWaitsForEmptyEventLoop = false;
     const {name, email} = JSON.stringify(event.body);
     const externalId = uuidv4();
     const adminKey = uuidv4();

     try {
         await SecretModel.create({
            owner: name,
            ownerEmail: email,
            adminKey,
            externalId,
         })
         return { 
             statusCode: 201,
             headers: {
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Credentials': true,
            },
             body:JSON.stringify({
                 success: true,
                 id: externalId,
                 adminKey,
             }),
         }

     }catch(error){
         console.log(error)
         return {
             statusCode: 500,
             headers: {
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Credentials': true,
            },
             body: JSON.stringify({
                 success: false,

             })
         }
     }
    
}

module.exports.get = async (event, context)=> {
    context.callbackWaitsForEmptyEventLoop = false;

    const {id: externalId} = event.pathParameters;
    const incomingAdminKey = event.headers['admim-key']

    try {

        const {participants, adminKey, drawResult} = await SecretModel.findOne({
            externalId,
        }).select('-_id participants adminKey drawResult').lean();

        const isAdmin = !!(incomingAdminKey && incomingAdminKey === adminKey);

        const result = {
            participants,
            hasDrew: !!drawResult,
            isAdmin,
        }

        return { 
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(result),
        }

        

    }catch(error){
        console.log(error)
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                success: false,

            })
        }

    }
    
}

module.exports.draw = async (event, context)=> {

    context.callbackWaitsForEmptyEventLoop = false;
    const {id: externalId } = event.pathParameters;
    const adminKey = event.headers['admin-key']

    try {
        const secrets = await SecretModel.findOne({
            externalId,
            adminKey,
        }).select('participants ownerEmail').lean();

        if(!secrets) {
            throw new Error()
        }

        const drawResult = draw(secrets.participants);
        const drawMap = drawResult.map((result) => {
         return{
             giver: result.giver.externalId,
             receiver: result.receiver.externalId
            
         }
        })

        await SecretModel.updateOne({
            _id: _secret._id
        },
        {
            drawResult: drawMap
        })

        await notfyParticipants(drawResult, secret.ownerEmail)

        return { 
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                drawResult,
                success: true,

            }),
        }

    }catch(error){
        console.log(error)
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                success: false,

            })
        }

    }
    
}