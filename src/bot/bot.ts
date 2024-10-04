/** @format */

import { Telegraf } from "telegraf";
import { botToken } from "../utils/utils";
import { checkMembership } from "./middlewares/checkMembers";
import startCMD from "./command/start.cmd";

const bot = new Telegraf(botToken);

bot.use(checkMembership);

bot.command("start", startCMD);

export default bot;
