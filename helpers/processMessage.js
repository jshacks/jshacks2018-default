// const API_AI_TOKEN = '';
// const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAfb9ncHP9YBAKElqwp6SAa5zoZAI9tO4lwZAPcNulI3Ch3hIk0c4HVO953on4MGDadXyFIdT5JECtY96Y4nyai572sne3lNvsygJR8gp0f1N811yZBxSVqWq7FbcLyIMMfXpucJkDjZBq0gRx8PKb2PxjA86iFaidDLsKgtxwZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: {
        recipient: { id: senderId },
        message: { text },
    }
    });
};
// module.exports = (event) => {
//     const senderId = event.sender.id;
//     const message = event.message.text;
//     const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
//     apiaiSession.on('response', (response) => {
//         const result = response.result.fulfillment.speech;
//         sendTextMessage(senderId, result);
//     });
//     apiaiSession.on('error', error => console.log(error));
//     apiaiSession.end();
// };

// // You can find your project ID in your Dialogflow agent settings
// const projectId = 'default-ff9aa'; //https://dialogflow.com/docs/agents#settings
// const sessionId = 'quickstart-session-id';
// const query = 'hello';
// const languageCode = 'en-US';

// // Instantiate a DialogFlow client.
// const dialogflow = require('dialogflow');
// const sessionClient = new dialogflow.SessionsClient();

// // Define session path
// const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
// const request = {
//     session: sessionPath,
//     queryInput: {
//         text: {
//             text: query,
//             languageCode: languageCode,
//         },
//     },
// };

// // Send request and log result
// sessionClient
//     .detectIntent(request)
//     .then(responses => {
//         console.log('Detected intent');
//         const result = responses[0].queryResult;
//         console.log(`  Query: ${result.queryText}`);
//         console.log(`  Response: ${result.fulfillmentText}`);
//         if (result.intent) {
//             console.log(`  Intent: ${result.intent.displayName}`);
//         } else {
//             console.log(`  No intent matched.`);
//         }
//     })
//     .catch(err => {
//         console.error('ERROR:', err);
//     });

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    sendTextMessage(senderId, message + 's');
    // const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
    // apiaiSession.on('response', (response) => {
    //     const result = response.result.fulfillment.speech;
    //     sendTextMessage(senderId, result);
    // });
    // apiaiSession.on('error', error => console.log(error));
    // apiaiSession.end();
};