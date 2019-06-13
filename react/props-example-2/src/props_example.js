'use strict';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Betsy" />
      <Welcome name="Tanner" />
      <Welcome name="Pets" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('props-example')
);

