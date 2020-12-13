const express = require("express");

const QuizController = require("../controllers/quiz");


const router = express.Router();

router.post("", function(req, res, next){
    QuizController.createQuiz(req, res, next)
});

router.post("/answers", function(req, res, next){
    QuizController.answerQuiz(req, res, next)
});

router.get("/results", function(req, res){
    QuizController.getResults(req, res)
});

router.delete("/results", function(req, res){
    QuizController.deleteResults(req, res)
});

// router.get("", function(req, res){
//     QuizController.getPosts
// });

// router.get("/:id", function(req, res){
//     QuizController.getPost
// });

// router.delete("/:id", function(req, res){
//     QuizController.deletePost
// });

module.exports = router;
