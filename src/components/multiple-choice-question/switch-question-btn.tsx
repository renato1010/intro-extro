import { useMemo } from "react";
import { ButtonGroup, Button, Icon } from "@chakra-ui/react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

type SwitchQuestionBtnProps = {
  currentQuestionIdx: number;
  questionsLength: number;
  onNextQuestion: () => void;
  onPreviousQuestion:() => void;
};
const SwitchQuestionBtn = ({
  currentQuestionIdx,
  questionsLength,
  onNextQuestion,
  onPreviousQuestion
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
            <Button onClick={onPreviousQuestion} w="50%" justifyContent="flex-start">
              <Icon as={GoChevronLeft} /> Previous question
            </Button>
          </ButtonGroup>
        );
      case questionsLength:
        return <Button>Check results</Button>;
      default:
        return (
          <ButtonGroup w="full" justifyContent="space-evenly" variant="outline">
            <Button onClick={onPreviousQuestion} w="50%" justifyContent="flex-start">
              <Icon as={GoChevronLeft} /> Previous question
            </Button>
            <Button onClick={onNextQuestion} w="50%" justifyContent="flex-end">
              Next question <Icon as={GoChevronRight} />
            </Button>
          </ButtonGroup>
        );
    }
  }, [currentQuestionIdx, questionsLength, onNextQuestion,onPreviousQuestion]);
  return BtnGroup;
};

export { SwitchQuestionBtn };
