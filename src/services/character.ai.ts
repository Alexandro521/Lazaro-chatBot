import { CAINode } from "cainode";
// import {CAINode} from "npm:cainode@latest"; for Deno

export class characterAI_Client {
  private characterID: string;
  private voiceID: string;
  constructor(characterID: string, voiceID: string) {
    this.characterID = characterID;
    this.voiceID = voiceID;
  }
  private login = false;
  private client = new CAINode();
  private token = process.env.characterAiToken

  async senMessage(message: string) {
    if (!this.login) {
      await this.client.login(this.token);
      console.log("Logged in!");
      await this.connect(this.characterID)
      this.login = true;
    }
    await this.client.character.send_message(message, true);
    const response = await this.client.character.generate_turn();
    console.log(response.turn)
    console.log(response.turn.candidates[0])
    const audio = await this.client.character.replay_tts(
      response.turn.turn_key.turn_id,
      response.turn.candidates[0].candidate_id,
      this.voiceID
    );
    console.log(audio);
    return <string>audio.replayUrl;
  }
  async connect(character: string) {
    await this.client.character.connect(character);
    console.log("Connected! to character");
  }

  async disconnect() {
    if (this.login) return;
    await this.client.character.disconnect();
    console.log("Disconnected!");
  }
  async change(character: string,newvoiceID: string) {
    await this.client.character.disconnect();
    console.log("Disconnected!");
    this.voiceID = newvoiceID
    await this.connect(character)
  console.log("Connected! to character");
  }

}

