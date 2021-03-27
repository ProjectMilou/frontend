# Milou Frontend

[![Netlify Status](https://api.netlify.com/api/v1/badges/781c3fd7-2a90-420c-8139-0f7abaad5b95/deploy-status)](https://kind-clarke-29dd44.netlify.app/)
[![Deployment](https://github.com/ProjectMilou/frontend/actions/workflows/s3-deploy.yml/badge.svg?branch=main)](http://poject-milou-frontend.s3-website.eu-central-1.amazonaws.com/)  
[![Lint Code Base](https://github.com/ProjectMilou/frontend/actions/workflows/linter.yml/badge.svg)](https://github.com/ProjectMilou/frontend/actions/workflows/linter.yml)
[![Test code](https://github.com/ProjectMilou/frontend/actions/workflows/run-tests.yml/badge.svg)](https://github.com/ProjectMilou/frontend/actions/workflows/run-tests.yml)

This project was bootstrapped with [Create React App](https://create-react-app.dev/).

## For all the frontend teams:

- **You need yarn!** To install dependencies and work on the project make sure you have [yarn](https://yarnpkg.com/) installed and set up.
- This is a TypeScript project, please make sure to type all your variables and don't use `any`.
- The code style here is governed by prettier and is enforced via a pre commit hook, that formats your code when committing. Look up you editor integrations [here](https://prettier.io/docs/en/editors.html).
- This project uses eslint to catch common mistakes, look up how to enable reporting of the results in your editor.
- We are using the `@reach/router` to handle navigation in the app, check their [documentation](https://reach.tech/router/tutorial/01-intro) to get familiar.
- Please make yourself familiar with writing tests and supply them in your code if you want to get it merged. There's some good starting points [here](https://create-react-app.dev/docs/running-tests).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn format`

Formats all the staged code with `prettier`.\
Make sure that the code you want to format is staged on git before running.

### `yarn lint`

Runs `eslint` on source and test files.

### `yarn prettier-check`

Runs `prettier` to check for code style violations.

### `yarn prettier-fix`

Runs `prettier` to fix code style.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Styles

The project uses Material-UI's styling solution for components (see the [documentation](https://material-ui.com/styles/basics/)).

For example, a functional component can be styled using hooks:

```tsx
import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: { 'font-weight': 'bold' },
});

const Example: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.root}>Hello world!</div>;
};

export default Example;
```

## i18n

Locales are defined in [src/locales/en.json](./src/locales/en.json) like this:

```json
{
  "helloworld": "Hello world!"
}
```

Using translations:

```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Example: React.FC = () => {
  const { t } = useTranslation();
  return <div>{t('helloworld')}</div>;
};

export default Example;
```

Also see the [react-18next documentation](https://react.i18next.com/).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
