const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false,
});

const { token, channelID, } = require("./config.json")

client.on('ready', async (client) => {
  console.log(`Online - ${client.user.tag}!`);
  
  const ch = client.channels.cache.get(channelID);
  await ch.sendSlash("302050872383242240", "bump");
});

function bumpSend(channel, time) {
  setTimeout(async () => {
    await channel.sendSlash("302050872383242240", "bump");
  }, time)
}

client.on("messageCreate", async (msg) => {
  const embedDescription = msg.embeds[0]?.description;

  if (msg.flags.has("EPHEMERAL") && embedDescription.startsWith("Please wait")) {
    console.log(msg)
    const timeInMin = embedDescription.replace(/\D/g, "")
    const timeInMS = parseInt(timeInMin) * 60000;

    bumpSend(msg.channel, timeInMS);
  } else if (embedDescription.startsWith("Bump done!")) bumpSend(msg.channel, 7200000);
})

client.login(token);