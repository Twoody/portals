'use strict';

function makeTag(tag, src, args){
	console.log(src);
	let ret		= "<" + tag;
	let content	= "";
	const keys	= src.keys();
	for (let i=0; i<src.length; i++){
		const key	= keys[i];
		const value	= src[key];
		if (key === "content")
			content	= value;
		else
			ret	= " " + key+"=\""+value+"\"";
	}//end i-for
	ret += content;
	return ret;
}

const pages	= [
	"hello-world-1",
	"hello-world-2",
	"hello-world-3",
	"clock-1",
	"props-example-1",
	"props-example-2",
	"states-1",
];
const links	= pages.map(
	(page) => makeTag('a', {'href':page, 'content':page}, {})
);
const listLinks	= links.map(
	(link) => <li>{link}</li>
);
console.log(links);
ReactDOM.render(
	<ul>{listLinks}</ul>,
	document.getElementById('react-tutorial-nav')
);
