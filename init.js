const fs = require('fs');

// Add your own package name and component name
const PACKAGE_NAME = 'rex-text';
const COMPONENT_NAME = 'Text';

// Update tasks, don't edit the content
setPackageJson(PACKAGE_NAME, COMPONENT_NAME);
setJsxFilename(COMPONENT_NAME);
setScssFilename(COMPONENT_NAME);

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