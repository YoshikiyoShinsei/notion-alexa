const notion = require('./notion.js');
const Alexa = require('ask-sdk-core');

const ItemIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ItemIntent';
    },
    async handle(handlerInput) {
        const value = Alexa.getSlotValue(handlerInput.requestEnvelope, 'item')
        const itemList = await notion.getCheckboxItems();
        let flag = false
        for (const i in itemList) {
            const item = itemList[i];
            if (item.name === value) {
                notion.uncheck(item.id);
                flag = true;
            }
        } 
        if (!flag) notion.append(value);
        const speakOutput = flag? value + 'のチェックを外しました。' : value + 'を追加しました。'
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
