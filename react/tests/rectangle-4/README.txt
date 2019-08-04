This rendition is going to focus on interactions with a single ball;
The idea is to squish balls between rectangle and wall;
The idea is to update the rectangle without updating the ball:
	Before, when we did an "OnUpdate", the balls significantly 
	slowed down the rendering of the rectangle;
	Hoping to have this fixed this time;

Next Step:
	More rectangle + ball interactions;;

Status:
	Working:
		Single ball is being created:	
			Legality of ball is being checked to stay in view;
			Legality of ball is being checked to not overlap rectangle;
		Single ball is moving;
		Single ball is moving according to rectangle influence;
		Single ball is being moved with the window:	
			ball is being squished;
		Rectangle moving the ball out of the way;
		Rectangle is prevented from moving:
			Movement dependent on balls ability to move;
		Rectangle completely forbidden to Overlap ball:
			Still some occasional bugs, but we are able to allow
			user to fix the situation;

	Bugs:
		Ball ontop of rectangle is buggy;
		Ball is being squished for no reason by screen size changes;
		Ball acceleration is happening to much;
