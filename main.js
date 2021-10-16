const puppeteer = require("puppeteer");

(async () => {
  const url = "https://aa210.taleo.net/careersection/ex/jobsearch.ftl?lang=en";

  // Load Page
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  // Setup job Search
  await page.waitForTimeout(2000);
  const searchPhrase = "assessment coordinator";
  await page.type(".criteriaFieldInput", searchPhrase, { delay: 200 });
  await page.click('input[id="search"');

  // Extract Data
  await page.waitForTimeout(5000);
  const getJobTitles = await page.evaluate(() => {
    const jobLinks = document.querySelectorAll(
      ".multiline-data-container div span a"
    );
    let jobTitles = [];
    jobLinks.forEach((tag) => {
      jobTitles.push(tag.getAttribute("title"));
    });
    return jobTitles;
  });

  // console.log(getJobTitles);
  // sendEmail(getJobTitles);

  await browser.close();
})();
