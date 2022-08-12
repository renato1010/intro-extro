import { useReducer } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  homeReducer,
  createHomeInitialState,
  HomeReducer,
  initialHomeState,
  HomeState,
} from "@utilities/home";
import styles from "../styles/Home.module.css";
import { MultipleOptionsQuestion } from "@components/multiple-choice-question";
import { AnswerChoices } from "@components/multiple-choice-question/_data";

const Home: NextPage = () => {
  // pass initializer function to avoid recreating initial state on next renders
  const [state, dispatch] = useReducer<HomeReducer, HomeState>(
    homeReducer,
    initialHomeState,
    createHomeInitialState
  );
  const { currentQuestion, questions, answers, currentScore } = state;
  const onAnswerSelect = (choice: AnswerChoices) => {
    dispatch({ type: "ADD_ANSWER", payload: choice });
    dispatch({ type: "SHOW_NEXT_QUESTION", payload: null });
  };
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
              onAnswerSelect={onAnswerSelect}
              option={{ question, choices }}
              index={currentQuestion}
            />
          ))}
      </main>
    </div>
  );
};

export default Home;
