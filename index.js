const append = require('./append.js');
const Alexa = require('ask-sdk-core');

const ItemIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ItemIntent';
    },
    handle(handlerInput) {
        const value = Alexa.getSlotValue(handlerInput.requestEnvelope, 'item')
        const e = append.append(value);
        const speakOutput = '追加しました。'
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
}

// exports.handler = async (event) => {
//     // TODO implement
//     console.log("🐱");
//     const e = await append(event.request.intent.slots.item.slotValue.value);
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
// };

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        ItemIntentHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
