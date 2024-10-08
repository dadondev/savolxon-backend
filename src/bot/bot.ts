/** @format */

import { Telegraf } from "telegraf";
import { botToken } from "../utils/utils";

// middlewares
import { checkMembership } from "./middlewares/checkMembers";
import { isKnown } from "./middlewares/isKnown";

// commands
import startCMD from "./command/start.cmd";
import getResultCMD, { handleCode } from "./command/getresult.cmd";
import { savePhoneNumber } from "./functions/savePhoneNumber";
import instroductionAction from "./actions/instroduction";
import backAction from "./actions/back";
import sendMsgToUsers from "./actions/sendMessageToUsers";
import getStatistics from "./actions/statistics";

const bot = new Telegraf(botToken);

bot.use(checkMembership);

bot.on("contact", savePhoneNumber);
bot.use(isKnown);

bot.command("start", startCMD);
bot.command("getresult", getResultCMD);

bot.on("text", handleCode);

bot.action("instroduction", instroductionAction);

bot.action("back", backAction);
bot.action("sendMessageToUsers", sendMsgToUsers);
bot.action("statistics", getStatistics);

export default bot;
