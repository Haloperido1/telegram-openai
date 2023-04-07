import { Context } from "telegraf";

const logger = () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    console.log(
      // @ts-expect-error text prop
      `[User]:${ctx.message?.from.username}|[Chat]:${ctx.message?.chat.title}|[message]:${ctx.message.text}`
    );
    const start = new Date();
    await next();
    const ms = new Date().getTime() - start.getTime();
    console.log("[Response time]: %sms", { ms });
  };
};

export default logger;
