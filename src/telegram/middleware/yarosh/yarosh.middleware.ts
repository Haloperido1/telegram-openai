import { Context } from "telegraf";
import runCompletion from "../../services/openai/chat-gpt.service";
import randomArrayElement from "../../../utils/utils";

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

const whoIsMisterYarosh = () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    //   @ts-expect-error there are no text in message type: https://github.com/telegraf/telegraf/issues/1319
    const text: string = ctx.message.text;

    if (text?.toLowerCase().includes("ярош")) {
      const input = randomArrayElement(prompts);
      await runCompletion(`${instruction} ${input}`)
        .then((answers: any[]) => {
          const ans = answers[0];
          console.log(`${instruction} ${input}`);
          console.log("Ans: ", ans);
          const result = ans.text.substring(ans.text.indexOf("Я"));
          //   ctx.reply(`Ярош это: ${input}`);
          ctx.reply(result);
        })
        .catch((err: any) => {
          console.log(err);
          ctx.reply(err + "");
        });
    }
    next();
  };
};

export default whoIsMisterYarosh;
