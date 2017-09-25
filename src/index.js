'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'RJI Futures Lab';
const WELCOME_MESSAGE = 'Welcome to the Futures Lab!';
const HELP_MESSAGE = 'You can play the current RJI Futures Lab video, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

var handlers = {
    'LaunchRequest': function () {
        this.emit('PlayVideoIntent');
        //this.response.speak(WELCOME_MESSAGE);
        //this.emit(':responseReady');
    },
    'PlayVideoIntent' : function() {

        // VideoApp.Play directives can be added to the response
        if (this.event.context.System.device.supportedInterfaces.VideoApp) {
        	// this.response.speak("This is a device than can play a video.");
            this.response.playVideo('https://s3.amazonaws.com/rjifutureslab/RJIFuturesLab_199.mp4', {title: 'Episode 199', subtitle: 'RJI Futures Lab Show'});
            //this.response.playVideo('https://s3.amazonaws.com/t23-echo/video/Ethos-Laurie-Frick-Nanobot-Murals.mp4');
        } else {
        	//this.response.audioPlayerPlay('REPLACE_ALL', 'https://s3.amazonaws.com/rjifutureslab/RJIFuturesLab_199.mp3');
        	//this.response.audioPlayerPlay('REPLACE_ALL', 'https://s3.amazonaws.com/rjifutureslab/RJIFuturesLab_199.mp3', 'EPISODE199', null, 0);
            this.response.speak("The video cannot be played on your device. " +
            "To watch this video, try launching the skill from your echo show device.");
        }

        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
