import { useMemo } from "react";
import { ButtonGroup, Button, Icon } from "@chakra-ui/react";
import { GoChevronRight, GoChevronLeft, GoLinkExternal } from "react-icons/go";

type SwitchQuestionBtnProps = {
  currentQuestionIdx: number;
  questionsLength: number;
  answersLength: number;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onSubmitAnswers: () => void;
};
const SwitchQuestionBtn = ({
  currentQuestionIdx,
  questionsLength,
  answersLength,
  onNextQuestion,
  onPreviousQuestion,
  onSubmitAnswers,
}: SwitchQuestionBtnProps) => {
  const BtnGroup = useMemo(() => {
    switch (currentQuestionIdx) {
      case 0:
        return (
          <ButtonGroup w="full" justifyContent="flex-end" variant="outline">
            <Button onClick={onNextQuestion} w="50%" justifyContent="flex-end">
              Next question <Icon as={GoChevronRight} />
            </Button>
          </ButtonGroup>
        );
      case questionsLength - 1:
        return (
          <ButtonGroup w="full" justifyContent="flex-start" variant="outline">
            <Button
              onClick={onPreviousQuestion}
              w="50%"
              justifyContent="flex-start"
            >
              <Icon as={GoChevronLeft} /> Previous question
            </Button>
            <Button
              isDisabled={answersLength !== questionsLength}
              onClick={onSubmitAnswers}
              w="50%"
              justifyContent="flex-start"
              _disabled={{
                bg: "gray.300",
                color: "blue.700",
                cursor: "not-allowed",
              }}
            >
              Check Results <Icon as={GoLinkExternal} />
            </Button>
          </ButtonGroup>
        );
      case questionsLength:
        return <Button>Check results</Button>;
      default:
        return (
          <ButtonGroup w="full" justifyContent="space-evenly" variant="outline">
            <Button
              onClick={onPreviousQuestion}
              w="50%"
              justifyContent="flex-start"
            >
              <Icon as={GoChevronLeft} /> Previous question
            </Button>
            <Button onClick={onNextQuestion} w="50%" justifyContent="flex-end">
              Next question <Icon as={GoChevronRight} />
            </Button>
          </ButtonGroup>
        );
    }
  }, [
    currentQuestionIdx,
    questionsLength,
    onNextQuestion,
    onPreviousQuestion,
    answersLength,
    onSubmitAnswers,
  ]);
  return BtnGroup;
};

export { SwitchQuestionBtn };
