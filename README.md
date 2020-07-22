# @cdxoo/omit

Creates shallow copy of a given object with the specified attributes removed.

## Installation

    npm install --save @cdxOo/omit

## Usage

```
const omit = require('@cdxoo/dbscan');

let A = omit(
    [ 'a', 'c' ],
    { a: 1, b: 2, c: 3, d: 4 }
);
// => { b: 2, d: 4 }

let B = omit(
    {
        a: (value) => ( value < 2 ),
        c: true
    },
    { a: 1, b: 2, c: 3, d: 4 }
)
// => { b: 2, d: 4 }

let C = omit(
    (value, key) => ( value === null ),
    { a: 1, b: null, c: 3, d: null }
);
// => { a: 1, c: 3 }

let D = omit('a', { a: 1, b: 2 });
// => { b: 2 };
// this style only works for on a single attribute though
```
