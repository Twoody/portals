Attempt is to move all ball components over here and have a working
example of our past product in a full create-react-app enviornmnet;

First, we will be just doing a simpler build to see if we can get
that to work properly.
For that, I have chosen `ball-pen-3/` (referenced as `dirToCopy`).

The first thing to note is that we have javascript classes that are 
a fundamental part of the design for the project design;

The second thing to note is that we have one main component defined
as `BallPen`. In this case, I am finally making the changes from 
'ball-pen-*' and all of the other dir names to a BallPen.jsx,
which is somethign that I wanted to do from the begining but 
without this being bootstrapped with create-react-app, I never got
around to it properly.

Thus, we have two main changes to incorporate to get the bootstrapped
create-react-app to work with our previous project. We also have to
take several steps to get this over properly.

1. Let our working directory be ./react-src/
2. `touch src/BallPen.jsx`
3. `touch src/Ball.js`
4. copy BallPen class from .../dirToCopy/src/ball-pen-3.js
5. Add import statements to BallPen.jsx:
		import React, { Component } from "react";
		import { Ball } from "./Ball.js";
6. Append an export clause after the end of the class:
		export default BallPen;
7. copy Ball class  from .../dirToCopy/src/ball-pen-3.js
8. Add an `export` before the class name:
		`class Ball(`  -->  `export class Ball{`
9. `npm run build` and follow copy steps;

This appears to be working:
	http://www.example.com/react/tests/react-pen-1/

Next steps:
	init react-pen-2 with latest components from /rectangle-7/
		

