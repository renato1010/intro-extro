import { Reducer } from "react";
import {
  introExtroQuestions,
  type AnswerChoices,
  type IntroExtroQuestion,
} from "@components/multiple-choice-question/_data";

export type HomeState = {
  currentQuestion: number;
  questions: IntroExtroQuestion[];
  answers: AnswerChoices[];
  currentScore?: number;
};
export const initialHomeState: HomeState = {
  currentQuestion: 0,
  questions: introExtroQuestions,
  answers: [],
  currentScore: 0,
};
export const createHomeInitialState: (s: HomeState) => HomeState = (
  init: HomeState
) => init;

export type ActionKind = "ADD_ANSWER" | "SHOW_NEXT_QUESTION";
export type ADD_ANSWER_ACTION = { type: "ADD_ANSWER"; payload: AnswerChoices };
export type SHOW_NEXT_ACTION = { type: "SHOW_NEXT_QUESTION"; payload: null };
export type SHOW_PREVIOUS_ACTION = {
  type: "SHOW_PREVIOUS_QUESTION";
  payload: null;
};
export type HomeAction =
  | ADD_ANSWER_ACTION
  | SHOW_NEXT_ACTION
  | SHOW_PREVIOUS_ACTION;
export type HomeReducer = Reducer<HomeState, HomeAction>;

// assert all actions was considered within switch statement
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const assertUnreachable = (_: never) => {
  throw new Error("Not exhaustive switch at homeReducer");
};
export const homeReducer: HomeReducer = (
  state: HomeState,
  action: HomeAction
) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_ANSWER":
      return {
        ...state,
        answers: [...state["answers"], payload],
        currentScore: (state?.["currentScore"] ?? 0) + payload["score"],
      };
    case "SHOW_NEXT_QUESTION":
      return { ...state, currentQuestion: state["currentQuestion"] + 1 };
    case "SHOW_PREVIOUS_QUESTION":
      return { ...state, currentQuestion: state["currentQuestion"] - 1 };
    default:
      assertUnreachable(type);
      return state;
  }
};
