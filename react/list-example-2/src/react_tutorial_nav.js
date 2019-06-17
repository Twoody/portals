'use strict';

const pages	=[
	{title: "hello-world-1"		, path: "../hello-world-1/index.php"},
	{title: "hello-world-2"		, path: "../hello-world-2/index.php"},
	{title: "hello-world-3"		, path: "../hello-world-3/index.php"},
	{title: "clock-1"				, path: "../clock-1/index.php"},
	{title: "props-example-1"	, path: "../props-example-1/index.php"},
	{title: "props-example-2"	, path: "../props-example-2/index.php"},
	{title: "states-1"			, path: "../states-1/index.php"},
];
const listPages	= pages.map(
	(page) => <li><a href={page.path}>{page.title}</a></li>
);
ReactDOM.render(
	<ul>{listPages}</ul>,
	document.getElementById('react-tutorial-nav')
);
