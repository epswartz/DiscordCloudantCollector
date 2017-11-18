# DiscordCloudantCollector

Grabs messages sent to a discord server and drops them into a cloudant database. I made this so that I can log my friends' messages and then analyze them later, partially because I like data but mostly because I'm a creep :^)

## Usage
0. Download and install npm and nodejs
1. [Create a discord bot user](https://discordapp.com/developers/applications/me)
2. Get it's clientID and token, and feed them into config.js as per example below
3. Sign up for cloudant
4. Create a database in cloudant
5. Feed cloudant credentials and database name into config.js as per example below
6. If you want better looking logs, `npm install bunyan -g`
7. `npm start`, or if you have bunyan, `npm start | bunyan`

Alternatively, you can give the bot your own discord token and clientID, and it will log the messages that you see (and it will also make you appear as always online while it's running, so that's a little awkward).

## Config Example

~~~
module.exports = {
	discord: {
		token: "...", // UserBot Token
		id: "..." // UserBot userid
	},
	cloudant: {
		account: "...",
		password: "...",
		database: "..." // Which database to put it in
	},
    mode: "..." // 'cloudant' or 'file'
};
~~~