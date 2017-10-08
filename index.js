//jshint esversion:6, node:true
// <('_')>
"use strict";


const Discord = require('discord.js');
const fs = require('fs');
const cJSON = require('circular-json');
const client = new Discord.Client();
const cfg = require('./config.js');

// Bunyan Setup
const bunyan = require('bunyan');
var log = bunyan.createLogger({name: "CollectorBot"});

// Cloudant Setup
const cloudant = require('cloudant');
const nano = cloudant({
    account: cfg.cloudant.account,
    password: cfg.cloudant.password
});
const db = nano.use(cfg.cloudant.database);


client.on('ready', () => {
    console.log('Collector has logged in!');
    console.log("-------------------------------------------");
});

client.on('message', message => {
    if(message.author && message.author.id !== cfg.discord.id){ // The bot doesn't see messages from itself.

        // Extract the parts of the message we care about.
        var m = {
            timestamp: Date.now(),
            channel: {
                id: message.channel.id,
                name: message.channel.name
            },
            author: {
                id: message.author.id,
                name: message.author.username,
                discriminator: message.author.discriminator
            }
        };
        if(message.content && message.content.length > 0){
            m.type = "text";
            m.content = message.content;
        }else if(message.content && message.content.length === 0){
            m.type = "image";
        }else{
            log.warn("Message of unknown type");
            m.type = "unknown";
        }

        
        if (m.content === '!ping') {
            log.info({author: m.author}, "Recieved status query, sending reply");
            message.channel.send('pong');
        }else{
            log.info({message: m},"Recieved Message");
            db.insert(m, (insertErr, body)=> {
                if(insertErr){
                    log.error({err: insertErr}, "Unable to insert message into cloudant");
                }else{
                    log.info({message: m}, "Inserted message into cloudant");
                }
            });
        }
    }
});

client.login(cfg.discord.token);
