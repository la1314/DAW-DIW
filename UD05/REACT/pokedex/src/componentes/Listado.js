import React, { Component } from 'react';

export default class Listado extends Component {

    render() {
        return (


            <div>
                {
                    this.props.pokemons.map((item, i) => (
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
