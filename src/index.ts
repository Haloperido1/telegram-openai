import bot from "./telegram/index.telegram";
import dotenv from "dotenv";

dotenv.config();

//TODO: remake pooling to WebHook https://github.com/telegraf/telegraf/discussions/1344#discussioncomment-335700
bot
  .launch()
  .then((res) => {
    console.log("Bot has been launched");
  })
  .catch((err) => {
    console.error(err);
  });

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
