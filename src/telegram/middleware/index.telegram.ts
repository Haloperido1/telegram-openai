import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import whoIsMisterYarosh from "./yarosh/yarosh.middleware";
import askGpt from "./openai/chat-gpt.middleware";
import logger from "./logger/logger";
import errorHandler from "./logger/error-handler";
import dotenv from "dotenv";

dotenv.config();

const bot_api = process.env.TELEGRAM_API_KEY || "";
console.log("bot api: ", bot_api);
const bot = new Telegraf(bot_api);

bot.use(logger());

bot.command("info", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, "Bot info", {
    reply_markup: {
      keyboard: [[{ text: "/Credits" }, { text: "/API" }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

bot.command("Credits", (ctx) => {
  ctx.reply("This bot was made by @name");
});

bot.command("API", (ctx) => {
  ctx.reply(
    "You can find API on https://github.com/Haloperido1/telegram-openai"
  );
});

bot.command("GPT", async (ctx, next) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Available options \n In /ask mode you can get short answer on your question \n In /chat mode chat will be created",
    {
      reply_markup: {
        keyboard: [[{ text: "/ask" }, { text: "/chat" }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
  await next();
  ctx.deleteMessage();
});

bot.use(whoIsMisterYarosh());

bot.start((ctx, next) => {
  ctx.reply(ctx.chat.id.toString());
  ctx.reply("Again and again");
});
bot.help((ctx, next) => {
  ctx.reply("Some info");
});
bot.settings((ctx, next) => {
  ctx.reply("Some settings");
});
bot.command("stop", (ctx, next) => {
  return ctx.reply("oke");
});

bot.command("ask", askGpt());
bot.catch(errorHandler());
export default bot;
