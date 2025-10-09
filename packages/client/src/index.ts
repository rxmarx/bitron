import * as dotenv from "dotenv";

import ExtendedClient from "./classes/ExtendedClient";

dotenv.config();

const Bot = new ExtendedClient();

Bot.start();
