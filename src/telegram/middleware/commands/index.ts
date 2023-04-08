import { Context } from "telegraf";

const info = () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    ctx.sendMessage("Bot info", {
      reply_markup: {
        keyboard: [[{ text: "/Credits" }, { text: "/API" }]],
        resize_keyboard: true,
        one_time_keyboard: true,
        remove_keyboard: true,
      },
    });
    //   .then((res) => {
    //     console.log(res.message_id);
    //   });

    // console.log(ctx);
    // //To delete message after selection
    // //@ts-expect-error here we shure that's message wouldn't be undef
    // const messageId = ctx.update.message.message_id;

    await next();

    // console.log("Deleting: ", messageId);
    // ctx.deleteMessage(messageId);
  };
};

const credits = () => {
  return (ctx: Context, next: () => Promise<void>) => {
    ctx.reply("This bot was made by @name");
  };
};

const api = () => {
  return (ctx: Context, next: () => Promise<void>) => {
    ctx.reply(
      "You can find API on https://github.com/Haloperido1/telegram-openai"
    );
  };
};

const start = () => {
  return (ctx: Context, next: () => Promise<void>) => {
    ctx.reply(ctx.chat?.id + "");
    ctx.reply("Again and again");
  };
};

const help = () => {
  return (ctx: Context, next: () => Promise<void>) => {
    ctx.reply("Some info");
  };
};

const settings = () => {
  return (ctx: Context, next: () => Promise<void>) => {
    ctx.reply("Some settings");
  };
};

const leave = () => {
  return (ctx: Context, next: () => Promise<void>) => {
    return ctx.reply("oke");
  };
};

export { info, credits, api, start, help, settings, leave };
