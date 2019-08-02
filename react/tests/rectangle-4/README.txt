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
	Not working:
		ball is not being squished;
		ball is not rolling out of the way;
		rectangle is able to overlap ball;
		Have rectangle move the ball out of the way;
		If Ball is stuck between the rectangle and wall and cannot go in the other two 
			directions available, squish ball;
	Bugs:
		Ball ontop of rectangle is buggy;
