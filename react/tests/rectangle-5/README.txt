This rendition is going to focus on first bug fixes.
Focus will then shift to adding multiple balls;
Also need to make sure arrow movements align with rectangleDrag() and click;

Next Step:
	Bug Fixes;

Status:
	Working:
		Arrows to mimic drag & refractoring to Rectangles.js;
		Ball on top of rectangle is being given friction:
			Persistent bug such that the ball is not stopping
			vertical bouncing;
		Multiple balls are behaving somewhat accordingly;
		MAX_SPEED;
		No overlap when initialized;
		Balls are sliding off of eachother depedant on their sizes;
		All states and option pulled over from ../slanted-1/src/
		Showing ball cnt;
		Multiple balls working;
		New ball on mouse up problem solved:
			Bug was because of us making a random ball, and then
			not updating its next coordinates;
	Not Working:
	Bugs:
		Ball is being squished for no reason by screen size changes;
