// Defined the bot constructor, all required modules, and extensions.
require("dotenv").config();
var Discord = require("discord.js");
var bot = new Discord.Client({ disableEveryone: true });
var fs = require("fs");
var { promisify } = require("util");
var readdir = promisify(fs.readdir);
var Discord = require("discord.js");

// Creates collections for both commands & aliases.
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

// Command handler code.
fs.readdir("./cmds/", (err, files) => {
    if (err) console.log(err);

    var jsfile = files.filter((f) => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        return console.log("=> [LOGS] Ritsu couldn't find commands.");
    }

    jsfile.forEach((f, i) => {
        var pull = require(`./cmds/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach((alias) => {
            bot.aliases.set(alias, pull.config.name);
        });
    });
});

// Event handler code.
var load = async () => {
    var evtFiles = await readdir("./events/");

    evtFiles.forEach((file) => {
        if (file.split(".").slice(-1)[0] !== "js") return;
        var evtName = file.split(".")[0];
        var event = require(`./events/${file}`);
        bot.on(evtName, event.bind(null, bot));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
};

// Creates a new bot instance by logging in with your token.
bot.login(process.env.TOKEN);

load();
