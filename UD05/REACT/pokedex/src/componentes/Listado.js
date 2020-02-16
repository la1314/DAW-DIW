import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Carta from './Carta';

export default class Listado extends Component {

    showCard = (datos) => {

        let contenedor = document.getElementById('CartaFlotante');
        ReactDOM.unmountComponentAtNode(contenedor);
        let carta = <Carta pokemon={datos} />;
          
        ReactDOM.render(carta, contenedor)
    }

    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    formatWeight = (str) => {

        return (str / 10) + " Kg";
    }

    render() {
        const pokemons = this.props.pokemons;
        return (

            <div id='patata' className='contenedor'>
                {
                    pokemons.map((item) => (
                        <div key={item.name} className="cartas" >
                            <img src={item.sprites.front_default} alt={item.name} />
                            <div className="datos">
                                <h4><b>{this.capitalize(item.name)}</b></h4>
                                <h4><b>{this.formatWeight(item.weight)}</b></h4>
                            </div>
                            <button onClick={() => this.showCard(item)}>Consultar Datos</button>

                        </div>

                    ))
                }
            </div>
        );

    }
}
