This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Workflow

1. Start at "/" [home page](src/pages/index.tsx) where the introvert/extrovert questionnaire is shown to user(React)
2. Data: Questions and options comes from SQlite database handled by Prisma ORM. The query is donde as GetStaticProps.  
   Also there we create a **sessionId** a to link user answer to result(after submitted)
3. The Questionnaire shows 5 questions with 4 choices each. All choices has a score(totally subjective)
4. When the 5 questions are already responded the form let user to submit data.
5. The data is sent through [**tRPC**](https://trpc.io/docs/) mutation
6. In the backend **tRPC** endpoint "putAnswer" validate request body, and then calculate a total  
   score(linear interpolation) then we use Prisma to create a new Response mapped to user **sessionId**
7. MeanWhile the front-end waits for the **mutation** to return a `status === success`, when that  
   happens it triggers the routing to **/result** page
8. At [Result page](src/pages/result.tsx) ("/result"), **sessionId** saved on **session storage** is used to query database.  
   This is done via **tRPC** Query with React-Query **useQuery** hook and gets a Result
   This Results has a **totalScore** value (0-100) that we pass to a **Gauge** component that
   render a Gauge showing the value.

## App Architecture

![architecture image](https://icons-images.s3.us-east-2.amazonaws.com/introextro.drawio.png)

## Test E2E
Test for home page run:

```bash
npm run test:e2e
```