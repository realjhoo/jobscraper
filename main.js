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

  let jobs = getJobTitles;
  let jobsList = "";
  for (let i = 0; i < jobs.length; i++) {
    jobsList += jobs[i] + "<br>";
  }

  jobsList += `<br>Click <a href="https://aa210.taleo.net/careersection/ex/jobsearch.ftl?lang=en">here</a> and search for "${searchPhrase}" to apply`;

  // send info to email function
  sendMail({
    from: '"Fort Bend CAC Jobs" <professorhoover@aol.com',
    to: "jerry.hoover@ymail.com",
    subject: `FBISD CAC Jobs List for ${buildDate()}`,
    html: jobsList,
  });

  await browser.close();
})();
