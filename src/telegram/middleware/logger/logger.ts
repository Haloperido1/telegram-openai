import { Context, NarrowedContext, Scenes } from "telegraf";
type Message = {
  message?: {
    text?: string;
    sticker?: {
      emoji?: string;
    };
    document?: {
      file_name?: string;
    };
    photo?: {
      file_unique_id: string;
    }[];
  };
};

const logger = () => {
  return async (
    ctx: Scenes.SceneContext<Scenes.SceneSessionData>,
    next: () => Promise<void>
  ) => {
    let content;
    let updateTypeId;
    let update: any;
    switch (ctx.updateType) {
      case "message": {
        update = ctx.message;

        updateTypeId = update.message_id;
        if (update.text) {
          content = update.text;
        } else if (update.sticker) {
          content = update.sticker.emoji;
        } else if (update.document) {
          content = update.document.file_name;
        } else if (update.photo) {
          // ctx.message.photo;
          content = update.photo.pop().file_unique_id;
        } else {
          content = "";
        }
        break;
      }
      case "edited_message":
        update = ctx.editedMessage;
        updateTypeId = update.message_id;
        content = update.text || "No text:(";
        break;
      case "channel_post":
        break;
      case "edited_channel_post":
        break;
      case "callback_query":
        break;
      case "inline_query":
        break;
      case "chosen_inline_result":
        break;
      case "shipping_query":
        break;
      case "pre_checkout_query":
        break;
      default:
        content = "";
        updateTypeId = null;
        break;
    }
    // console.log(
    //   "[User]:",
    //   ctx.message?.from.username,
    //   "|[Chat]:",
    //   ctx.chat?.type === "private" ? "private" : ctx.message?.chat.id,
    //   "|[message]:",
    //   ctx.message
    // );
    // console.log(ctx.updateType);

    // console.log(ctx);
    const log = [
      ctx.from?.username,
      ctx.from?.id,
      ctx.chat?.type === "private" ? "PRIVATE_MESSAGE" : ctx.chat?.title,
      ctx.updateType,
      updateTypeId,
      content,
    ];
    const start = new Date();
    await next();
    log.push(new Date().getTime() - start.getTime());
    console.log(
      "[USER]:%s|[USERNAME_ID]:%s|[NAMESPACE]:%s|[ACTION]:%s|[ACTION_ID]:%s|[CONTENT]:%s|[Response time]: %s ms",
      ...log
    );
  };
};

export default logger;
