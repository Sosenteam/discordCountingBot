# Discord :3 Counting Bot

### This is a bot designed to count how many messages consecuitivly contain :3

This was a fun idea i came up with when people were chaining the :3 face on my server so I decided to make a bot to do it. Lots of this code is borrowed because I'm still starting to learn async JS and Dockerfile but it does function!



## Installation
 
If for some reason you decide to install this silly project, you can clone the repo and then create a file named `.env`,
and put in something like (put your bot token, client id and channel id)
```
BOT_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
CHANNEL_ID=your_channel_id_here
```
Then run
```
docker-compose build
```
and 
```
docker-compose up -d
```

## Usage

Fill the .env w/ correct parameters and then go chain messages with :3 
- The count requires at least two people, one person sending two messages in a row will not increase the count
- `/checkcount` will tell you the updated count without ending the chain
