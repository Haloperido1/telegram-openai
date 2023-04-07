import { Context } from "telegraf";
import runCompletion from "../services/chat-gpt";
import randomArrayElement from "../../utils/index.utils";

const prompts = [
  "Случайная цитата Лукашенко",
  "Случайное оскорбление с трехэтажным матом",
  "Случайная шутка",
  "Забавный случайный факт",
  "Случайная реплика из русской реп песни Фараона",
  "Случайный заголовок новости о войне в украине",
  "Случайная строчка песни группы Kunteynir",
];

const instruction =
  'Выдай мне сообщение в формате "Ярош это - ответ" где ответ это следующий запрос : ';

const whoIsMisterYarosh = (ctx: Context, next: () => Promise<void>) => {
  //   @ts-expect-error there are no text in message type: https://github.com/telegraf/telegraf/issues/1319
  const text: string = ctx.message.text;

  if (text?.toLowerCase().includes("ярош")) {
    const input = randomArrayElement(prompts);
    runCompletion(`${instruction} ${input}`)
      .then((answers: any) => {
        const ans = answers[0];
        console.log(`${instruction} ${input}`);
        console.log("Ans: ", ans);
        const result = ans.substring(ans.indexOf("Я"));
        //   ctx.reply(`Ярош это: ${input}`);
        ctx.reply(result);
      })
      .catch((err: any) => {
        console.log(err.response);
        ctx.reply(err + "");
      });
  }
  next();
};

export default whoIsMisterYarosh;
