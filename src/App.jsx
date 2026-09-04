

const App = () => {

  //onClick event handler
  const onChange = () => {
    alert('Hello World')
  }

  //sum
  const sum = (a, b) => {
    return a + b
  }

  return (
    <div>
      <h1>My First React App</h1>
      <button onClick={() => alert('Sum is: ' + sum(5, 10))}>Sum</button>
      <button onClick={onChange}>Click </button>
    </div>
  );
};

export default App;