const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`
===========================================
Welcome to ReX React UI Component generator
===========================================
`);

rl.question('\nPackage name (ex: rex-text): ', (packageName) => {

  rl.question('Component name (ex: Text): ', (componentName) => {

    if ((packageName.trim().length > 0) && (componentName.trim().length > 0)) {

      console.log(`\n\nThe new component will update this files and contents: \n`);
      console.log(`./package.json: \n
        {
          name: "${packageName}"
          ...
        }
      `);

      console.log(`./src: \n
        MyComponent.jsx -> ${componentName}.jsx
        MyComponent.scss -> ${componentName}.scss
      `);

      console.log(`./stories/index.jsx: \n
        const stories = storiesOf('MyComponent', module); -> const stories = storiesOf('${componentName}', module);
        ...
      `);

      console.log(`./webpack.config.js: \n
        const entry = {};
        entry[package.name] = './src/${componentName}.jsx';
      `);

      rl.question('Are you sure you want to proceed? (y/n) ', (answer) => {
        
        if (answer == 'y') {
          console.log(`Initial setup started... \n`);
          init(packageName, componentName);
        } else {
          console.log(`Nothing done, see you! \n`);
        }

        rl.close();
      });
    } else {
      console.log(`Make sure the package name and component name are not empty and try again.`);
      rl.close();
    }
  });
});

// INIT Process to set component name and content
function init(packageName, componentName) {
  removeNodeModules();

  // Set files
  setPackageJson(packageName, componentName);
  setJsxFilename(componentName);
  setScssFilename(componentName);

  // Set content
  setJsxContent(packageName, componentName);
  setScssContent(packageName, componentName);
  setStoriesContent(packageName, componentName);
  setWebpackContent(componentName);

  console.log(`
===========================================
Setup finished.
===========================================

Running NPM install and Storybook, please wait.

  `);
}

// Functions and helpers

function setJsxContent(packageName, componentName) {
  const filename = `src/${componentName}.jsx`;
  console.log(`- Updating content of ${filename}`);
  setFileContent(filename, 'MyComponent', componentName);
  setFileContent(filename, 'my-component', packageName);
  console.log(`Done`);
}

function setScssContent(packageName, componentName) {
  const filename = `src/${componentName}.scss`;
  console.log(`- Updating content of ${filename}`);
  setFileContent(filename, 'my-component', packageName);
  console.log(`Done`);
}

function setStoriesContent(packageName, componentName) {
  const filename = `stories/index.jsx`;
  console.log(`- Updating content of ${filename}`);
  setFileContent(filename, 'MyComponent', componentName);
  setFileContent(filename, 'rex-react-component-starter-kit', packageName);
  console.log(`Done`);
}

function setWebpackContent(componentName) {
  const filename = `webpack.config.js`;
  console.log(`- Updating content of ${filename}`);
  setFileContent(filename, 'MyComponent', componentName);
  console.log(`Done`);
}

function setFileContent(componentFilename, pattern, text) {
  const original = fs.readFileSync(componentFilename, 'utf8');

  const componenContent = original.replace(new RegExp(pattern, 'g'), text);

  fs.writeFileSync(componentFilename, componenContent);
}

function setJsxFilename(componentName) {
  console.log(`- Changing src/MyComponent.jsx to src/${componentName}.jsx`);
  fs.renameSync('src/MyComponent.jsx', `src/${componentName}.jsx`);
  console.log(`Done`);
}

function setScssFilename(componentName) {
  console.log(`- Changing src/MyComponent.scss to src/${componentName}.scss`);
  fs.renameSync('src/MyComponent.scss', `src/${componentName}.scss`);
  console.log(`Done`);
}

function setPackageJson(packageName, componentName) {
  console.log('- Updating package.json information');
  const componentFilename = `src/${componentName}.jsx`;
  const file = './package.json';
  const starterKitName = 'rex-react-component-starter-kit';
  let package = require(file);
  package.name = packageName;
  package.version = '0.0.1';
  package.main = componentFilename;
  package.repository.url = package.repository.url.replace(starterKitName, packageName);
  package.author = package.author.replace(starterKitName, packageName);
  package.bugs.url = package.bugs.url.replace(starterKitName, packageName);
  package.homepage = package.homepage.replace(starterKitName, packageName);

  const fileContent = JSON.stringify(package, null, 2);

  fs.writeFileSync(file, fileContent);

  console.log('Done');
}

function removeNodeModules() {
  console.log('- Removing node_modules');

  const deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(function (file) {
        const curPath = path + '/' + file;
        if (fs.lstatSync(curPath).isDirectory()) {
          deleteFolderRecursive(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };

  deleteFolderRecursive('./node_modules');
  console.log('Done');
}