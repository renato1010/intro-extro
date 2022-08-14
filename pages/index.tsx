import { useReducer } from "react";
import type { GetServerSidePropsResult, NextPage } from "next";
import Head from "next/head";
import { type GetServerSideProps } from "next";
import { prisma } from "db";
import {
  homeReducer,
  createHomeInitialState,
  HomeReducer,
  HomeState,
} from "@utilities/home";
import styles from "../styles/Home.module.css";
import { MultipleOptionsQuestion } from "@components/multiple-choice-question";
import {
  AnswerChoices,
  IntroExtroQuestion,
} from "@components/multiple-choice-question/_data";

type HomePageProps = { initialState: HomeState };
export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<HomePageProps>
> => {
  const questions = await prisma.question.findMany({
    select: {
      question: true,
      choices: {
        select: { answer: true, option: true, score: true },
      },
    },
  });
  return {
    props: {
      initialState: {
        currentQuestion: 0,
        answers: [],
        currentScore: 0,
        questions: JSON.parse(JSON.stringify(questions)),
      },
    },
  };
};

const Home: NextPage<HomePageProps> = ({ initialState }) => {
  // pass initializer function to avoid recreating initial state on next renders
  const [state, dispatch] = useReducer<HomeReducer, HomeState>(
    homeReducer,
    initialState,
    createHomeInitialState
  );
  const { currentQuestion, questions, answers, currentScore } = state;
  const onAnswerSelect = (choice: AnswerChoices) => {
    dispatch({ type: "ADD_ANSWER", payload: choice });
  };
  const onNextQuestion = () => {
    dispatch({ type: "SHOW_NEXT_QUESTION", payload: null });
  };
  const onPreviousQuestion = () => {
    dispatch({ type: "SHOW_PREVIOUS_QUESTION", payload: null });
  };
  console.log({ answers });
  return (
    <div className={styles.container}>
      <Head>
        <title>Personality Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Introvert Or Extrovert</h1>
        <h2>Questionnaire</h2>
        {questions
          .filter((_, idx) => idx === currentQuestion)
          .map(({ question, choices }) => (
            <MultipleOptionsQuestion
              key={question}
              questionsLength={questions.length}
              onAnswerSelect={onAnswerSelect}
              onNextQuestion={onNextQuestion}
              onPreviousQuestion={onPreviousQuestion}
              option={{ question, choices }}
              index={currentQuestion}
            />
          ))}
      </main>
    </div>
  );
};

export default Home;
