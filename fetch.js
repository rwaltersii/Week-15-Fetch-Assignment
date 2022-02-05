function App() {
  //Loads the React Hooks
  const { useState, useEffect } = React;
  //Loads the Bootstrap Container
  const { Container } = ReactBootstrap;
  //Sets the state for when Loading
  const [isLoading, setIsLoading] = React.useState(false);
  //Sets the state for errors
  const [isError, setIsError] = useState(false);
  //Sets the state for the data
  const [data, setData] = useState("");
  //Sets the state for the url address
  const [url, setUrl] = useState(
    "https://zoo-animal-api.herokuapp.com/animals/rand"
  );

  //This will load the page on the first load and will not run again
  useEffect(() => {
    getData();
  }, []);

  //This will getData (once on load call by useEffect and then when the user clicks the button)
  //Once the data is received, it will update the state of data
  const getData = () => {
    setIsLoading(true);
    try {
      axios.get(url).then((response) => {
        setData(response.data);
      });
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <Container class="container">
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <h2>
          {data.name} : {data.animal_type}
        </h2>
      )}
      <img src={data.image_link} />
      <div>
        <button
          onClick={getData}
          type="button"
          class="vertical-center btn btn-secondary"
        >
          Next Animal
        </button>
      </div>
    </Container>
  );
}
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));
