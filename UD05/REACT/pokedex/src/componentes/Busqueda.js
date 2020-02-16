import React, { Component } from 'react';
import Listado from './Listado';

export default class Busqueda extends Component {

    constructor(props) {

        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            allPokemons: [],
            datosPokemons: [],
            pokemons: []
            
        };
    }

    componentDidMount() {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        allPokemons: result.results
                    });

                    result.results.forEach(element => {
                        fetch(element.url)
                            .then(res => res.json()).then(
                                (result) => {
                                    this.setState({
                                        datosPokemons: this.state.datosPokemons.concat(result)
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

    filtrarPokemons = (e) => {
        this.setState({
            pokemons: this.state.datosPokemons.filter(pokemon => pokemon.name.includes(e.target.value))
        })
    }

    render() {
        return (
            <div className="busqueda">
                <h1>PokeDex</h1>
                <form id="busquedaform">
                    <input type="text" name="calle" onChange={this.filtrarPokemons} />
                </form>
                <Listado pokemons={this.state.pokemons} />

            </div>

        );
    }
}
