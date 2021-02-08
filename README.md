## Overview

A library to convert object's keys from came case to snake case and vice versa.

## Install

```@animalcase-js/core``` can be used to manually convert keys.

```bash
npm i --save @animalcase-js/core
```

```@animalcase-js/express``` a  middleware for express.js

```bash
npm i --save @animalcase-js/express
```



## Usage

```js
const caseconvert = require('@animalcase-js/core')

const myObject = {
  propA: 1,
  propB: 2,
  myPropC: 'Hi'
}

caseconvert.convertToSnakeCase(myObject)

console.log(myObject)
```

should display

```bash
{
  prop_a: 1,
  prop_b: 2,
  my_prop_c: 'Hi'
}
```
