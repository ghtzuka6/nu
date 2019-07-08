// Generic command template.

module.exports.run = async (bot, message, args) => {

// Creates a function called "hello", sends a message, and logs the same thing.
function hello() {
    message.channel.send("Hello world!")
    console.log("Hello world!")
}

hello();

}

// This is the generic configuration for every command.

module.exports.config = {
    name: "hello",
    aliases: ["helloworld"],
    usage: "r/hello",
    description: "Say hello to your working GitHub fork of Ritsu",
    usableby: "@everyone"
}