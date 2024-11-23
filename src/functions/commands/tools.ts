/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Answers } from "node_akinator";
import { Message, MessageMedia} from "whatsapp-web.js";
import { akinator } from "../../data/temp/aki";


export default class Tools {
  static async stickerCreate(message: Message) {
    try {
      const chat = await message.getChat();
      const stkProps = {
        sendMediaAsSticker: true,
        stickerAuthor: "chrollo bot",
        stickerName: "chrollo bot name",
        stickerCategories: ["chrollo bot category"],
      };
      if (message.hasQuotedMsg) {
        const quote = await message.getQuotedMessage();
        // console.log(quote)
        if (!quote.hasMedia) throw new Error("no tienes mensaje con imagen");
        const media = await quote.downloadMedia();
        await chat.sendMessage(media, stkProps);
        return;
      }
      if (!message.hasMedia) throw new Error("no tienes mensaje con imagen");
      const media = await message.downloadMedia();
      await chat.sendMessage(media, stkProps);
    } catch (e) {
      message.reply(e.message);
    }
    }
    
  static async test(message: Message) {
    try {
      const chat = await message.getChat();
      if (akinator.won) {
        const media = await MessageMedia.fromUrl(
          akinator.winResult.pictureUrl,
          { unsafeMime: true }
        );
        await message.reply(media, chat.id._serialized, {
          caption: akinator.winResult.name,
        });
        await akinator.submitWin();
        return;
      }
      if (message.hasQuotedMsg) {
        const quote = await message.getQuotedMessage();

        const numberMatch = message.body.match(/#(\d+)/)[1];
        const options = {
          "1": Answers.Yes,
          "2": Answers.No,
          "3": Answers.IDontKnow,
          "4": Answers.Probably,
          "5": Answers.ProbablyNot,
        };
        console.log(numberMatch);
        console.log(options[numberMatch]);
        const answer = await akinator.answer(options[numberMatch]);
        console.log(answer.won, akinator.won);
        if (answer.won || akinator.won) {
          const media = await MessageMedia.fromUrl(
            akinator.winResult.pictureUrl,
            { unsafeMime: true }
          );
          await message.reply(media, chat.id._serialized, {
            caption: akinator.winResult.name,
          });
          await akinator.submitWin();
          return;
        }
        const answers = [
          "1-Yes",
          "2-No",
          "3-Don't know",
          "4-Probably",
          "5-Probably not",
        ];
        console.log(akinator.akitude);
        await message.reply(
          "test" + "\n" + answer.question + "\n" + answers.join("\n")
        );
        console.log(`(${answer.step}/100) ${answer.question}`);
        console.log(answer.progression);
      } else {
        const session = "test";
        const chat = await message.getChat();
        const answers = [
          "1-Yes",
          "2-No",
          "3-Don't know",
          "4-Probably",
          "5-Probably not",
        ];
        const start = await akinator.start();
        await message.reply(
          "test" + "\n" + start.question + "\n" + answers.join("\n")
        );
      }
    } catch (error) {}
  }
}