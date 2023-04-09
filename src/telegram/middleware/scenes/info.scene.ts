import { Scenes } from "telegraf";

const infoScene = new Scenes.WizardScene<any>("info_scene", (ctx) => {
  ctx.sendMessage("Bot info", {
    reply_markup: {
      keyboard: [[{ text: "/Credits" }, { text: "/API" }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});
// infoScene.enter(async ctx => {})
infoScene.command("Credits", (ctx) => {
  ctx.reply("This bot was made by @name", {
    reply_markup: { remove_keyboard: true },
  });
  ctx.scene.leave();
});

infoScene.command("API", (ctx) => {
  ctx.reply(
    "You can find API on https://github.com/Haloperido1/telegram-openai",
    {
      reply_markup: { remove_keyboard: true },
    }
  );
  ctx.scene.leave();
});

export default infoScene;
