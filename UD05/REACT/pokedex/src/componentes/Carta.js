import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Carta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descripcion: null,
            pokemon: this.props.pokemon,
            tipos: [],
            habilidades: [],
            descripcionHabilidades: [],
            estadisticas: []
        };
    }

    async componentDidMount() {

        const { pokemon } = this.state;

        await this.cargarDescripcion(pokemon.species.url);
        await pokemon.types.map(tipo => {
            this.cargarTipos(tipo.type.url)
        });

        await pokemon.abilities.map(item => {
            this.cargarHabilidades(item.ability.url);
        })

        await pokemon.stats.map(item => {
            this.cargarEstadisticas(item.stat.url, item.base_stat);
        })

    }

    //Carga de forma asincrona al estado descripcion la traducción al español de la descripcion del pokemon
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

    //Carga de forma asincrona al estado habilidades y descricionHabilidades la traducción al español de las habilidades del pokemon
    cargarHabilidades = async (url) => {

        const res = await axios.get(url);
        const habilidad = res.data.names.filter(item => item.language.name === 'es')
        const descripcion = res.data.flavor_text_entries.filter(item => item.language.name === 'es')

        this.setState({
            habilidades: this.state.habilidades.concat(habilidad[0].name),
            descripcionHabilidades: this.state.descripcionHabilidades.concat(descripcion[0].flavor_text)
        });
    }

    cargarEstadisticas = async (url, puntos) => {

        const res = await axios.get(url);
        const estadisticas = res.data.names.filter(item => item.language.name === 'es')
        let estadistica = {
            "name": estadisticas[0].name,
            "point": puntos
        };

        this.setState({
            estadisticas: this.state.estadisticas.concat(estadistica),
        });

        console.log(this.state.estadisticas);
        
    }

    //Cuando es llamado desmonta el contenedor de la Carta
    closeCard = () => {

        let contenedor = document.getElementById('CartaFlotante');
        ReactDOM.unmountComponentAtNode(contenedor);
    }

    mostrarHabilidades = (item, descripcion) => {

        return (
            <div>
                <div>{item}</div>
                <div>{descripcion}</div>
            </div>
        )
    }

    
    mostrarEstadisticas = (name, points) => {
        console.log(name + ' - ' + points);
        
        return (
            <div>
                <div>{name}</div>
                <div>{points}</div>
            </div>
        )
    }

    render() {

        const { descripcion, pokemon, tipos, habilidades, descripcionHabilidades, estadisticas } = this.state
        return (

            <div className='carta' key={pokemon.name + "_poke"} >
                <button className='cerrarMapa' onClick={() => this.closeCard()} >X</button>

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
                    <h3>Habilidades</h3>
                    {

                        habilidades.map((item, index) =>
                            <div key={item}>{this.mostrarHabilidades(item, descripcionHabilidades[index])}</div>
                        )
                    }
                </div>

                <div className='cartaFoot'>
                    <div className='puntos'>
                    <h3>Estadisticas</h3>
                        {
                           estadisticas.map(tipo =>
                            <div key={tipo.name}>{this.mostrarEstadisticas(tipo.name, tipo.point)}</div>
                            )
                        }
                    </div>
                    <div>
                        <div className='tipo'>
                            <h3>Tipo</h3>
                            {
                             tipos.map(tipo => <div key={tipo+'_'} >{tipo}</div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
