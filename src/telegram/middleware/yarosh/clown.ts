import { Context } from "telegraf";

const clownList = [444533496];

const clown = () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    console.log(ctx.message);
    clownList.forEach((clown) => {
      if (ctx.message?.from.id === clown) {
        ctx.reply("🤡", {
          reply_to_message_id: ctx.message.message_id,
        });
      }
    });
  };
};

export default clown;
