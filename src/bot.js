const Bot = require("node-telegram-bot-api")
const path = require("path")
const IO = require("./utils/io")
const configBot = require("./config/server")

const bot = new Bot(configBot.BOT_ID, {polling: true,})

const testsIo = new IO(path.resolve(__dirname, "../database", "tests.json"))
const stepsIo = new IO(path.resolve(__dirname, "../step", "step.json"))

bot.on("message", (msg) => {
  const users = stepsIo.read()
  const tests = testsIo.read()
  const findUser = users.find(u => u.chatId == msg.chat.id)
  
  if (msg.text === "/start") {
    const user = {chatId: msg.chat.id, step: 0, res: 0}
    
    if (findUser) {
      findUser.step = 0
      stepsIo.write(users)
    }else{
      stepsIo.write([...users, user])
    }
    bot.sendMessage(findUser.chatId,
     `${findUser.step + 1}) ${tests[0].question}
     A. ${tests[0].responses.A.name}
     B. ${tests[0].responses.B.name}
     C. ${tests[0].responses.C.name}
     D. ${tests[0].responses.D.name}`,{
      reply_markup: {
        keyboard: [["A", "B"],["C", "D"]],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    });
    
    findUser.step += 1
    findUser.res = 0
    stepsIo.write(users)
  }else if((msg.text === "A" || msg.text === "B" || msg.text === "C" || msg.text === "D") && findUser.step < tests.length){
     
    if (tests[findUser.step - 1].responses[msg.text].response && tests[findUser.step - 1].responses[msg.text].response !== "false") {
      findUser.res += 1
      stepsIo.write(users)
    }
    bot.sendMessage(findUser.chatId,
      `${findUser.step + 1}) ${tests[findUser.step].question}
      A. ${tests[findUser.step].responses.A.name}
      B. ${tests[findUser.step].responses.B.name}
      C. ${tests[findUser.step].responses.C.name}
      D. ${tests[findUser.step].responses.D.name}`,{
      reply_markup: {
        keyboard: [["A", "B"],["C", "D"]],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    });
 
    findUser.step += 1
    stepsIo.write(users)
  }else if((msg.text === "A" || msg.text === "B" || msg.text === "C" || msg.text === "D") && findUser.step === tests.length){
    if (tests[findUser.step - 1].responses[msg.text].response && tests[findUser.step - 1].responses[msg.text].response !== "false") {
      findUser.res += 1
      stepsIo.write(users)
    }
    bot.sendMessage(findUser.chatId,`Your responses: ${tests.length}/${findUser.res}`);
 
    findUser.step = 0
    stepsIo.write(users)
  }
});