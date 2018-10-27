const request = require('request');
const dialogflow = require('dialogflow');

// You can find your project ID in your Dialogflow agent settings
const projectId = 'default-ff9aa';
const sessionId = 'quickstart-session-id';
const languageCode = 'en-US';

const FACEBOOK_ACCESS_TOKEN = 'EAAfb9ncHP9YBAKElqwp6SAa5zoZAI9tO4lwZAPcNulI3Ch3hIk0c4HVO953on4MGDadXyFIdT5JECtY96Y4nyai572sne3lNvsygJR8gp0f1N811yZBxSVqWq7FbcLyIMMfXpucJkDjZBq0gRx8PKb2PxjA86iFaidDLsKgtxwZDZD';
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

process.env.GOOGLE_APPLICATION_CREDENTIALS = "/home/ed/Documents/jshacks2018/creds.json"

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const diagSessionClient = new dialogflow.SessionsClient();
    const sessionPath = diagSessionClient.sessionPath(projectId, sessionId);
    
    // The text query request.
    const diagRequest = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: languageCode,
            },
        },
    };
    
    // Send request and log result
    diagSessionClient
        .detectIntent(diagRequest)
        .then(responses => {
              console.log('Detected intent');
              const result = responses[0].queryResult;
              console.log(`  Query: ${result.queryText}`);
              console.log(`  Response: ${result.fulfillmentText}`);
              if (result.intent) {
                    sendTextMessage(senderId, result.fulfillmentText);
              } else {
                    console.log(`  No intent matched.`);
              }
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
};