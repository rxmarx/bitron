import BankAPI from "./BankAPI";
import CompanyAPI from "./CompanyAPI";
import ExtendedClient from "../ExtendedClient";
import GuildAPI from "./GuildAPI";
import ItemAPI from "./ItemAPI";
import PowerUpAPI from "./PowerUpAPI";
import SharesAPI from "./SharesAPI";
import TokenAPI from "./TokenAPI";
import UserAPI from "./UserAPI";

class Caller {
  public readonly user: UserAPI;
  public readonly company: CompanyAPI;
  public readonly shares: SharesAPI;
  public readonly bank: BankAPI;
  public readonly token: TokenAPI;
  public readonly item: ItemAPI;
  public readonly powerUp: PowerUpAPI;
  public readonly guild: GuildAPI;

  constructor(client: ExtendedClient) {
    this.user = new UserAPI(client);
    this.company = new CompanyAPI(client);
    this.shares = new SharesAPI(client);
    this.bank = new BankAPI(client);
    this.token = new TokenAPI(client);
    this.item = new ItemAPI(client);
    this.powerUp = new PowerUpAPI(client);
    this.guild = new GuildAPI(client);
  }
}

export default Caller;
