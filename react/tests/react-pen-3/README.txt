Attempt is to move all ball components over here and have a working
example of our past product in a full create-react-app enviornmnet;

1. Let our working directory be ./react-src/
2. `touch src/BallPen.jsx`
3. `touch src/Ball.js`
4. copy BallPen class from .../dirToCopy/src/rectangle_7.js
5. Add import statements to BallPen.jsx:
		import React, { Component } from "react";
		import { Ball } from "./Ball.js";
6. Append an export clause after the end of the class:
		export default BallPen;
7. copy Ball class  from .../dirToCopy/src/ball-pen-3.js
8. Add an `export` before the class name:
		`class Ball(`  -->  `export class Ball{`
9. `npm run build` and follow copy steps;

This DOES NOT appear to be working:
	http://www.example.com/react/tests/react-pen-2/


