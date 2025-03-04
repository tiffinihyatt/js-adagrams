import { letterPool, scoreChart } from 'constants';

// helper function to create letter pool array
export const createLetterPool = () => {
  const letterPoolArray = [];

  for (const letter in letterPool) {
    for (let i = 0; i < letterPool[letter]; ++i) {
      letterPoolArray.push(letter);
    }
  }

  return letterPoolArray;
};

export const drawLetters = () => {
  const letterPool = createLetterPool();
  const playerHand = [];
  let counter = 0;

  while (counter < 10) {
    // access a letter via random index from letter pool
    const randomIndex = Math.floor(Math.random() * (letterPool.length - 1));
    const randomLetter = letterPool[randomIndex];

    // add letter to player hand, remove letter from letter pool
    playerHand.push(randomLetter);
    letterPool.splice(randomIndex, randomIndex);
    counter += 1;
  }

  return playerHand;
};

export const usesAvailableLetters = (inputWord, lettersInHand) => {
  // check that each character in inputWord exists in lettersInHand
  for (const char of inputWord) {
    if (!lettersInHand.includes(char)) {
      return false;
    } else {
      // remove characters from lettersInHand to maintain accurate letter count
      lettersInHand.splice(
        lettersInHand.indexOf(char),
        lettersInHand.indexOf(char)
      );
    }
  }

  return true;
};

export const scoreWord = (word) => {
  // check for valid input word
  if (!word) return 0;

  // add bonus points for word length
  let score = 0;
  if (word.length >= 7 && word.length <= 10) {
    score += 8;
  }

  // add points for each character in input word
  for (const char of word) {
    score += scoreChart[char.toUpperCase()];
  }

  return score;
};

export const highestScoreFrom = (words) => {
  const bestWord = {
    word: '',
    score: 0,
  };

  for (const word of words) {
    const wordScore = scoreWord(word);

    // compare current word score to best word score, accounting for tiebreakers
    if (wordScore > bestWord['score']) {
      bestWord['word'] = word;
      bestWord['score'] = wordScore;
    } else if (wordScore === bestWord['score']) {
      if (
        bestWord['word'].length !== 10 &&
        (word.length == 10 || word.length < bestWord['word'].length)
      ) {
        bestWord['word'] = word;
        bestWord['score'] = wordScore;
      }
    }
  }

  return bestWord;
};
