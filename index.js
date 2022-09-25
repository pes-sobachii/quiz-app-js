const startButton = document.querySelector('.start-button')
const restartButton = document.querySelector('.restart-button')
const startPage = document.querySelector('.startpage')
const answersBody = document.querySelector('.quiz-body__answers')
const questionTitle = document.querySelector('.quiz-body__question')
const quizOptions = document.querySelector('.quiz-body__option')
const scoreCount = document.querySelector('.score-count')
const questionCount = document.querySelector('.question-count')
const container = document.querySelector('.container')
const endPage = document.querySelector('.endpage')
const finalScore = document.querySelector('.endpage-text')
const playerLevel = document.querySelector('.endpage__level')

let currentScore = 0, correctAnswer = '', currentQuestion = 1, totalQuesionsCount = 10

function escape(htmlStr) {
   return htmlStr.replace(/&lt;/g , "<").replace(/&gt;/g , ">").replace(/&quot;/g , "\"").replace(/&#039;/g , "\'").replace(/&amp;/g , "&");
}

const getQuestions = async () => {
   const questions = await fetch('https://opentdb.com/api.php?amount=1')
   const result = await questions.json()
   countersRefresher()
   setQuestion(result.results[0])
   startPage.style.display = 'none'
}

const countersRefresher = () => {
   scoreCount.textContent = `Your Score: ${currentScore}/${totalQuesionsCount}`
   questionCount.textContent = `Current Question: ${currentQuestion}`
}

const setQuestion = (data) => {
   correctAnswer = data.correct_answer
   questionTitle.innerText = escape(data.question)
   const answers = [...data.incorrect_answers]
   answers.splice(Math.floor(Math.random() * 3), 0, correctAnswer);
   answersBody.innerHTML = ``
   answers.forEach( opt => {
      const li = document.createElement("li")
      li.innerHTML = `<a href="#" class="quiz-body__option">${opt}</a>`
      answersBody.appendChild(li)
   })

}

const endGame = () => {
   endPage.style.display = 'block'
   let level
   switch (currentScore) {
      case 0:
         level = 'Polytechnic Student'
         break;
      case 1:
         level = 'Retard'
         break;
         case 2:
         level = 'Fucking idiot'
         break;
         case 3:
         level = 'Dumb'
         break;
         case 4:
         level = 'You watch too many anime'
         break;
         case 5:
         level = 'Wishy-washy'
         break;
         case 6:
         level = 'You are smarter than average philologist'
         break;
         case 7:
         level = 'Smart ass'
         break;
         case 8:
         level = `Almost genius`
         break;
         case 9:
         level = `Don't cheat, motherfucker!`
         break;
         case 10:
         level = `Yaryna Saprun`
         break;
      default:
         break;
   }
   finalScore.textContent = `You Have Scored: ${currentScore}`
   playerLevel.textContent = `Your level: ${level}`
}

const selectOption = (e) => {


if (e.target.classList.contains('quiz-body__option')) {
   e.preventDefault()
   if (e.target.innerText === correctAnswer){
      e.target.classList.add('correct')
      currentScore++
   } else {
      e.target.classList.add('incorrect')
   }
   currentQuestion++
   //document.querySelectorAll('.quiz-body__option').forEach( option => option)
   setTimeout(currentQuestion > totalQuesionsCount ? endGame : getQuestions, 300)
}
}

const restart = () => {
   endPage.style.display = 'none'
   currentScore = 0
   currentQuestion = 1
   getQuestions()
}

startButton.addEventListener('click', getQuestions)
restartButton.addEventListener('click', restart)
answersBody.addEventListener('click', selectOption)

