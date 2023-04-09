import { Context } from "telegraf";
import { SessionContext } from "telegraf/typings/session";

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

const state = () => {
  return (ctx: Context, next: () => Promise<void>) => {
    console.log(ctx.state.message);
    console.log(ctx.state.lastmessage);
  };
};

export { start, help, settings, leave, state };
