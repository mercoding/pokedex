import { POKEMON_IMG } from "./main.js";

export function setPokemonMain(pokemon) {
    document.getElementById('detailed-card-description').classList.remove('card_evo_chain');

    let html = /*html*/`
        <div>Height</div><div>:</div><div>${pokemon.height / 10} m</div>
        <div>Weight</div><div>:</div><div>${pokemon.weight / 10} kg</div>
        <div>Base experience</div><div>:</div><div>${pokemon.base_experience}</div>
        <div>Abilities</div><div>:</div>`;
    let abilities = '';
    pokemon.abilities.forEach((element, index) => {
        abilities += element.ability.name;
        if (index < pokemon.abilities.length - 1) abilities += ', ';
    });
    html += `<div>${abilities}</div>`;
    return html;
}


export function setPokemonStats(pokemon) {
    document.getElementById('detailed-card-description').classList.remove('card_evo_chain');

    let html = '';
    pokemon.stats.forEach(element => {
        html += `<div>`;
        html += element.stat.name;
        html += `</div>`;
        html += '<div>:</div>';
        html += /*html*/`
            <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="${element.base_stat}" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar progressbar-bg" style="width: ${element.base_stat}%">${element.base_stat}</div>
            </div>  
        `;
    });
    return html;
}

export async function setPokemonEvoChain(evo_chain) {
    let html = '';

    for (let index = 0; index < evo_chain.length; index++) {
        let h = POKEMON_IMG + evo_chain[index].species_id + '.svg';
        html += /*html*/`
            <img class="pokemon_evo_chain_img flex_center" src="${h}" alt="">  
        `;
        if(index < evo_chain.length - 1) html += /*html*/`<div>>></div>`;
    }

    document.getElementById('detailed-card-description').classList.add('card_evo_chain');

    return html;
}

export function getHeader() {
    let header = document.querySelector('header');
    header.innerHTML = /*html*/`
        <div class="headerContent">
            <div class="left flex_center">
                <img class="pokeball_img mg_right_8px" src="img/pokeball-1594373_1280.png" alt="Pokemon_img">
                <div class="headline">Pokedex</div>
            </div>
            <div class="right flex_center">
                <input id="search" type="text" oninput="filter()">
            </div>
        </div>    
    `;
}

export function getCard(img_url, num, pokemon_name) {
    return /*html*/`
       <div class="card" onclick="showDetailedCard(${num})">
            <div class="card-header">
                #${num} ${pokemon_name}
            </div>
            <div id="card${num}" class="card-body flex_center">
                <img src="${img_url}" class="card-img-top" alt="...">
            </div>
            <div id="card${num}_groups" class="card-footer">
                ${pokemon_name}
            </div>
        </div>
    `;
}

export function getDetailedCard(img_url, num, pokemon_name) {
    return /*html*/`
       <div id="detailedCard" class="card detailed-card">
            <div class="card-header">#${num} ${pokemon_name}</div>
            <div id="detailed-card${num}" class="card-body flex_center"><img src="${img_url}" class="card-img-top" alt="..."></div>
            <div id="detailed-card${num}_groups" class="card-footer">${pokemon_name}</div>
            <div class="card-tabs">
                <div id="p_main_info" class="flex_center underline-grid border-right" onclick="switchPokemonInfo(0, ${num})">main</div>
                <div id="p_stat_info" class="flex_center border-right" onclick="switchPokemonInfo(1, ${num})">stats</div>
                <div id="p_evo_chain" class="flex_center" onclick="switchPokemonInfo(2, ${num})">evo chain</div>
            </div>
            <div id="detailed-card-description" class="card-body card-description-body card_evo_chain"></div>
        </div>
    `;
}