import React from 'react';
import './App.css';

function App() {

  return (
    <div className="App">
      <h1>TODO</h1>
      <Listado />
    </div>
  );
}


class Listado extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      pokemons: []
    };
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon-form?limit=900")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results
          });

          result.results.forEach(element => {

            fetch(element.url).then(res => res.json()).then(

              (result) => {
                this.setState({
                  pokemons: [...this.state.pokemons, result]

                });
              
                
              }
            )
          });



        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, pokemons, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

        <div>
          {
            
            items.forEach(
              item => {
                {console.log(item)}
              }
            ),

            pokemons.map((item, i) => (
              <div key={item.name} className="card">
              <img src={item.sprites.front_default} alt={item.name} />
              <div  className="container">
              <h4><b>{item.name}</b></h4>
              
              </div>
              </div>
            ))
          }
        </div>
      );
    }
  }
}

export default App;
