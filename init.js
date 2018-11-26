const fs = require('fs');

// Add your own package name and component name
const PACKAGE_NAME = 'rex-text';
const COMPONENT_NAME = 'Text';

// Update tasks, don't edit the content from here
setPackageJson(PACKAGE_NAME, COMPONENT_NAME);
setJsxFilename(COMPONENT_NAME);
setScssFilename(COMPONENT_NAME);

setJsxContent(PACKAGE_NAME, COMPONENT_NAME);
setScssContent(PACKAGE_NAME, COMPONENT_NAME);
setStoriesContent(PACKAGE_NAME, COMPONENT_NAME);

function setJsxContent(packageName, componentName) {
  const componentFilename = `src/${componentName}.jsx`;
  setFileContent(componentFilename, 'MyComponent', componentName);
  setFileContent(componentFilename, 'my-component', packageName);
}

function setScssContent(packageName, componentName) {
  const componentFilename = `src/${componentName}.scss`;
  setFileContent(componentFilename, 'my-component', packageName);
}

function setStoriesContent(packageName, componentName) {
  const componentFilename = `stories/index.jsx`;
  setFileContent(componentFilename, 'MyComponent', componentName);
  setFileContent(componentFilename, 'rex-react-component-starter-kit', packageName);
}

function setFileContent(componentFilename, pattern, text) {
  const original = fs.readFileSync(componentFilename, 'utf8');

  const componenContent = original.replace(new RegExp(pattern, 'g'), text);

  fs.writeFileSync(componentFilename, componenContent);
}

function setJsxFilename(componentName) {
  fs.renameSync('src/MyComponent.jsx', `src/${componentName}.jsx`);
}

function setScssFilename(componentName) {
  fs.renameSync('src/MyComponent.scss', `src/${componentName}.scss`);
}

function setPackageJson(packageName, componentName) {
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
}