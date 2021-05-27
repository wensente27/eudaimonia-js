module.exports = {
    name: 'purge',
    aliases: ['clear'],
    run: async(client, message, args) => {
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('You can\'t do that.')
      if(!args[0]) return message.reply('Choose a number from 1-99.')
      if(isNaN(args[0])) return message.channel.send('Invalid input. Usage: `,,purge <1-99>`.')
  
      if(parseInt(args[0]) > 99) return message.channel.send('You can\'t delete less than 1 or more than 99.')
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
          .catch(err => console.log(err))
        message.channel.send(`Deleted ${args[0]} messages.`).then(m => m.delete({ timeout: 5000 }))
    }
  }