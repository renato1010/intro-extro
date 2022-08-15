import { PropsWithChildren } from "react";
import {
  useRadio,
  useRadioGroup,
  Box,
  type RadioProps,
  VStack,
} from "@chakra-ui/react";
import { AnswerChoices } from "./_data";
import { SwitchQuestionBtn } from "./switch-question-btn";

type RadioBoxProps = {
  choice: AnswerChoices;
  onChoiceSel: (param: AnswerChoices) => void;
} & RadioProps;
const RadioBox = ({
  children,
  onChoiceSel,
  choice,
  ...radioProps
}: PropsWithChildren<RadioBoxProps>) => {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);
  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <Box w="100%" as="label">
      <input onClick={() => onChoiceSel(choice)} {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _hover={{ bg: "blue.200", color: "white" }}
        _checked={{ bg: "blue.500", color: "white", borderColor: "blue.600" }}
        _focus={{ boxShadow: "outline" }}
        px={5}
        py={3}
      >
        {children}
      </Box>
    </Box>
  );
};
type MultipleChoiceAnswersProps = {
  choices: AnswerChoices[];
  questionsLength: number;
  answersLength: number;
  index?: number;
  onAnswerSelect: (c: AnswerChoices) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onSubmitAnswers:() => void;
};
const MultipleChoiceAnswers = ({
  choices,
  questionsLength,
  answersLength,
  index = 1,
  onAnswerSelect,
  onNextQuestion,
  onPreviousQuestion,
  onSubmitAnswers
}: MultipleChoiceAnswersProps) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: `question${index}`,
  });
  const group = getRootProps();
  return (
    <VStack w="full" {...group}>
      {choices.map((choice) => {
        const radio = getRadioProps({
          value: choice.answer,
        });
        return (
          <RadioBox
            onChoiceSel={() => onAnswerSelect(choice)}
            choice={choice}
            key={choice.answer}
            {...radio}
          >
            {choice.answer}
          </RadioBox>
        );
      })}
      <SwitchQuestionBtn
        currentQuestionIdx={index}
        questionsLength={questionsLength}
        answersLength={answersLength}
        onNextQuestion={onNextQuestion}
        onPreviousQuestion={onPreviousQuestion}
        onSubmitAnswers={onSubmitAnswers}
      />
    </VStack>
  );
};

export { MultipleChoiceAnswers };
