const {
    DISCORD_TOKEN,
    DISCORD_PREFIX,
    DISCORD_ROLE,
    BASE_URL
} = process.env;
const { resolve } = require('path')
const Discord = require("discord.js");
const client = new Discord.Client();
client.login(DISCORD_TOKEN);

client.on("ready", () => {
    console.log("Le bot est lancé !");
});

client.on("message", (message) => {

    // Si le message ne vient pas du propriétaire du bot
    
    // Si le message ne commence pas par le préfixe
    if(!message.content.startsWith(DISCORD_PREFIX)) return;
    // Analysation du message
    const args = message.content.slice(DISCORD_PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(message.channel.type === 'dm') {
        
        if(command === "help") {
        
        const embed = new Discord.MessageEmbed()
        .setTitle(`__Voici la liste des commandes__`)
        .setDescription(`*Le prefix du bot est :* \`?\``)
        .addField("__PayPal__", "• `?new @MENTION [PRIX] [OBJET]`\nCette commande sert à envoyer une facture personalisée à un client.\n\n• `?ip @MENTION [v4/v6]`\nCette commande sert à envoyer une facture d'IP v4 ou v6 à un client.\n\n• `?domain @MENTION [.fr/.com] [1/2/3]`\nCette commande sert à envoyer une facture de domaine à un client.")
        .setColor("#0091fc")
        .setFooter("Speedi-Heberg © 2023 - Tout droit réservés ");

        return message.channel.send(embed);
    }
       
    }
    // Si la commande est create
    if(command === "help") {
        message.delete()
        
        const embed = new Discord.MessageEmbed()
        .setTitle(`__Voici la liste des commandes__`)
        .setDescription(`*Le prefix du bot est :* \`?\``)
        .addField("__PayPal__", "• `?new @MENTION [PRIX] [OBJET]`\nCette commande sert à envoyer une facture personalisée à un client.\n\n• `?ip @MENTION [v4/v6]`\nCette commande sert à envoyer une facture d'IP v4 ou v6 à un client.\n\n• `?domain @MENTION [.fr/.com] [1/2/3]`\nCette commande sert à envoyer une facture de domaine à un client.")
        .setColor("#0091fc")
        .setFooter("Speedi-Heberg © 2023 - Tout droit réservés ");

        return message.channel.send(embed);
    }
    
    if(command === "new"){
		message.delete()
        if (!message.member.roles.cache.has(DISCORD_ROLE)) return;
        // Récupération des informations sur la facture
        const member = message.mentions.members.first();
        if(!member) return message.reply("vous devez mentionner un membre à qui envoyer une facture!").then(msg => {setTimeout(() => { msg.delete() }, 5000);})
        const sentPrice = args[1];
        if(!sentPrice) return message.reply("vous devez indiquer un montant!").then(msg => {setTimeout(() => { msg.delete() }, 5000);})
        const price = sentPrice.endsWith("€") ? parseFloat(sentPrice.split("€")[0]) : parseFloat(sentPrice);
        if(!price) return message.reply("vous devez indiquer un montant **valide**!").then(msg => {setTimeout(() => { msg.delete() }, 5000);})
        const name = args.slice(2).join(" ");
        if(!name) return message.reply("vous devez indiquer un nom de facture!").then(msg => {setTimeout(() => { msg.delete() }, 5000);})
        

        // Génération de la facture
        

        // Envoi de la facture
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Bonjour, ${member.user.tag}`, member.user.displayAvatarURL())
        .setDescription("Voici un résumé de votre commande:")
        .addField("Nom", paymentData.name, true)
        .addField("Prix", `${paymentData.price}€`, true)
        .addField("Paiement", `[Effectuer le paiement](${BASE_URL}/payment/${member.id}/${paymentData.id})`)
        .setColor("#0091fc")
        .setFooter("Une fois le paiement effectué, vous recevrez un message de confirmation");

        member.user.send(embed);

        return message.reply(`facture envoyée à ${member.toString()}!`).then(msg => {setTimeout(() => { msg.delete() }, 5000);})
    }
    
    if(command === "newf"){
		message.delete()
        if (!message.member.roles.cache.has("1098898008172666907")) return;
        // Récupération des informations sur la facture
        const member = message.mentions.members.first();
        if(!member) return message.reply("vous devez mentionner un membre à qui envoyer une facture!").then(msg => {setTimeout(() => { msg.delete() }, 5000);})
        const sentPrice = args[1];
        if(!sentPrice) return message.reply("vous devez indiquer un montant!").then(msg => {setTimeout(() => { msg.delete() }, 5000);})
        const price = sentPrice.endsWith("€") ? parseFloat(sentPrice.split("€")[0]) : parseFloat(sentPrice);
        if(!price) return message.reply("vous devez indiquer un montant **valide**!").then(msg => {setTimeout(() => { msg.delete() }, 5000);})
        const name = args.slice(2).join(" ");
        if(!name) return message.reply("vous devez indiquer un nom de facture!").then(msg => {setTimeout(() => { msg.delete() }, 5000);})
        const user = client.db.get(member.id);
        if(!user) client.db.set(member.id, []);

        // Génération de la facture
        const paymentID = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
        const paymentData = {
            id: paymentID,
            userID: member.id,
            username: member.user.username,
            avatarURL: member.user.displayAvatarURL(),
            paid: false,
            price,
            name
        };
        // Sauvegarde de la facture
        client.db.push(member.id, paymentData);

        // Envoi de la facture
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Bonjour, ${member.user.tag}`, member.user.displayAvatarURL())
        .setDescription("Voici un résumé de votre commande:")
        .addField("Nom", paymentData.name, true)
        .addField("Prix", `${paymentData.price}€`, true)
        .addField("Paiement", `[Effectuer le paiement](${BASE_URL}/payment/${member.id}/${paymentData.id})`)
        .setColor("#0091fc")
        .setFooter("Une fois le paiement effectué, vous recevrez un message de confirmation");

        member.user.send(embed);

        return message.reply(`facture envoyée à ${member.toString()}!`).then(msg => {setTimeout(() => { msg.delete() }, 5000);})
    }
    
    if(command === "ipf"){
		message.delete()
        if (!message.member.roles.cache.has("1098898008172666907")) return;
        const ip = args[1]
        if(!ip) return message.reply("vous devez choisir v4 ou v6 : `.ip @MENTION v4/v6`").then(msg => {setTimeout(() => { msg.delete() }, 5000);})
        if(ip == "v4" || ip == "v6") {
            if (ip == "v4") {
                
                
                // Récupération des informations sur la facture
        const member = message.mentions.members.first();
        if(!member) return message.reply("vous devez mentionner un membre à qui envoyer une facture!").then(msg => {setTimeout(() => { msg.delete() }, 5000);})
        const sentPrice = "2"
        const price = sentPrice.endsWith("€") ? parseFloat(sentPrice.split("€")[0]) : parseFloat(sentPrice);
        const name = "IPv4"
        const user = client.db.get(member.id);
        if(!user) client.db.set(member.id, []);

        // Génération de la facture
        const paymentID = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
        const paymentData = {
            id: paymentID,
            userID: member.id,
            username: member.user.username,
            avatarURL: member.user.displayAvatarURL(),
            paid: false,
            price,
            name
        };
        // Sauvegarde de la facture
        client.db.push(member.id, paymentData);

        // Envoi de la facture
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Bonjour, ${member.user.tag}`, member.user.displayAvatarURL())
        .setDescription("Voici un résumé de votre commande d'IPv4:")
        .addField("Prix", `${paymentData.price}€`, true)
        .addField("Paiement", `[Effectuer le paiement](${BASE_URL}/payment/${member.id}/${paymentData.id})`)
        .setColor("#0091fc")
        .setFooter("Une fois le paiement effectué, vous recevrez un message de confirmation");

        member.user.send(embed);

        return message.reply(`facture envoyée à ${member.toString()}!`).then(msg => {setTimeout(() => {msg.delete()}, 5000);})
                
                
                
            } else if (ip == "v6") {
                
                
                // Récupération des informations sur la facture
        const member = message.mentions.members.first();
        if(!member) return message.reply("vous devez mentionner un membre à qui envoyer une facture!").then(msg => {setTimeout(() => { msg.delete() }, 5000);})
        const sentPrice = "1"
        const price = sentPrice.endsWith("€") ? parseFloat(sentPrice.split("€")[0]) : parseFloat(sentPrice);
        const name = "IPv6"
        const user = client.db.get(member.id);
        if(!user) client.db.set(member.id, []);

        // Génération de la facture
        const paymentID = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
        const paymentData = {
            id: paymentID,
            userID: member.id,
            username: member.user.username,
            avatarURL: member.user.displayAvatarURL(),
            paid: false,
            price,
            name
        };
        // Sauvegarde de la facture
        client.db.push(member.id, paymentData);

        // Envoi de la facture
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Bonjour, ${member.user.tag}`, member.user.displayAvatarURL())
        .setDescription("Voici un résumé de votre commande d'IPv6:")
        .addField("Prix", `${paymentData.price}€`, true)
        .addField("Paiement", `[Effectuer le paiement](${BASE_URL}/payment/${member.id}/${paymentData.id})`)
        .setColor("#0091fc")
        .setFooter("Une fois le paiement effectué, vous recevrez un message de confirmation");

        member.user.send(embed);

        return message.reply(`facture envoyée à ${member.toString()}!`).then(msg => {setTimeout(() => {msg.delete()}, 5000);})
                
                
                
            }
        } else return message.reply("vous devez choisir v4 ou v6 : `.ip @MENTION v4/v6`").then(msg => {setTimeout(() => { msg.delete() }, 5000);})
        
        
    }
    
});

module.exports = client;
