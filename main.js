"use strict";
const puppeteer = require("puppeteer");
const { sendMail, buildDate } = require("./sendemail");

(async () => {
  const url = "https://aa210.taleo.net/careersection/ex/jobsearch.ftl?lang=en";

  // Load Page
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  // Setup job Search
  const searchPhrase = "assessment coordinator";
  await page.waitForTimeout(2000);
  await page.type(".criteriaFieldInput", searchPhrase);
  await page.click('input[id="search"');

  // Extract Data
  await page.waitForTimeout(5000);

  // Extract Job Titles
  const getJobTitles = await page.evaluate(() => {
    const jobLinkTitles = document.querySelectorAll(
      ".multiline-data-container div span a"
    );
    let jobTitles = [];
    jobLinkTitles.forEach((tag) => {
      jobTitles.push(tag.getAttribute("title"));
    });
    return jobTitles;
  });

  // Extract Job Description Links
  const getJobLinks = await page.evaluate(() => {
    const jobLinkTag = document.querySelectorAll(
      ".multiline-data-container div span a"
    );
    let jobLinks = [];
    jobLinkTag.forEach((tag) => {
      jobLinks.push(tag.getAttribute("href"));
    });
    return jobLinks;
  });

  // Build Email Body
  let jobs = getJobTitles;
  let links = getJobLinks;

  let jobsList = "";
  const linkURL = "https://aa210.taleo.net";

  for (let i = 0; i < jobs.length; i++) {
    jobsList += `<a href="${linkURL}${links[i]}">${jobs[i]}</a></br>`;
  }

  jobsList += `</br>Jobscraper found these ${jobs.length} jobs posted on <a href="https://aa210.taleo.net/careersection/ex/jobsearch.ftl?lang=en">FBISD's jobs page</a>, using the search parameter, "${searchPhrase}".`;

  // email it
  sendMail({
    from: '"Fort Bend CAC Jobs" <professorhoover@aol.com',
    to: "jerry.hoover@ymail.com",
    subject: `FBISD CAC Jobs List for ${buildDate()}`,
    html: jobsList,
  });

  await browser.close();
})();
