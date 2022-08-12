import { VStack, Text } from "@chakra-ui/react";
import { MultipleChoiceAnswers } from "./multiple-choice-answers";
import { AnswerChoices, type IntroExtroQuestion } from "./_data";

type IntroExtroQuestionProps = {
  option: IntroExtroQuestion;
  index: number;
  onAnswerSelect: (c: AnswerChoices) => void;
};
const MultipleOptionsQuestion = ({
  option: { question, choices },
  onAnswerSelect,
  index,
}: IntroExtroQuestionProps) => {
  return (
    <VStack>
      <Text fontSize="sm" color="gray.700">{`Question ${index + 1}/5`}</Text>
      <Text fontSize="lg">{question}</Text>
      <Text fontSize="sm" color="gray.700">
        All questions are required
      </Text>
      <MultipleChoiceAnswers
        onAnswerSelect={onAnswerSelect}
        choices={choices}
        index={index}
      />
    </VStack>
  );
};

export { MultipleOptionsQuestion };
