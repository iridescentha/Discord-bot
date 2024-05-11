import * as dotenv from 'dotenv'
dotenv.config()

import { REST, Routes } from 'discord.js';

const commands = [
	{
		type: 1,
		name: 'ask-ai',
		description: 'Write a prompt for ai to answer',
		options: [
            {
                name: 'prompt',
                description: 'The prompt for AI to respond to',
                type: 3, // STRING
                required: true
            }
        ]
	},
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log("Registering slash commands...");

        await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands }
		)

		console.log("slash command registered...");
	}catch (err) {
		console.log(`There was an error ${err}`);
	}
})()