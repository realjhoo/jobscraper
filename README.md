# Jobscraper
A scraper that uses puppeteer to retrieve some data and nodemailer to send me that data each morning at 8:05

### Problem
I wanted a daily list of specific job openings at my company. The HR page has no way to create alerts for jobs matching your parameters, so the only way to be informed of openings is to check the website. Every. Day.

### Solution
I automated this. Each morning the scraper automatically opens the site, enters the desired search terms, extracts the results, and emails them to me. 

### Results
Its beautiful, to be honest.
