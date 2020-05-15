const config  =  require ( "./../config.json" );
const prefix= config.prefix;

//chargement de la lib mysql_lite3
var sqlite3 = require('sqlite3').verbose();

//récupération de l'objet db
const sqlite = require("./../class/db.js")

//récupération de l'objet monkey
//const monkeys = require("./../class/monkey.js")

//si un event client.message arrive
module.exports = async(client,message)=>{

	//refus des commandes venant d'un autre bot
	if(message.author.bot) return;

	//si le message ne commance pas par +
	if(!message.content.startsWith(prefix)) return;

	const args = message.content.slice (prefix.length).trim().split(/ +/g);
	const commande = args.shift();

	const cmd = client.commands.get(commande);
	
	console.log(`L'utilisateur ${monkeys_list[message.author.id].name} à fait appel à la commande : ${commande} , arguments ${args} à ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`)
	

	//si la commande n'exsite pas
	if(!cmd) return message.channel.send("Et encore un qui n'est pas capable de saisir une commande valide, ça me fatigue!, Tapes +help pour avoir les commandes actives");;
	
	if(cmd.help.channel ==="in_serv" && message.channel.type ==="dm" )
	{
		return message.author.send("Cette commande ne peut pas être utilisée en message privé");
	}
	else
	{
		cmd.run(client,message,args);
	}




	//si la commande concerne la lecture de fichier
	if(commande==='play' || commande==='skip' || commande==='stop')
	{
		if(commande==='play')
		{
			//on prépare l'objet monkeys
			let monkey= new monkeys();

			//on recherche un correspondance avec un utilisateur existant
			let info = await monkey.search_m(message.author.id).then()
			//si le membre n'existe pas, on le créé immédiatement
			if( info === null)
			{
				result = await monkey.create_m(message.author).then()
				console.log(`création du membre ${message.author['username']}`)
			}

			//creation du tableau de mise à jour
			let new_data={};
			new_data.jeton=monkeys_list[message.author.id].jeton--;
			new_data.time = Date.now();
			new_data.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

			//mise à jour des donnée du membres
			info = await monkey.update_m(new_data).then()

			monkeys_list[message.author.id]=monkey;

			//monkeys_list[message.author.id].jeton--;
		}
		serverQueue = queue.get(message.guild.id);
		if(!args[0] && commande==='play')
		{
			return message.channel.send("Vous n'avez spécifié pas d'adresse youtube à lire");
		}else
		{
			cmd.run(message,serverQueue);
		}

	}
	else
	{
		if((commande==='rh' || commande==='says') && message.channel.type ==="dm")
		{
			return message.channel.send("Les commandes demandant l'accés à la capacité vocal sont interdites en message privé");
		}
		/*else if((commande==='stats') && message.channel.type ==="dm")
		{
			return message.channel.send("Cette commande ne peut pas être appelée depuis un message privé");
		}*/
		else
		{
			return message.author.send("Impossible d'executer la commande pour le moment circuit en travaux");
			//cmd.run(client,message,args);
		}
	}

	message.delete();
};