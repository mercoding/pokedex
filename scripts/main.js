import { displayFilteredPokemon, showFilteredPokemons, filter } from './filter.js';
import './html.js';
import { getFooter, getHeader, setPokemonEvoChain, setPokemonMain, setPokemonStats } from './html.js';
import './pokedexapi.js';
import { getEvoChain, getPokemon, parseEvoChainToArray, showDetailedCard, showPokemons } from './pokedexapi.js';
export const POKEMON_API = "https://pokeapi.co/api/v2/pokemon/";
export const POKEMON_IMG = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";
export const POKEMON_FORM = "https://pokeapi.co/api/v2/pokemon-form/";
export const POKEMON_SPEZIES = "https://pokeapi.co/api/v2/pokemon-species/";
export const colours = {   normal: '#A8A77A',   fire: '#EE8130',    water: '#6390F0',
                    electric: '#F7D02C', grass: '#7AC74C',   ice: '#96D9D6',
                    fighting: '#C22E28', poison: '#A33EA1',  ground: '#E2BF65',
                    flying: '#A98FF3',   psychic: '#F95587', bug: '#A6B91A',
                    rock: '#B6A136',     ghost: '#735797',   dragon: '#6F35FC',
                    dark: '#705746',     steel: '#B7B7CE',   fairy: '#D685AD',
};
export let pokemonInfoSwitch = 0;
export const stats = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];

async function init() {

    getHeader();
    document.getElementById('main').innerHTML = /*html*/`
        <div id="main_content" class="main_content"></div>  
    `;
    showPokemons();
    getFooter();

    //showDetailedCard();
}


export function closeDetailedCard() {

    document.querySelector('.overlay').style.display = 'none';
}


export function switchPokemonInfo(tab, num) {
    pokemonInfoSwitch = tab;
    showDetailedCard(num);
}


export function setDetailedCardCloseListener() {
    window.addEventListener('mouseup',function(event){
        let card = document.getElementById('detailedCard');
        if(event.target != card && event.target.parentNode != card){
            document.getElementById('overlay').style.display = 'none';
        }
    });  
}

export async function showDetails(card, num) {
    let id = card + '-description';
    let pokemon = await getPokemon(num);
    let evo_chain = await getEvoChain(num);
    let evoChain = await parseEvoChainToArray(evo_chain);
    document.querySelector('.card-tabs > div').classList.remove('underline-grid');
    switch (pokemonInfoSwitch) {
        case 0:
            document.getElementById(id).innerHTML = setPokemonMain(pokemon);
            document.getElementById('p_main_info').classList.add('underline-grid');
            break;
        case 1:
            document.getElementById(id).innerHTML = setPokemonStats(pokemon);
            document.getElementById('p_stat_info').classList.add('underline-grid');
            break;
        case 2:
            document.getElementById(id).innerHTML = await setPokemonEvoChain(evoChain);
            document.getElementById('p_evo_chain').classList.add('underline-grid');
            break;
    }

}


window.init = init;
window.switchPokemonInfo = switchPokemonInfo;
