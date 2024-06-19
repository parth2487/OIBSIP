import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const questions = [
  {
    questionText: 'What is the capital of France?',
    answerOptions: [
      { answerText: 'London', isCorrect: false },
      { answerText: 'Paris', isCorrect: true },
      { answerText: 'Berlin', isCorrect: false },
      { answerText: 'Madrid', isCorrect: false },
    ],
  },
  {
    questionText: 'Who wrote the play "Hamlet"?',
    answerOptions: [
      { answerText: 'William Shakespeare', isCorrect: true },
      { answerText: 'Jane Austen', isCorrect: false },
      { answerText: 'Leo Tolstoy', isCorrect: false },
      { answerText: 'Charles Dickens', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the largest planet in our solar system?',
    answerOptions: [
      { answerText: 'Mars', isCorrect: false },
      { answerText: 'Venus', isCorrect: false },
      { answerText: 'Jupiter', isCorrect: true },
      { answerText: 'Saturn', isCorrect: false },
    ],
  },
  {
    questionText: 'Which scientist developed the theory of relativity?',
    answerOptions: [
      { answerText: 'Isaac Newton', isCorrect: false },
      { answerText: 'Albert Einstein', isCorrect: true },
      { answerText: 'Galileo Galilei', isCorrect: false },
      { answerText: 'Stephen Hawking', isCorrect: false },
    ],
  },
  {
    questionText: 'Who painted the Mona Lisa?',
    answerOptions: [
      { answerText: 'Vincent van Gogh', isCorrect: false },
      { answerText: 'Leonardo da Vinci', isCorrect: true },
      { answerText: 'Pablo Picasso', isCorrect: false },
      { answerText: 'Claude Monet', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the largest ocean on Earth?',
    answerOptions: [
      { answerText: 'Atlantic Ocean', isCorrect: false },
      { answerText: 'Indian Ocean', isCorrect: false },
      { answerText: 'Arctic Ocean', isCorrect: false },
      { answerText: 'Pacific Ocean', isCorrect: true },
    ],
  },
  {
    questionText: 'Which country is known as the Land of the Rising Sun?',
    answerOptions: [
      { answerText: 'China', isCorrect: false },
      { answerText: 'Japan', isCorrect: true },
      { answerText: 'South Korea', isCorrect: false },
      { answerText: 'Vietnam', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the chemical symbol for the element Oxygen?',
    answerOptions: [
      { answerText: 'O', isCorrect: true },
      { answerText: 'O2', isCorrect: false },
      { answerText: 'CO', isCorrect: false },
      { answerText: 'H2O', isCorrect: false },
    ],
  },
  {
    questionText: 'Who invented the telephone?',
    answerOptions: [
      { answerText: 'Alexander Graham Bell', isCorrect: true },
      { answerText: 'Thomas Edison', isCorrect: false },
      { answerText: 'Nikola Tesla', isCorrect: false },
      { answerText: 'Guglielmo Marconi', isCorrect: false },
    ],
  },
  {
    questionText: 'Which planet is known as the Red Planet?',
    answerOptions: [
      { answerText: 'Mars', isCorrect: true },
      { answerText: 'Venus', isCorrect: false },
      { answerText: 'Jupiter', isCorrect: false },
      { answerText: 'Mercury', isCorrect: false },
    ],
  },
];

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <View style={styles.container}>
      {!quizStarted ? (
        <View style={styles.startContainer}>
          <Text style={styles.startText}>Welcome to the Quiz App</Text>
          <TouchableOpacity style={styles.button} onPress={startQuiz}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.quizContainer}>
          {showScore ? (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>You scored {score} out of {questions.length}</Text>
              <TouchableOpacity style={styles.button} onPress={restartQuiz}>
                <Text style={styles.buttonText}>Restart Quiz</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{questions[currentQuestion].questionText}</Text>
              <View style={styles.answerOptionsContainer}>
                {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.answerOption}
                    onPress={() => handleAnswerOptionClick(answerOption.isCorrect)}
                  >
                    <Text style={styles.answerOptionText}>{answerOption.answerText}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  quizContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  answerOptionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  answerOption: {
    width: '80%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  answerOptionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;
