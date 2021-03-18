const Quiz = require("../models/quiz");

// Create a new quiz
exports.createQuiz = (req, res, next) => {
  const quiz = {
    name: req.body.name,
    uniqueId: req.body.uniqueId,
    answers: req.body.answers
  };
  const uniqueId = req.body.uniqueId;
  // upsert: true, if data is not there, it will create
  Quiz
    .updateOne({uniqueId}, quiz, {upsert: true})
    .then(() => {
      res.status(201).json({
        message: "Quiz added successfully"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: {
          "failed"  : "Creating a quiz failed!",
          "error"   : error
        }
      });
    });
};

exports.answerQuiz = (req, res, next) => {
  const uniqueId = req.body.uniqueId;
  const userName = req.body.username;
  let percentKnown;
  // Find one will return the first id
  Quiz
    .findOne({"uniqueId": uniqueId}).lean()
    .then((userData) => {
      let obj = {...userData};
      let answersMatched = 0;      
      for(let i = 0; i<userData.answers.length; i++) {
        if (userData.answers[i] == req.body.answers[i]) {
          answersMatched++;
        }
      }
    
      percentKnown = (answersMatched/userData.answers.length)*100;
      let dataObj = {
        name: userName,
        percentMatched: percentKnown
      }
      let reviewArr = [];
      if(obj.reviewData) {
        reviewArr = [...obj.reviewData];
      }
      reviewArr.push(dataObj);
      obj.reviewData = reviewArr;
      Quiz.updateOne({"uniqueId": uniqueId},obj).then(result=>{
        res.status(201).json({
          name: userData.name,
          percentMatched: percentKnown,
          reviewData: reviewArr
        })
      }).catch(e=>console.log(e))
    })
    .catch(error => {
      res.status(500).json({
        message: {
          "failed"  : "Finding answers failed!",
          "error"   : error
        }
      });
    });
};

exports.getResults = (req, res) => {
  // lean() - converts to json
  Quiz.findOne({"uniqueId": req.query.data}).lean()
    .then(userData => {
      res.status(200).json({
        reviewData: userData.reviewData
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching review data failed!"
      });
    });
};

/* For multiple delete */
// exports.deleteResults = (req, res) => {
//   Quiz.deleteMany(req.query.dataInArr)
//     .then(result => {
//       res.status(200).json({
//         msg: 'Deleted successful'
//       })
//     }).catch(error => {
//       res.status(500).json({
//         message: "Deleting data failed"
//       });
//     });
// }
exports.deleteResults = (req, res) => {
  Quiz.deleteOne({"uniqueId": req.query.id})
    .then(result => {
      res.status(200).json({
        msg: 'Deleted successful'
      })
    }).catch(e=>console.log(e));
}


// exports.getQuizes = (req, res, next) => {
//   const pageSize = +req.query.pagesize;
//   const currentPage = +req.query.page;
//   const postQuery = Quiz.find();
//   let fetchedQuizes;
//   if (pageSize && currentPage) {
//     postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
//   }
//   postQuery
//     .then(documents => {
//       fetchedQuizes = documents;
//       return Quiz.count();
//     })
//     .then(count => {
//       res.status(200).json({
//         message: "Quizes fetched successfully!",
//         quizes: fetchedQuizes,
//         maxQuizes: count
//       });
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Fetching quizes failed!"
//       });
//     });
// };

// exports.getQuiz = (req, res, next) => {
//   Quiz.findById(req.params.id)
//     .then(quiz => {
//       if (quiz) {
//         res.status(200).json(quiz);
//       } else {
//         res.status(404).json({ message: "Quiz not found!" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Fetching quiz failed!"
//       });
//     });
// };

// exports.deleteQuiz = (req, res, next) => {
//   Quiz.deleteOne({ _id: req.params.id, creator: req.userData.userId })
//     .then(result => {
//       console.log(result);
//       if (result.n > 0) {
//         res.status(200).json({ message: "Deletion successful!" });
//       } else {
//         res.status(401).json({ message: "Not authorized!" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Deleting posts failed!"
//       });
//     });
// };
