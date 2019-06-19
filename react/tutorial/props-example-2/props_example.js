'use strict';

function Welcome(props) {
  return React.createElement(
    "h1",
    null,
    "Hello, ",
    props.name
  );
}

function App() {
  return React.createElement(
    "div",
    null,
    React.createElement(Welcome, { name: "Betsy" }),
    React.createElement(Welcome, { name: "Tanner" }),
    React.createElement(Welcome, { name: "Pets" })
  );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('props-example'));