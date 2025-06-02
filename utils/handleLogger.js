const { IncomingWebhook } = require('@slack/webhook');
const stripAnsi = require('strip-ansi'); 
const url = 'https://hooks.slack.com/services/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';

const webhook = new IncomingWebhook(url);

exports.loggerSlack = {
  write: message => {
    const cleanedMessage = message; // 👈 formato Slack

    if (process.env.NODE_ENV === 'production') {
      webhook.send({ text: cleanedMessage });
    } else if (process.env.NODE_ENV === 'development') {
      console.log(cleanedMessage);
    } else {
      console.log('[loggerSlack] Unknown NODE_ENV:', process.env.NODE_ENV);
      console.log(cleanedMessage);
    }
  }
};
