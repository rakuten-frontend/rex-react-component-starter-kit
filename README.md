# ReX React UI Components Library
## ReX Component Started Kit

This project is part of ReX Design Language and it can be used to create React UI Components.   
For more information visit https://github.com/rakuten-frontend .

## How it was built 

1. Build tool: webpack 4
1. Codebase: Fork of Bootstrap project + ReX custom styles
1. Css engine: Sass
1. JavaScript component: React

## What you can do

This project is a started kit, it contains the settings to start the creations of a React component and publish it to NPM.   

Use it as a basement and reference for your own project and customize it as you will.  

If you need a full environment to create a React Web App, try the react-create-app to get a full environment for your App or use any other started kit.

## How to install

```
npm install
```

## How to use it in 3 steps

Notes:  
`MyComponent` : is the default sample name, change it to your component name.   
`PACKAGE_NAME`: is the reference to the package.json name field of your project, change it to your package name.

### STEP 1: Component source code

Change this file for your own component.

```
./src/MyComponent.jsx
```

### STEP 2: Webpack entry point

Open the webpack config file from `./webpack.conf.js` and then add your own component:

```
entry[packageName] = './src/MyComponent.jsx';
```

### STEP 3: Storybook project

Open storybook `./stories/index.jsx` and then add your own component:

```
const MyComponent = (
  process.env.NODE_ENV === 'production' ? 
  require('../build/node_modules/PACKAGE_NAME') : 
  require('../src/MyComponent').default
);
```

## How to start the project

The development environment is based on Storybook, for more info visit https://storybook.js.org/     


```
npm start
```

## How to build

The build task will generate a NPM package ready to be published and also a static version of Storybook, one folder for NPM `./build/node_modules/PACKAGE_NAME` and other one for Github pages `./docs/PACKAGE_NAME`.   

```
npm run build
```

## How to check build version

By using Node http-server, you can check the static version of Storybook with production settings and builds.

```
npm run serve
```

## How to publish to NPM
### Build the project

```
npm run build
```

### Login into NPM

Build the project first.  
After that run the following commands:

```
cd build/node_modules/PACKAGE_NAME
npm login
npm publish
```

Once the process finish, take a look to the NPM site:   

https://www.npmjs.com/package/PACKAGE_NAME

## Javascript and React related documents

Take a look to this nice documentation pages to be more familiar with React and modern Javascript:

### Official site
https://reactjs.org/docs/getting-started.html   

### Google Web Fundamentals (the whole site is a must to read)
https://developers.google.com/web/fundamentals/

### Webpack as magic bundler
https://webpack.js.org/

### Composing Software series (how to understand Funcional Programming)
https://medium.com/javascript-scene/composing-software-an-introduction-27b72500d6ea   

### Common React patterns
https://reactpatterns.com   

### Understanding Storybook with nice images
https://blog.hichroma.com/the-delightful-storybook-workflow-b322b76fd07   

### Some guidelines for clean code
https://americanexpress.io/clean-code-dirty-code/

