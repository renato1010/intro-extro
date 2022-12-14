import { useEffect, useReducer } from "react";
import type { GetServerSidePropsResult, NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import cuid from "cuid";
import { prisma } from "db";
import { trpc } from "src/utils/trpc";
import {
  homeReducer,
  createHomeInitialState,
  HomeReducer,
  HomeState,
} from "@utilities/home";
import { MultipleOptionsQuestion } from "@components/multiple-choice-question";
import { type AnswerChoices } from "@components/multiple-choice-question/_data";
import styles from "../styles/Home.module.css";

type HomePageProps = { initialState: HomeState; sessionId: string };
export const getStaticProps: GetStaticProps = async (): Promise<
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
      sessionId: cuid(),
    },
  };
};

const Home: NextPage<HomePageProps> = ({ initialState, sessionId }) => {
  // pass initializer function to avoid recreating initial state on next renders
  const [state, dispatch] = useReducer<HomeReducer, HomeState>(
    homeReducer,
    initialState,
    createHomeInitialState
  );
  const router = useRouter();
  const responseMutation = trpc.useMutation("putAnswer");

  useEffect(() => {
    if (sessionId) {
      sessionStorage.setItem("sessionId", sessionId);
    }
  }, [sessionId]);
  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");
    const hasMutationSuccess = responseMutation.isSuccess;
    if (sessionId && hasMutationSuccess) {
      router.push("/result");
    }
  }, [sessionId, responseMutation.isSuccess, router]);
  const { currentQuestion, questions, answers } = state;
  const onAnswerSelect = (choice: AnswerChoices) => {
    dispatch({ type: "ADD_ANSWER", payload: choice });
  };
  const onNextQuestion = () => {
    dispatch({ type: "SHOW_NEXT_QUESTION", payload: null });
  };
  const onPreviousQuestion = () => {
    dispatch({ type: "SHOW_PREVIOUS_QUESTION", payload: null });
  };
  const onSubmitAnswers = () => {
    const mutationBody = { sessionId, answers };
    responseMutation.mutate(mutationBody);
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
              questionsLength={questions.length}
              answersLength={answers.length}
              option={{ question, choices }}
              index={currentQuestion}
              onAnswerSelect={onAnswerSelect}
              onNextQuestion={onNextQuestion}
              onPreviousQuestion={onPreviousQuestion}
              onSubmitAnswers={onSubmitAnswers}
            />
          ))}
      </main>
    </div>
  );
};

export default Home;
