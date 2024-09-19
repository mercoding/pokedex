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


async function parseEvoChainToArray(evo_chain) {
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