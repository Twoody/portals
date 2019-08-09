This rendition is going to focus on first bug fixes.
Focus will then shift to adding multiple balls;
Also need to make sure arrow movements align with rectangleDrag() and click;

Next Step:
	Fix some stuff with the rectangle:
		Friction variable and friction control:
			Right now our rectangle is acting like velcro...
	Screen adjustements for height;
	Making our clickable ball icons dynamic and appropriate if the ball gets smushed;
	Go through and shrink balls if there is a collision that cannot be solved;

	Work on changing the php template to better incorporate the canvas:
		We are goign to want the canvas to take up the whole page eventually;
		The begining steps to this are going to be getting rid of the footer
		and title;
	Work on making this a single page application with zoom and focus:
		When a ball is clicked, take that ball out of the equation,
		move ball to top left of screen, and expand whatever contents is has;
		This will be an extensions of Balls() like ClickableBall() is;


Status:
	Working:
		Balls with hrefs are opening new window;
		Balls with new functions working;
		Better width and height;
		Toggle Buttons instead of checkboxes;

	Not Working:
		Rectangle and drag is happening with illegal movement:
			Not moving, but accelerating balls;
		Rectangle drag is not moving to a possible coordinate as much as it 
			is just jumping there;
	Bugs:
		Ball is being squished for no reason by screen size changes;
