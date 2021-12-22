# Jobscraper

A scraper that, at 8:05 each morning, retrieves some data from the web using puppeteer and emails that data to me using nodemailer.

## Problem

I wanted a daily list of specific job openings at my company. The HR page has no way to create alerts for jobs matching your parameters, so the only way to be informed of openings is to check the website. Every. Single. Day.

## Solution

Automation. Each morning the scraper automatically opens the site, enters the desired search terms, extracts the results, and emails them to me. The data is also formatted so that the user can click on the link and go straight to the desired job opening. This could be easily adapted to other uses by changing the class targets.

## Results

Its beautiful, to be honest.

## How to Install and Use

Assuming that you are a programmer, and you aleady have the latest Node installed, lets start by creating a gitignore for your node modules.

`npx gitignore node`

Then we will initialize a new Node project.

`npm init -y`

Next, we need Puppeteer to automate the scraping part of our app.

`npm install puppeteer`

And we'll need the Nodemailer package to automate the email part.

`npm install nodemailer`

Lastly, to run this project and make sure everything is working, type `node main.js`

## Launchd Automation

To have the jobscraper run at the designated time, you will need to place the plist file (`com.jobscraper.daemon.plist`) in the correct spot, which is normally

`~/Library/LaunchAgents/`

The easiest thing to do here is type

`open ~/Library/LaunchAgents/`

which will open the folder, then you can drag the plist file into the correct spot.

In addition, you will need to edit the plist to refer to the correct directories on your Mac. Specifically, Line 21 `<string>/Users/jerryhoover/Desktop/coding/personal-projects/jobscraper/stderr.log</string>` will need to be changed, as will any other reference to specific directories.

To load the plist into Launchd, type the command,

`launchctl load ~/Libray/LaunchAgents/com.jobscraper.daemon.plist`

If you need to edit the plist after that, type

`launchctl unload ~/Libray/LaunchAgents/com.jobscraper.daemon.plist`

In addition, the automation will not run if the computer is asleep, so you may want to set the computer to wake itself at a specific time shortly before the script is scheduled to run. Of course, afterward, the computer can return to sleep mode.
