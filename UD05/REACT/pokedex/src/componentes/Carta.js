import React, { Component } from 'react';
import axios from 'axios';

export default class Carta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descripcion: null,
            pokemon: this.props.pokemon
        };
    }
 
    async componentDidMount() {

        const res = await axios.get(this.state.pokemon.species.url);
        const descripcion = res.data.flavor_text_entries.filter(entrada => entrada.language.name === 'es')
        
        this.setState({
            descripcion: descripcion[0].flavor_text,

        });
         
    }

    render() {

        const {descripcion, pokemon} = this.state
        return (

            <div className='carta'>
                <div className='cartaHead'>
                    <div>
                        <div className='namePokemon'>{pokemon.name}</div>
                        <div className='number'>{pokemon.id}</div>
                    </div>
                </div>
                <div className='cartaBody'>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <div>
                        <div className='descripcion'>{descripcion}</div>
                        <div className='estadisticas'>{}</div>
                    </div>
                </div>
                <div className='cartaFoot'>
                    <div className='puntos'>{}</div>
                    <div>
                        <div className='tipo'>
                            {
                                pokemon.types.map(
                                    tipo => <div key={tipo.type.name+"_key"} >{tipo.type.name}</div>
                                )
                            }
                        </div>
                        <div className='debilidad'>
                            {
                                pokemon.types.map(
                                    tipo => <div>{tipo.type.name}</div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
