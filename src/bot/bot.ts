/** @format */

import { Telegraf } from "telegraf";
import { botToken } from "../utils/utils";

// middlewares
import { checkMembership } from "./middlewares/checkMembers";
import { isKnown } from "./middlewares/isKnown";

// commands
import startCMD from "./command/start.cmd";
import getResultCMD, { handleCode } from "./command/getresult.cmd";

const bot = new Telegraf(botToken);

bot.use(checkMembership);
bot.use(isKnown);

bot.command("start", startCMD);
bot.command("getresult", getResultCMD);

bot.on("text", handleCode);

export default bot;
