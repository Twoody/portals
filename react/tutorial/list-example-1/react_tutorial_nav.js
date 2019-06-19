'use strict';

function makeTag(tag, src, args) {
	console.log(src);
	var ret = "<" + tag;
	var content = "";
	var keys = src.keys();
	for (var i = 0; i < src.length; i++) {
		var key = keys[i];
		var value = src[key];
		if (key === "content") content = value;else ret = " " + key + "=\"" + value + "\"";
	} //end i-for
	ret += content;
	return ret;
}

var pages = ["hello-world-1", "hello-world-2", "hello-world-3", "clock-1", "props-example-1", "props-example-2", "states-1"];
var links = pages.map(function (page) {
	return makeTag('a', { 'href': page, 'content': page }, {});
});
var listLinks = links.map(function (link) {
	return React.createElement(
		"li",
		null,
		link
	);
});
console.log(links);
ReactDOM.render(React.createElement(
	"ul",
	null,
	listLinks
), document.getElementById('react-tutorial-nav'));