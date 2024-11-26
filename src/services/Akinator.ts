import { AkinatorClient, Languages, Themes, Answers } from "node_akinator";
import { Message, MessageMedia } from "whatsapp-web.js";
import { GameSession } from "../data/temp/temp";

//     const akinator = new AkinatorClient(
//       Languages.Spanish,
//       true,
//       Themes.Character
//     );

// // go into async
// (async () => {
//   // start the game
//   const start = await akinator.start();

//   console.log(start.question);

//   // let it run automatically until akinator won
//   while (!akinator.won) {
//     // answer yes all the time
//     const answer = await akinator.answer(Answers.Yes);
//     console.log(`(${answer.step}/100) ${answer.question}`);
//     console.log(answer.progression);

//     // wanna go back?
//     // await akinator.back();
//   }

//   // win result and extra information
//   console.log(akinator.winResult.name);

//   // not satisfied? you can always continue.
//   // use (akinator.ko) to know if he lost.
//   const answer = await akinator.continue();
//   console.log(`(${answer.step}/100) ${answer.question}`);

//   // OR maybe you're satisfied,
//   // then tell akinator.
//   await akinator.submitWin();
// })();

type NewGameProps = {
   player : string,
   theme: Themes,
   SessionID: string
   message: Message
}

export async function NewGame(props: NewGameProps) {

  const akinator = new AkinatorClient(
    Languages.Spanish,
    true,
    props.theme
  )
  
  const start = await akinator.start();
    
  const answers = [
    "『1』Si",
    "『2』No",
    "『3』No lo sé",
    "『4』Probablemente",
    "『5』Probablemente no",
  ];
  const chatID = (await props.message.getChat()).id._serialized
  await props.message.reply('akinator'+'\n\n'+ '*'+start.question +'*'+ "\n\n" + answers.join("\n")+'\n\n', chatID, {
    extra: "akinator",
  });
  async function game(numberMatch: string) {
      
    const options = {
      "1": Answers.Yes,
      "2": Answers.No,
      "3": Answers.IDontKnow,
      "4": Answers.Probably,
      "5": Answers.ProbablyNot,
    }
    const answer = await akinator.answer(options[numberMatch]);
    console.log("-------------------------------------------------->");
    console.log(`(${answer.step}/100) ${answer.question}`);
    console.log(options[numberMatch]);
    console.log(answer.progression);
    console.log('-------------------------------------------------->')
    const chatID = (await props.message.getChat()).id._serialized
    if (akinator.ko) {
      await props.message.reply("Akinator ha perdido el juego",chatID);
      return
    }
    if (akinator.won) {
      const results = akinator.winResult;
      const image = await MessageMedia.fromUrl(results.pictureUrl,{unsafeMime: true});
      await props.message.reply(image,chatID,{
        caption: results.name,
      });
      await akinator.submitWin();
      await props.message.reply(
        "akinator" +
          "\n\n" +
        "*Juego terminado* \n\n" +
        "*Resultado:*\n『" + results.name + "』\n\n" +
        "cantidad de preguntas: " + akinator.step + "\n\n" +
        "*Opciones:*\n『1』Salir del juego",
        chatID
      );
      GameSession[props.player].games = endOptions;

      return
    }
    function restart() {
      GameSession[props.player].games = undefined
      return
    }
    async function endOptions(numberMatch: string) {
      const options = {
        "1": restart,
      }
      
      options[numberMatch]()
      await props.message.reply('gracias por jugar con el bot',chatID)
    }
    await props.message.reply(
       "akinator" + "\n\n" + answer.question + "\n" + answers.join("\n"),
       chatID,
       {
         extra: "akinator",
       }
     );
    return answer
  }
  GameSession[props.player] = {
    player: props.player,
    theme: props.theme,
    games: game
      };
      return
  }
