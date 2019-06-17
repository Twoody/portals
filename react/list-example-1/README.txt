Author:
	Tanner.L.Woody@gmail.com
	2019-06-11

Links:
	https://reactjs.org/docs/add-react-to-a-website.html

Purpose:
	Demonstrate a single page application of general react usage of jsx and babel;

Steps:
	Create a src/ dir in directory of desired jsx;
	Make file foo.js with render of jsx;
	run:
		npx babel --watch src --out-dir . --presets react-app/prod 
	cntlr+C out of the command;
	There should now be a foo.js below src/

Notes:
	"""
		When React sees an element representing a user-defined component, 
		it passes JSX attributes to this component as a single object. 
		We call this object “props”.
	"""

	"All React components must act like pure functions with respect to their props."

	The way to modify the content on the display it to make new instances and replenish the 
	state of the react element

	Lots of good stuff to remember at:
		https://reactjs.org/docs/state-and-lifecycle.html
