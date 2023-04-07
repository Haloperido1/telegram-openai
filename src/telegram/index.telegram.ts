import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import whoIsMisterYarosh from "./middleware/yarosh.middleware";

import dotenv from "dotenv";

dotenv.config();

import askGpt from "./middleware/chat-gpt.middleware";

const bot_api = process.env.TELEGRAM_API_KEY || "";
console.log("bot api: ", bot_api);
const bot = new Telegraf(bot_api);

bot.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date().getTime() - start.getTime();
  console.log("Response time: %sms", { ms });
});

// bot.use((ctx, next) => {
//   whoIsMisterYarosh(ctx, next);
// });

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

bot.command("ask", (ctx, next) => {
  askGpt(ctx, next);
});

export default bot;
