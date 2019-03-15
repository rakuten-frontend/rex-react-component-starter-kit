const puppeteer = require('puppeteer');
const fse = require('fs-extra');
const packageInfo = require('./package.json');
const { URL } = require('url');
const htmlFolder = 'docs/html';
const rexCore = 'node_modules/rex-core/rex-core.production.min.css';
const rexComponent = `node_modules/${packageInfo.name}/${packageInfo.name}.production.min.css`;
const domain = 'http://localhost:8081/';
const iframe = `${domain}iframe.html`;

console.log(`
==================================================
  ReX React Components Starter Kit
  Static HTML Stories generator
==================================================
`);
// Google Puppeteer script
(async () => {
  console.log(`
    Starting Google's Puppeteer ...
  `);
  // Start session
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Clean output folder
  await setOutputFolder(htmlFolder, rexCore, rexComponent);
  console.log(`
    Setting output folder ${htmlFolder}
  `);

  // Start navigation
  console.log(`
    Starting navigation at ${domain}
  `);

  await page.goto(domain);

  // Open all Stories links from menu item
  console.log(`
    Getting stories HTML content
  `);
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
  const storyInfoList = [];

  for (let story of iframeStoryUrl) {
    await page.goto(story.iframeUrl);
    const content = await getHTMLFrom(page);
    await createHTMLFile(
      htmlFolder,
      story.htmlFilename,
      content,
      story.storyName,
      rexCore,
      rexComponent,
    );
    await generateScreenshots(page, story.pngFilename);

    storyInfoList.push({
      'url': story.htmlFilename,
      'name': story.storyName,
    });
  }

  const staticHTMLStoryLinks = storyInfoList.map((item, index, list) => {
    return `${index == 0 ? '<ol>' : ''}
      <li>
        <a href="${item.url}">${item.name}</a>
      </li>
    ${index == (list.length - 1) ? '</ol>' : ''}
    `;
  }).join('');

  const staticHTMLContent = `
    <h1>${packageInfo.name}</h1>
    <h2>v${packageInfo.version} stories static html</h2>
    <p>
      ${staticHTMLStoryLinks}
    </p>
  `;

  await createHTMLFile(
    htmlFolder,
    'index.html',
    staticHTMLContent,
    packageInfo.name,
    rexCore,
    rexComponent,
    false,
  );

  // Close session
  await browser.close();

  console.log(`
  Static HTML stories are available at 
  
  http://localhost:8081/html

  `);
})();

async function generateScreenshots(page, fileName) {
  const iPhone5SE = {
    width: 320,
    height: 568,
    isMobile: true,
    hasTouch: true,
  };
  const iPhone8 = {
    width: 375,
    height: 667,
    isMobile: true,
    hasTouch: true,
  };
  const iPhone8Plus = {
    width: 414,
    height: 736,
    isMobile: true,
    hasTouch: true,
  };
  const iPad = {
    width: 768,
    height: 1024,
    isMobile: true,
    hasTouch: true,
  };
  const laptopMDPI = {
    width: 1280,
    height: 800,
    isMobile: false,
  };
  const laptopHiDPI = {
    width: 1440,
    height: 900,
    isMobile: false,
  };

  await page.setViewport(iPhone5SE);
  await page.screenshot({ path: `${htmlFolder}/screenshots/iPhone5SE/iPhone5SE_${fileName}` });

  await page.setViewport(iPhone8);
  await page.screenshot({ path: `${htmlFolder}/screenshots/iPhone8/iPhone8_${fileName}` });

  await page.setViewport(iPhone8Plus);
  await page.screenshot({ path: `${htmlFolder}/screenshots/iPhone8Plus/iPhone8Plus_${fileName}` });

  await page.setViewport(iPad);
  await page.screenshot({ path: `${htmlFolder}/screenshots/iPad/iPad_${fileName}` });

  await page.setViewport(laptopMDPI);
  await page.screenshot({ path: `${htmlFolder}/screenshots/laptopMDPI/laptopMDPI_${fileName}` });

  await page.setViewport(laptopHiDPI);
  await page.screenshot({ path: `${htmlFolder}/screenshots/laptopHiDPI/laptopHiDPI_${fileName}` });

  return true;
}

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

async function setOutputFolder(htmlFolder, rexCore, rexComponent) {
  try {
    await fse.removeSync(htmlFolder);
    await fse.ensureDirSync(`${htmlFolder}/node_modules`);
    await fse.ensureDirSync(`${htmlFolder}/screenshots`);
    await fse.ensureDirSync(`${htmlFolder}/screenshots/iPhone5SE`);
    await fse.ensureDirSync(`${htmlFolder}/screenshots/iPhone8`);
    await fse.ensureDirSync(`${htmlFolder}/screenshots/iPhone8Plus`);
    await fse.ensureDirSync(`${htmlFolder}/screenshots/iPad`);
    await fse.ensureDirSync(`${htmlFolder}/screenshots/laptopMDPI`);
    await fse.ensureDirSync(`${htmlFolder}/screenshots/laptopHiDPI`);
    await fse.copySync(rexCore, `${htmlFolder}/${rexCore}`);
    await fse.copySync(`build/${rexComponent}`, `${htmlFolder}/${rexComponent}`);

    return true;
  } catch (error) {
    return false;
  }
}

async function createHTMLFile(
  htmlFolder,
  htmlFilename,
  content,
  title,
  rexCore,
  rexComponent,
  printComponent = true
) {
  const componenStyle = printComponent ? `<link rel="stylesheet" href="${rexComponent}">` : '';
  const htmlTemplate = `<!doctype html>
  <html lang="en">
      <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
          <title>${title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="shortcut icon" href="https://jp.rakuten-static.com/1/im/ci/rakuten/favicon/cr.ico">
          <link rel="mask-icon" href="https://jp.rakuten-static.com/1/im/ci/rakuten/favicon/Rakuten_SafariPin.svg" color="#bf0000">
          <link rel="stylesheet" href="${rexCore}">
          ${componenStyle}
      </head>
      <body>
          ${content}
      </body>
  </html>
  `;

  try {
    const filePath = `${htmlFolder}/${htmlFilename}`;
    await fse.outputFileSync(filePath, htmlTemplate);
    console.log(`HTML File created: ${filePath}`);

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
