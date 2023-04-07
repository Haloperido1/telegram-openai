import { Configuration, OpenAIApi } from "openai";
import DotEnv from "dotenv";

DotEnv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(configuration);
// const openAi = new OpenAIApi(configuration);

// // const promp = "How to create telegram bot with chat gpt in node js";

async function runCompletion(question: string) {
  const completion = await openAi.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 750,
  });
  console.log(completion.data.choices.length);
  console.log(completion.data.choices);
  return completion.data.choices;
}

// async function runChat() {
//     const chat = await openAi.createChatCompletion({
//         model: 'gpt-3.5-turbo',
//     })
// }

// const answers = runCompletion(promp);

export default runCompletion;
