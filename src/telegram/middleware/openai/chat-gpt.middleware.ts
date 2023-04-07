import { Context, Telegraf } from "telegraf";
import runCompletion from "../../services/openai/chat-gpt.service";

const askGpt = () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    //   @ts-expect-error there are no text in message type: https://github.com/telegraf/telegraf/issues/1319
    const text: string = ctx.message.text;
    if (text && text.trim().length > 4) {
      const i = 0;
      runCompletion(text.substring(text.indexOf("k") + 1)).then((answers) => {
        ctx.reply(`There are several variants [${answers.length}]: `).then;
        ctx.reply(answers[0].text + "");
        if (answers.length > 1) {
          ctx.reply("To see all write /all");
        }
      });
    }
    next();
  };
};
export default askGpt;
