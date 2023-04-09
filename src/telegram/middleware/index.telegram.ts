import { Scenes, session, Telegraf } from "telegraf";
import whoIsMisterYarosh from "./yarosh/yarosh.middleware";
import { askGpt, gpt } from "./openai/chat-gpt.middleware";
import logger from "./logger/logger";
import errorHandler from "./logger/error-handler";
import dotenv from "dotenv";
import { start, help, settings, leave, state } from "./commands/index";
import clown from "./yarosh/clown";

import infoScene from "./scenes/info.scene";
import { SceneContext } from "telegraf/typings/scenes";

dotenv.config();
const stage = new Scenes.Stage<Scenes.SceneContext>([infoScene]);

const bot_api = process.env.TELEGRAM_API_KEY || "";
console.log("bot api: ", bot_api);
const bot = new Telegraf<Scenes.SceneContext>(bot_api);

//Must go first and in this sequence
bot.use(logger());
bot.use(session());
bot.use(stage.middleware());

//About bot
bot.command("info", async (ctx) => await ctx.scene.enter("info_scene"));

// GPT block
bot.command("GPT", gpt());
bot.command("ask", askGpt());

// Yarosh
// bot.use(whoIsMisterYarosh());
// bot.use(clown());

// Default
bot.start(start());
bot.help(help());
bot.settings(settings());
bot.command("state", state());
//Leave chat or delete chat with user
bot.command("stop", leave());

//Error handler
bot.catch(errorHandler());

export default bot;
