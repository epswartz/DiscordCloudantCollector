//jshint esversion:6

const Discord = require('discord.js');
const fs = require('fs');
const circularJSON = require('circular-json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I have logged in!');
    console.log("-------------------------------------------");
    console.log("USER: " + JSON.stringify(client.user.username));
    console.log("-------------------------------------------");
    console.log("CHANNELS: " + JSON.stringify(client.channels));
    console.log("-------------------------------------------");
    console.log("CLIENT: " + circularJSON.stringify(client.user));
    console.log("-------------------------------------------");
    process.exit(0);
});



client.login(require('./token.json').token); //I just did this so I don't publish my token to github lmao


/*
client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});
*/