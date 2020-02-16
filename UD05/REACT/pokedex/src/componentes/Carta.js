import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Carta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descripcion: null,
            pokemon: this.props.pokemon,
            tipos: []
        };
    }

    async componentDidMount() {

        const { pokemon } = this.state;

        await this.cargarDescripcion(pokemon.species.url);
        await pokemon.types.map(tipo => {
            this.cargarTipos(tipo.type.url)
        });


    }

    cargarDescripcion = async (url) => {

        const res = await axios.get(url);
        const descripcion = res.data.flavor_text_entries.filter(entrada => entrada.language.name === 'es')
        this.setState({
            descripcion: descripcion[0].flavor_text,
        });
    }

    //Carga de forma asincrona al estado tipos la traducción al español del tipo de pokemon
    cargarTipos = async (url) => {

        const res = await axios.get(url);
        const tipo = res.data.names.filter(type => type.language.name === 'es')

        this.setState({
            tipos: this.state.tipos.concat(tipo[0].name)
        });
    }

    //Cuando es llamado desmonta el contenedor de la Carta
    closeCard = () => {

        let contenedor = document.getElementById('CartaFlotante');
        ReactDOM.unmountComponentAtNode(contenedor);
    }

    render() {

        const { descripcion, pokemon, tipos } = this.state
        return (

            <div className='carta' id={pokemon.name + "_poke"} >
                <button onClick={() => this.closeCard()} >X</button>
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
                <div className='Habilidades'>



                </div>
                <div className='cartaFoot'>
                    <div className='puntos'>{}</div>
                    <div>
                        <div className='tipo'>
                            {
                                tipos.map(
                                    tipo => <div key={tipo + "_key"} > {tipo} </div>
                                )
                            }
                        </div>
                        <div className='debilidad'>
                            {
                                /* pokemon.types.map(
                                     tipo => <div>{tipo.type.name}</div>
                                 )*/
                            }
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
