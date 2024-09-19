import { getHeader } from './html';
const POKEMON_API = "https://pokeapi.co/api/v2/pokemon/";
const POKEMON_IMG = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";
const POKEMON_FORM = "https://pokeapi.co/api/v2/pokemon-form/";
const POKEMON_SPEZIES = "https://pokeapi.co/api/v2/pokemon-species/";
const colours = {   normal: '#A8A77A',   fire: '#EE8130',    water: '#6390F0',
                    electric: '#F7D02C', grass: '#7AC74C',   ice: '#96D9D6',
                    fighting: '#C22E28', poison: '#A33EA1',  ground: '#E2BF65',
                    flying: '#A98FF3',   psychic: '#F95587', bug: '#A6B91A',
                    rock: '#B6A136',     ghost: '#735797',   dragon: '#6F35FC',
                    dark: '#705746',     steel: '#B7B7CE',   fairy: '#D685AD',
};
let pokemonInfoSwitch = 0;
const stats = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];

async function init() {

    getHeader();
    document.getElementById('main').innerHTML = /*html*/`
        <div id="main_content" class="main_content"></div>  
    `;
    showPokemons();

    //showDetailedCard();
}
