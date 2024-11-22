import { AkinatorClient, Languages, Themes, Answers } from "node_akinator";

const akinator = new AkinatorClient(Languages.Spanish, true, Themes.Character);

// go into async
(async() => {
    // start the game
    const start = await akinator.start();

    console.log(start.question);

    // let it run automatically until akinator won
    while (!akinator.won) {
        // answer yes all the time
        const answer = await akinator.answer(Answers.Yes);
        console.log(`(${answer.step}/100) ${answer.question}`);
        console.log(answer.progression);

        // wanna go back?
        // await akinator.back();
    }

    // win result and extra information
    console.log(akinator.winResult.name);

    // not satisfied? you can always continue. 
    // use (akinator.ko) to know if he lost.
    const answer = await akinator.continue();
    console.log(`(${answer.step}/100) ${answer.question}`);

    // OR maybe you're satisfied, 
    // then tell akinator.
    await akinator.submitWin();
})();