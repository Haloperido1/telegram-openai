import { Context, Telegraf } from "telegraf";
import runCompletion from "../../services/openai/chat-gpt.service";

const askGpt = () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    //   @ts-expect-error there are no text in message type: https://github.com/telegraf/telegraf/issues/1319
    const text: string = ctx.message.text;
    if (text && text.trim().length > 4) {
      await ctx.reply("Waiting for response...", {
        reply_markup: { remove_keyboard: true },
      });
      runCompletion(text.substring(text.indexOf("k") + 1)).then(
        async (answers) => {
          // await ctx.deleteMessage();
          ctx.reply(`There are several variants [${answers.length}]: `).then;
          await ctx.reply(answers[0].text + "");
          if (answers.length > 1) {
            ctx.reply("To see all write /all");
          }
        }
      );
    }
    next();
  };
};

const gpt = () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    ctx.sendMessage(
      "Available options \n /ask [text] to get short answer on your question \n In /chat mode scene will be created",
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
  };
};

export { askGpt, gpt };
