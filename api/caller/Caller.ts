import BankAPI from "./BankAPI";
import ExtendedClient from "../../src/classes/ExtendedClient";
import TokenAPI from "./TokenAPI";
import UserAPI from "./UserAPI";

class Caller {
  private readonly client: ExtendedClient;

  public readonly user: UserAPI;
  public readonly bank: BankAPI;
  public readonly token: TokenAPI;

  constructor(client: ExtendedClient) {
    this.client = client;

    this.user = new UserAPI(this.client);
    this.bank = new BankAPI(this.client);
    this.token = new TokenAPI(this.client);
  }
}

export default Caller;
