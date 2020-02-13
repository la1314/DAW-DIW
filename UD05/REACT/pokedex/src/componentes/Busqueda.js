import React, { Component } from 'react';

export default class Busqueda extends Component {

    /*  constructor(props) {
         super(props);
         this.state = {
             error: null,
             isLoaded: false,
             pokemons: [],
             datos: []
         };
     } */

    render() {
        return (

            <div className="busqueda">
                <form id="busquedaform">
                    <input type="text" name="calle" />
                    <input type="button" value="Buscar" />
                </form>
            </div>

        );
    }
}
