// Generic event setup, the name of the file is the event name.
require("dotenv").config();
module.exports = async (bot, message) => {
    // Requires the configuration file to check for prefix.

    var prefix = process.env.PREFIX;

    // Checks if the author is a bot.
    if (message.author.bot) return;

    // Generic command handler setup.
    var messageArray = message.content.split(" ");
    var cmd = messageArray[0];
    var args = messageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;
    var commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if (commandfile) commandfile.run(bot, message, args);
};
