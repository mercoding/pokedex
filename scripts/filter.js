import { getCard } from "./html.js";
import { colours, POKEMON_API } from "./main.js";
import { getColor, getPokemonImg, getPokemonName, showGroups, showPokemons } from "./pokedexapi.js";

export async function getPokemonData() {
    try {
        const response = await fetch(POKEMON_API + '?limit=150');
        const data = await response.json();
        return data.results;
    }
    catch(error) {
        console.error('Error cannot reach Pokemon data')
    }
}


export function filterPokemon(pokemonList, searchTerm) {
    return pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
}


export async function displayFilteredPokemon(searchTerm) {
    const pokemonList = await getPokemonData();
    const filteredPokemon = filterPokemon(pokemonList, searchTerm);
    console.log('Gefiltertes Pokemon: ', filteredPokemon);
}


export async function getFilteredPokemon(searchTerm) {
    const pokemonList = await getPokemonData();
    const filteredPokemon = filterPokemon(pokemonList, searchTerm);
    return filteredPokemon;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export async function showFilteredPokemons(searchTerm) {
    const pokemonList = await getFilteredPokemon(searchTerm)
    for (let index = 0; index < pokemonList.length; index++) {
        let str = pokemonList[index].url.split('/');
        let id = str[str.length - 2];
        
        if(document.getElementById(`card${id}`) === null) {
            await setPokemonCard(id);
        }
    }
}


async function setPokemonCard(id) {
    let img_src = await getPokemonImg(id);
    let name = await getPokemonName(id);
    document.getElementById('main_content').innerHTML += getCard(img_src, id, name);
    let color = await getColor(id);
    if(document.getElementById(`card${id}`) != null) {
        document.getElementById(`card${id}`).style.backgroundColor = colours[color];
        await showGroups('card', id);
    }
}


export function filter() {
    let searchTerm = document.getElementById('search').value;
    if(searchTerm.length < 3) return;
    if(searchTerm !== '') {
        document.getElementById('pokemonIndexInput').value = '';
        document.getElementById('main_content').innerHTML = '';
        showFilteredPokemons(searchTerm);
    }
    else {
        //document.getElementById('pokemonIndexInput').value = '';
        showPokemons();  
    }
}


window.filter = filter;