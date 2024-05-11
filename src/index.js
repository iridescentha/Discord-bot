import * as dotenv from 'dotenv'
dotenv.config()

import OpenAI from "openai";
import { Client, IntentsBitField, SlashCommandBuilder }  from "discord.js";

const openai = new OpenAI({
    apiKey: process.env.apiKey
  });

const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent
    ]
});

client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);

  })
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'ask-ai') {
        const userText = options.getString('prompt');

        async function AIResponse() {
            const stream = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-0125",
                messages: [{ role: "user", content: userText }],
                stream: true,
            });
            let output = '';
            for await (const chunk of stream) {
                const reply = (chunk.choices[0]?.delta?.content || "")
                output += reply;
            }
            await interaction.reply(output);
        }
        AIResponse();
    }
});

client.login(process.env.TOKEN);
