'use strict';

var pages = [{ title: "hello-world-1", path: "../hello-world-1/index.php" }, { title: "hello-world-2", path: "../hello-world-2/index.php" }, { title: "hello-world-3", path: "../hello-world-3/index.php" }, { title: "clock-1", path: "../clock-1/index.php" }, { title: "props-example-1", path: "../props-example-1/index.php" }, { title: "props-example-2", path: "../props-example-2/index.php" }, { title: "states-1", path: "../states-1/index.php" }];
var listPages = pages.map(function (page) {
	return React.createElement(
		"li",
		null,
		React.createElement(
			"a",
			{ href: page.path },
			page.title
		)
	);
});
ReactDOM.render(React.createElement(
	"ul",
	null,
	listPages
), document.getElementById('react-tutorial-nav'));