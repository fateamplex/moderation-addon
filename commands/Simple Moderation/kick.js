const { Command } = require("@botbind/klasa");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      permissionLevel: 6,
      requiredPermissions: ["KICK_MEMBERS"],
      runIn: ["text"],
      description: "Kicks a mentioned user.",
      usage: "<member:member> [reason:...string]",
      usageDelim: " "
    });
  }

  async run(msg, [member, reason]) {
    if (member.id === msg.author.id) throw "You cannot kick yourself.";
    if (member.id === this.client.user.id) throw "I cannot kick myself.";

    if (member.roles.highest.position >= msg.member.roles.highest.position)
      throw "You cannot kick this user.";
    if (!member.kickable) throw "I cannot kick this user.";

    await member.kick(reason);
    return msg.sendMessage(
      `${member.user.tag} got kicked.${
        reason ? ` With reason of: ${reason}` : ""
      }`
    );
  }
};
