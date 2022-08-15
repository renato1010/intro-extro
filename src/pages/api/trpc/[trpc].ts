import * as trcp from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { getIntroExtroAsPercent } from "src/utils/put-answer";
import { prisma, PrismaTypes } from "db";

const choice = z.object({
  option: z.string(),
  answer: z.string(),
  score: z.number().gte(1).lte(4),
});
export const appRouter = trcp
  .router()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    },
  })
  .mutation("putAnswer", {
    input: z.object({ sessionId: z.string().cuid(), answers: z.array(choice) }),
    async resolve({ input: { answers, sessionId } }) {
      const scoreSum = answers.reduce((acc, val) => acc + val.score, 0);
      const totalScore = getIntroExtroAsPercent(scoreSum);
      type PutAnswerInput = PrismaTypes.ResultCreateInput;
      const putAnswerInput: PutAnswerInput = { totalScore, sessionId };
      const { sessionId: resultSessionId, totalScore: resultTotalScore } =
        await prisma.result.create({ data: putAnswerInput });
      return {
        result: { sessionId: resultSessionId, totalScore: resultTotalScore },
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
