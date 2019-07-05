'use strict';

function Blog(props) {
	const sidebar = (
		<ul>
			{props.posts.map((post) =>
				<li key={post.id}>
					<a href={post.href}>
						{post.title}
					</a>
				</li>
			)}
		</ul>
	);
	const content = props.posts.map((post) =>
		<div key={post.id}>
			<h3>{post.title}</h3>
			<p>{post.content}</p>
		</div>
	);
	return (
		<div>
			{sidebar}
			<hr />
			{content}
		</div>
	);
}

const posts = [
	{
		id: 1, 
		
		title: 'Hello World', 
		content: 'Welcome to learning React!',
		href:'#'
	},
	{
		id: 2, 
		title: 'Installation', 
		content: 'You can install React from npm.',
		href:'#'
	}
];
ReactDOM.render(
	<Blog posts={posts} />,
	document.getElementById('blog_nav_example')
);
