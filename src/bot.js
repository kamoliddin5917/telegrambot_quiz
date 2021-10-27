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
    const user = {chatId: msg.chat.id, step: 0, res: 0, informations: { first_name: msg.from.first_name, user_name: msg.from.username}}
    if (findUser) {
      findUser.step = 0
      findUser.res = 0
      findUser.informations.first_name = msg.from.first_name
      findUser.informations.user_name = msg.from.username
      stepsIo.write(users)
    }else{
      stepsIo.write([...users, user])
    }
    bot.sendMessage(msg.chat.id, "Assalomu Alaykum",{
      reply_markup: {
        keyboard: [["Start the test"]],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    })
  }else if((msg.text === "Start the test" || msg.text === "A" || msg.text === "B" || msg.text === "C" || msg.text === "D") && findUser.step < tests.length){
     
    if (msg.text !== "Start the test" && tests[findUser.step - 1].responses[msg.text].response && 
        tests[findUser.step - 1].responses[msg.text].response !== "false") {
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
    if (tests[findUser.step - 1].responses[msg.text].response && 
        tests[findUser.step - 1].responses[msg.text].response !== "false") {
      findUser.res += 1
      stepsIo.write(users)
    }
    bot.sendMessage(findUser.chatId,`Your responses: ${tests.length}/${findUser.res}`,{
      reply_markup: {
        keyboard: [["/start"]],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    });
 
    findUser.step = 0
    stepsIo.write(users)
  }
});