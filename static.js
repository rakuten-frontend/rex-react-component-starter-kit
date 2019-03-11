const puppeteer = require('puppeteer');
const fse = require('fs-extra');
const packageInfo = require('./package.json');
const { URL } = require('url');
const rexCore = 'node_modules/rex-core/rex-core.production.min.css';
const rexComponent = `node_modules/${packageInfo.name}/${packageInfo.name}.production.min.css`;
const domain = 'http://localhost:8081/';
const iframe = `${domain}iframe.html`;

// Google Puppeteer script
(async () => {
  // Start session
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 320,
    height: 568,
    isMobile: true,
    hasTouch: true,
  });

  // Clean output folder
  await setOutputFolder(rexCore, rexComponent);

  // Start navigation
  await page.goto(domain);

  // Open all Stories links from menu item
  const storiesOfList = await page.$$('div[role="menuitem"]');

  for (let storyOf of storiesOfList) {
    await storyOf.click();
  }

  // Get all urls of Stories from menu
  const linksList = await getUrlListFromStories(page);

  // Create iframe list urls
  const iframeList = getIframeList(linksList, domain, iframe);

  // Filter list
  const iframeStoryUrl = await filterIframeList(iframeList);

  // Open stories iframe page, get html content and create new html file
  for (let story of iframeStoryUrl) {
    await page.goto(story.iframeUrl);
    const content = await getHTMLFrom(page);
    await createHTMLFile(story.htmlFilename, content, story.storyName);
    await page.screenshot({ path: `static/screenshots/${story.pngFilename}` });
  }

  // Close session
  await browser.close();
})();

async function filterIframeList(iframeList) {
  const list = [];

  for (let iframeUrl of iframeList) {
    const myURL = new URL(iframeUrl);

    if (myURL.searchParams.has('selectedKind')) {
      const selectedKind = myURL.searchParams.get('selectedKind');
      const selectedStory = myURL.searchParams.get('selectedStory');
      const storyName = `${selectedKind} ${selectedStory}`;
      const htmlFilename = `${storyName}.html`
        .replace(new RegExp(' ', 'g'), '-')
        .toLocaleLowerCase();
      const pngFilename = htmlFilename.replace('.html', '.png');

      list.push({
        iframeUrl: iframeUrl,
        storyName: storyName,
        htmlFilename: htmlFilename,
        pngFilename: pngFilename,
      });
    }
  }

  return list;
}

function getIframeList(linksList, domain, iframe) {
  const iframeList = linksList.map((item) => {
    return item.replace(domain, iframe);
  });

  return iframeList;
}

async function getUrlListFromStories(page) {
  const selector = 'a';
  const list = await page.evaluate((sel) => {
    let elements = Array.from(document.querySelectorAll(sel));
    let links = elements.map(element => {
      return element.href
    })
    return links;
  }, selector);

  return list;
}

async function setOutputFolder(rexCore, rexComponent) {
  try {
    await fse.removeSync('static');
    await fse.ensureDirSync('static/node_modules');
    await fse.ensureDirSync('static/screenshots');
    await fse.copySync(rexCore, `static/${rexCore}`);
    await fse.copySync(`build/${rexComponent}`, `static/${rexComponent}`);

    return true;
  } catch (error) {
    return false;
  }
}

async function createHTMLFile(htmlFilename, content, title) {
  const htmlTemplate = `<!doctype html>
  <html lang="en">
      <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
          <title>${title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="${rexCore}">
          <link rel="stylesheet" href="${rexComponent}">
      </head>
      <body>
          ${content}
      </body>
  </html>
  `;

  try {
    const filePath = `static/${htmlFilename}`;
    await fse.outputFileSync(filePath, htmlTemplate);

    return true;
  } catch (error) {
    return false;
  }
}

async function getHTMLFrom(page) {
  const rootSelector = '#root';

  let rootHTML = await page.evaluate((sel) => {
    let element = document.querySelector(sel);
    return element ? element.innerHTML : null;
  }, rootSelector);

  return rootHTML;
}
