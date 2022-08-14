export type AnswerChoices = {
  option: string;
  answer: string;
  score: number;
};

export type IntroExtroQuestion = {
  question: string;
  choices: AnswerChoices[];
};
export const introExtroQuestions: IntroExtroQuestion[] = [
  {
    question:
      "You're really busy at work and a colleague is telling you their life story and personal woes. You:",
    choices: [
      { answer: "Don't dare to interrupt them", option: "A", score: 1 },
      {
        answer:
          "Think it's more important to give them some of your time; work can wait",
        option: "B",
        score: 2,
      },
      {
        answer: "Listen, but with only with half an ear",
        option: "C",
        score: 3,
      },
      {
        answer: "Interrupt and explain that you are really busy at the moment",
        option: "D",
        score: 4,
      },
    ],
  },
  {
    question:
      "You've been sitting in the doctor's waiting room for more than 25 minutes. You:",
    choices: [
      {
        answer: "Look at your watch every two minutes",
        option: "A",
        score: 2,
      },
      {
        answer: "Bubble with inner anger, but keep quiet",
        option: "B",
        score: 1,
      },
      {
        answer:
          "Explain to other equally impatient people in the room that the doctor is always running late",
        option: "C",
        score: 3,
      },
      {
        answer: "Complain in a loud voice, while tapping your foot impatiently",
        option: "D",
        score: 4,
      },
    ],
  },
  {
    question:
      "You're having an animated discussion with a colleague regarding a project that you're in charge of. You:",
    choices: [
      {
        answer: "Don't dare contradict them",
        option: "A",
        score: 1,
      },
      {
        answer: "Think that they are obviously right",
        option: "B",
        score: 2,
      },
      {
        answer: "Defend your own point of view, tooth and nail",
        option: "C",
        score: 3,
      },
      {
        answer: "Continuously interrupt your colleague",
        option: "D",
        score: 4,
      },
    ],
  },
  {
    question: "You are taking part in a guided tour of a museum. You:",
    choices: [
      {
        answer:
          "Are a bit too far towards the back so don't really hear what the guide is saying",
        option: "A",
        score: 1,
      },
      {
        answer: "Follow the group without question",
        option: "B",
        score: 3,
      },
      {
        answer: "Make sure that everyone is able to hear properly",
        option: "C",
        score: 2,
      },
      {
        answer:
          "Are right up the front, adding your own comments in a loud voice",
        option: "D",
        score: 4,
      },
    ],
  },
  {
    question:
      "During dinner parties at your home, you have a hard time with people who:",
    choices: [
      {
        answer: "Ask you to tell a story in front of everyone else",
        option: "A",
        score: 1,
      },
      {
        answer: "Talk privately between themselves",
        option: "B",
        score: 3,
      },
      {
        answer: "Hang around you all evening",
        option: "C",
        score: 2,
      },
      {
        answer:
          "Always drag the conversation back to themselves",
        option: "D",
        score: 4,
      },
    ],
  },
];
