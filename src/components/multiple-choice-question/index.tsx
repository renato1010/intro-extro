import { VStack, Text } from "@chakra-ui/react";
import { MultipleChoiceAnswers } from "./multiple-choice-answers";
import { AnswerChoices, type IntroExtroQuestion } from "./_data";

type IntroExtroQuestionProps = {
  option: IntroExtroQuestion;
  index: number;
  questionsLength: number;
  onAnswerSelect: (c: AnswerChoices) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
};
const MultipleOptionsQuestion = ({
  option: { question, choices },
  questionsLength,
  onAnswerSelect,
  onNextQuestion,
  onPreviousQuestion,
  index,
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
        onAnswerSelect={onAnswerSelect}
        onNextQuestion={onNextQuestion}
        onPreviousQuestion={onPreviousQuestion}
        choices={choices}
        index={index}
        questionsLength={questionsLength}
      />
    </VStack>
  );
};

export { MultipleOptionsQuestion };
