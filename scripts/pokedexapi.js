import { getCard, getDetailedCard } from './html.js';
import './main.js';
import { colours, POKEMON_API, POKEMON_FORM, POKEMON_IMG, setDetailedCardCloseListener, showDetails } from './main.js';

export async function getPokemonGroup(pokemon) {
    let response = await fetch(POKEMON_FORM + pokemon);
    let responseToJson = await response.json();
    let groups = responseToJson.types;
    if (response.ok) return groups;
    return "Error - Pokemon not found";
}


export async function getColor(pokemon) {
    let response = await fetch(POKEMON_FORM + pokemon);
    let responseToJson = await response.json();
    let name = responseToJson.types[0].type.name;
    if (response.ok) return name;
    return "Error - Pokemon not found";
}


export async function getPokemonName(pokemon) {
    let response = await fetch(POKEMON_API + pokemon);
    let responseToJson = await response.json();
    let name = responseToJson.name.charAt(0).toUpperCase() + responseToJson.name.slice(1);
    if (response.ok) return name;
    return "Error - Pokemon not found";
}


export async function getPokemon(pokemon) {
    let response = await fetch(POKEMON_API + pokemon);
    let responseToJson = await response.json();
    if (response.ok) return responseToJson;
    return "Error - Pokemon not found";
}


export async function getPokemonImg(pokemon) {
    let response = await fetch(POKEMON_API + pokemon);
    if (response.ok) return POKEMON_IMG + pokemon + '.svg';
    return 'Error - file not found'
}

export async function showGroups(card, num) {
    let id = card + num + '_groups';
    let query = document.getElementById(id);
    query.innerHTML = '';
    let group = await getPokemonGroup(num);
    group.forEach(element => {
        query.innerHTML += /*html*/`
             <div class="icon ${element.type.name}">
                <img src="./icons/${element.type.name}.svg"/>
            </div>
        `;
    });
}


function checkIndexInput() {
    let pokemonIndexInput = document.getElementById('pokemonIndexInput').value;
    let clearStr, split = [], start, end; 
    if(pokemonIndexInput.length > 2 && pokemonIndexInput.includes('/')) {
        clearStr = pokemonIndexInput.replaceAll(' ', '');
        split = clearStr.split('/');
        start = parseInt(split[0]), end = parseInt(split[1]);
        if(start < 1 || start > 1025) start = 1;
        if(end < start || end < 2 || end > 1025 || end === '') end = start + 4;   
    }
    else {
        start = 1, end = 5;
    }
    split[0] = start;
    split[1] = end;
    return split; 
}


export async function showPokemons() {
    let range = checkIndexInput();
    document.getElementById('main_content').innerHTML = '';

    for (let index = range[0]; index <= range[1]; index++) {
        let img_src = await getPokemonImg(index);
        let name = await getPokemonName(index);
        document.getElementById('main_content').innerHTML += getCard(img_src, index, name);
        let color = await getColor(index);
        document.getElementById(`card${index}`).style.backgroundColor = colours[color];
        await showGroups('card', index);
    }
}


export async function getEvoChainUrl(pokemon) {
    let responsePokemon = await getPokemon(pokemon);
    let response = await fetch(responsePokemon.species.url);
    let responseToJson = await response.json();
    let evo_chain_url = responseToJson.evolution_chain.url
    if (response.ok) return evo_chain_url;
    return "Error - Unknown evo chain url";
}


export async function getEvoChain(pokemon) {
    let response = await fetch(await getEvoChainUrl(pokemon));
    let responseToJson = await response.json();
    if (response.ok) return responseToJson;
    return "Error - Unknown evo chain";
}


export async function showDetailedCard(num) {
    document.querySelector('.overlay').style.display = 'flex';
    let wrapper = document.getElementById('overlay');
    let img_src = await getPokemonImg(num);
    let name = await getPokemonName(num);
    wrapper.innerHTML = getDetailedCard(img_src, num, name);
    setDetailedCardCloseListener();
    let color = await getColor(num);
    document.getElementById(`detailed-card${num}`).style.backgroundColor = colours[color];
    await showGroups('detailed-card', num);
    await showDetails('detailed-card', num);
}


export async function parseEvoChainToArray(evo_chain) {
    let evoChain = [];
    let evoData = await evo_chain.chain;

    do {
        let str = evoData.species.url.split('/');
        let id = str[str.length - 2];
        evoChain.push({
            "species_id": id,
            "species_name": evoData.species.name
        });
    
        evoData = evoData['evolves_to'][0];
    
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

    return evoChain;
}


window.showDetailedCard = showDetailedCard;