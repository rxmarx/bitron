import ExtendedClient from "./classes/ExtendedClient";

require("dotenv").config();

const Bot = new ExtendedClient();

Bot.start();
