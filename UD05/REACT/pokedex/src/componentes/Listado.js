import React, { Component } from 'react';

export default class Listado extends Component {

    mostarCarta = (pokemon) => {

        console.log(pokemon);  

    }

    render() {
        return (
            <div className='contenedor'>
                {
                    this.props.pokemons.map((item, i) => (
                        <div key={item.name} className="cartas" onClick={()=>this.mostarCarta(item)} >
                            <img src={item.sprites.front_default} alt={item.name} />
                            <div className="datos">
                                <h4><b>{item.name}</b></h4>
                            </div>
                        </div>
                    ))
                }
            </div>
        );

    }
}
