import { Context } from "telegraf";

const errorHandler = () => {
  return (err: unknown, ctx: Context) => {
    console.log(`Error for ${ctx.updateType}`, err);
  };
};

export default errorHandler;
