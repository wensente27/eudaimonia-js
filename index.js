const {Collection, Client, Discord, MessageEmbed} = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true,
    partials : ["MESSAGE", "CHANNEL", "REACTION"]
})

const config = require('./config.json')
const prefix = config.prefix

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

client.on('ready', () => {
    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.tag} | Up and running ✅`)
})

client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;

    if(!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const cmd = args.shift().toLowerCase();

    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})

client.on('messageReactionAdd', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if(reaction.message.id === '846403943645970452'){
        if(reaction.emoji.name === '✅') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('846388994282356839')
            user.send('Thanks for joining Hedonism! Go and check out <#846032657317363725> and make sure to invite more of your friends! ^^ \n\n Permanent Invite: https://discord.gg/7NECp4ecnj')
        }
    }
})

client.on('guildMemberAdd', async(member) => {
  const Channel = member.guild.channels.cache.get('846032657317363725')
  const embed = new MessageEmbed()
    .setTitle('New member')
    .setColor('2F3136')
    .setDescription(`Welcome, **${member.displayName}**! Have fun in our server.\n\`Make sure to invite your friends while you're at it.\``)
    .setTimestamp()
    .setFooter(`Member #${member.guild.memberCount}`)
  Channel.send(`<@${member.user.id}>`,embed)
})