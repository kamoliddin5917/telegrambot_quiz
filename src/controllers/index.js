const joi = require("joi")
const path = require("path")
const IO = require("../utils/io")

module.exports = {
    POST: (req, res)=>{
        try {
            const requestSchema = joi.object({
                question: joi.string().min(5).max(500).required(),
                A: joi.object({
                    name: joi.string().min(1).max(100).required(),
                    response: joi.boolean().valid(true, false).required()
                }).required(),
                B: joi.object({
                    name: joi.string().min(1).max(100).required(),
                    response: joi.boolean().valid(true, false).required()
                }).required(),
                C: joi.object({
                    name: joi.string().min(1).max(100).required(),
                    response: joi.boolean().valid(true, false).required()
                }).required(),
                D: joi.object({
                    name: joi.string().min(1).max(100).required(),
                    response: joi.boolean().valid(true, false).required()
                }).required(),
            })
            
            const requestResults = requestSchema.validate(req.body)
            
            if(requestResults.error) return res.status(400).json({messageReq: requestResults.error.details[0].message})

            const io = new IO(path.resolve(__dirname, "../../database", "tests.json"))
            const tests = io.read()
            const id = tests.length ? Number(tests[tests.length - 1].id) + 1 : 1

            const newTest = {
                id,
                question: req.body.question,
                responses: {
                    A: req.body.A,
                    B: req.body.B,
                    C: req.body.C,
                    D: req.body.D,
                }
            }

            io.write([...tests, newTest])
            res.status(200).json(newTest)
        } catch (error) {
            console.log(error.message);
            res.status(500).json(error.message)
        }
    },
    DELETE: (req, res)=>{
        const io = new IO(path.resolve(__dirname, "../../database", "tests.json"))
        const tests = io.read()
        if (req.params.testId === "All") {
            io.write([])
            res.status(200).json({message: "All tests have been disabled!"})
        }else{
            const findTest = tests.find(test => test.id == req.params.testId)
            if (findTest) {
                const deletedTests = tests.filter(test => test.id != req.params.testId)
                io.write(deletedTests)
                res.status(200).json({message: "deleted test", findTest})
            }else{
                res.status(400).json({message: `There is no such id (${req.params.testId}) test in the database`})
            }
        }
    }
}