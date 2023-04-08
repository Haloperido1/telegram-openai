import { Telegraf } from "telegraf";
import whoIsMisterYarosh from "./yarosh/yarosh.middleware";
import { askGpt, gpt } from "./openai/chat-gpt.middleware";
import logger from "./logger/logger";
import errorHandler from "./logger/error-handler";
import dotenv from "dotenv";
import {
  info,
  credits,
  api,
  start,
  help,
  settings,
  leave,
} from "./commands/index";

dotenv.config();

const bot_api = process.env.TELEGRAM_API_KEY || "";
console.log("bot api: ", bot_api);
const bot = new Telegraf(bot_api);

bot.use(logger());

//About bot
bot.command("info", info());
bot.command("Credits", credits());
bot.command("API", api());

// GPT block
bot.command("GPT", gpt());
bot.command("ask", askGpt());

// Yarosh
bot.use(whoIsMisterYarosh());

// Default
bot.start(start());
bot.help(help());
bot.settings(settings());

//Leave chat or delete chat with user
bot.command("stop", leave());

//Error handler
bot.catch(errorHandler());

export default bot;
