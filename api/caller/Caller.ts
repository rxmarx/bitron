import BankAPI from "./BankAPI";
import CompanyAPI from "./CompanyAPI";
import ExtendedClient from "../../src/classes/ExtendedClient";
import GuildAPI from "./GuildAPI";
import ItemAPI from "./ItemAPI";
import PremiumCommandAPI from "./PremiumCommandAPI";
import SharesAPI from "./SharesAPI";
import TokenAPI from "./TokenAPI";
import UserAPI from "./UserAPI";

class Caller {
  private readonly client: ExtendedClient;

  public readonly user: UserAPI;
  public readonly bank: BankAPI;
  public readonly token: TokenAPI;
  public readonly company: CompanyAPI;
  public readonly shares: SharesAPI;
  public readonly command: PremiumCommandAPI;
  public readonly guild: GuildAPI;
  public readonly item: ItemAPI;

  constructor(client: ExtendedClient) {
    this.client = client;

    this.user = new UserAPI(this.client);
    this.bank = new BankAPI(this.client);
    this.token = new TokenAPI(this.client);
    this.company = new CompanyAPI(this.client);
    this.shares = new SharesAPI(this.client);
    this.command = new PremiumCommandAPI(this.client);
    this.guild = new GuildAPI(this.client);
    this.item = new ItemAPI(this.client);
  }
}

export default Caller;
