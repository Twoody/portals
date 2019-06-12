'use strict';
const e = React.createElement;
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

	return (
		<button onClick={() => this.setState({ liked: true })}>
			Like
		</button>
);
  }
}

const domContainer = document.querySelector('#hello_world_container');
ReactDOM.render(e(HelloWorld), domContainer);
