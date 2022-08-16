import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("Home Page", () => {
  test("should have a particular title", async ({ page }) => {
    // check page title
    await expect(page).toHaveTitle(/Personality Test/);
  });
  test("should have a question and 4 choices for answer also route to question # 2", async ({
    page,
  }) => {
    // should be the first question
    const questionIfromTotal = page.locator("text=Question 1/5");
    await expect(questionIfromTotal).toBeVisible();
    // since questions are premade we can test for those to be present
    const question = page.locator(
      "text=You're really busy at work and a colleague is telling you their life story and personal woes."
    );
    await expect(question).toBeVisible();
    // look for exactly 4 options for answer, each one has a input type radio
    // with name=question${index}
    const options = page.locator('input[name="question0"]');
    const countOptions = await options.count();
    expect(countOptions).toEqual(4);
    // since this is the first question we expect only next question button
    const nextQuestionBtnRegex = new RegExp(/next question/, "i");
    const nexQuestionButton = page.locator("button", {
      hasText: nextQuestionBtnRegex,
    });
    await expect(nexQuestionButton).toBeVisible();
    // click the Next question button
    await nexQuestionButton.click();
    // now we are dealing with question No 2
    const questionTwoFromFive = page.locator("text=Question 2/5");
    await expect(questionTwoFromFive).toBeVisible();
    // here we have both buttons next/previous
    const prevQuestionBtnRegex = new RegExp(/previous question/, "i");
    const prevQuestionButton = page.locator("button", {
      hasText: prevQuestionBtnRegex,
    });
    await expect(nexQuestionButton).toBeVisible();
    await expect(prevQuestionButton).toBeVisible();
  });
});
