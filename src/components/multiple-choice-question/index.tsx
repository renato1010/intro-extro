import { VStack, Text } from "@chakra-ui/react";
import { MultipleChoiceAnswers } from "./multiple-choice-answers";
import { AnswerChoices, type IntroExtroQuestion } from "./_data";

type IntroExtroQuestionProps = {
  option: IntroExtroQuestion;
  index: number;
  questionsLength: number;
  answersLength:number,
  onAnswerSelect: (c: AnswerChoices) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onSubmitAnswers: () => void;
};
const MultipleOptionsQuestion = ({
  option: { question, choices },
  questionsLength,
  answersLength,
  index,
  onAnswerSelect,
  onNextQuestion,
  onPreviousQuestion,
  onSubmitAnswers
}: IntroExtroQuestionProps) => {
  return (
    <VStack w="80%">
      <Text fontSize="sm" color="gray.700">{`Question ${index + 1}/5`}</Text>
      <Text w="full" fontSize="lg" align="left">
        {question}
      </Text>
      <Text fontSize="sm" color="gray.700">
        All questions are required
      </Text>
      <MultipleChoiceAnswers
        choices={choices}
        index={index}
        questionsLength={questionsLength}
        answersLength={answersLength}
        onAnswerSelect={onAnswerSelect}
        onNextQuestion={onNextQuestion}
        onPreviousQuestion={onPreviousQuestion}
        onSubmitAnswers={onSubmitAnswers}
      />
    </VStack>
  );
};

export { MultipleOptionsQuestion };
