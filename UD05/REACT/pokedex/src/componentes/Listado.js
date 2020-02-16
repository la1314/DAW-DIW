import React, {Component} from 'react';

export default class Listado extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            pokemons: [],
            datos: []
            
        };
    }

    componentDidMount() {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=25")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        pokemons: result.results
                    });

                    result.results.forEach(element => {
                        fetch(element.url)
                            .then(res => res.json()).then(
                                (result) => {
                                    this.setState({
                                        datos: this.state.datos.concat(result)
                                    });
                                })
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
        const { error, isLoaded, pokemons, datos } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                console.log(datos),
                
                <div>
                    {
                        pokemons.map((item, i) => (
                            <div key={item.name} className="card">
                                {/* <img src={item.sprites.front_default} alt={item.name} /> */}
                                <div className="container">
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
