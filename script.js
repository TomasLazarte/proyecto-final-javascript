const pokeSearch = document.getElementById('pokeSearch')
const pokeCard = document.getElementById('pokeCard')
const btnPrev = document.getElementById('btnPrev')
const btnNext = document.getElementById('btnNext')
const pokeAbilities = document.getElementById('pokeAbilities')
const btnAbilities = document.getElementById('btnAbilities')

localStorage.setItem('btnPrev', 'true')
localStorage.setItem('btnNext', 'true')
localStorage.setItem('btnAbilities', 'true')

if(localStorage.getItem('btnPrev') == 'true'){
    document.getElementById("btnPrev").disabled = true;
}else{
    document.getElementById("btnPrev").disabled = false;          
}
if(localStorage.getItem('btnNext') == 'true'){
    document.getElementById("btnNext").disabled = true;
}else{
    document.getElementById("btnNext").disabled = false;          
}
if(localStorage.getItem('btnAbilities') == 'true'){
    document.getElementById("btnAbilities").disabled = true;
}else{
    document.getElementById("btnAbilities").disabled = false;          
}

class Pokemon {
    constructor(name, id, sprite, abilities){
        this.name = name
        this.id = id
        this.sprite = sprite
        this.abilities = abilities
    }
}

let pokemons = []

if(localStorage.getItem('pokemons')) {
    pokemons = JSON.parse(localStorage.getItem('pokemons'))
} else {
    localStorage.setItem('pokemons', JSON.stringify(pokemons))
}

const typeColors = {
    bug: '#A8B820',
    dark: '#705848',
    dragon: '#7038F8',
    electric: '#F8D030',
    fairy: '#EE99AC',
    fighting: '#C03028',
    fire: '#F08030',
    flying: '#A890F0',
    ghost: '#705898',
    grass: '#78C850',
    ground: '#E0C068',
    ice: '#98D8D8',
    normal: '#A8A878',
    poison: '#A040A0',
    psychic: '#F85888',
    rock: '#B8A038',
    steel: '#696969',
    water: '#188BE0',
}

pokeSearch.addEventListener('submit', (e) => {
    e.preventDefault()
    const pokeChoose = document.getElementById('pokeChoose').value
    pokeFetch(pokeChoose.toLowerCase())
})
function pokeFetch(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(resp => resp.json())
    .then(data => pokeInfo(data))
    .catch(error => pokeNotFound())
}

const pokeStorage = (data) => {
    let pokemon = new Pokemon (data.name, data.id, data.sprites.front_default, data.abilities)
    pokemons.unshift(pokemon)
    localStorage.setItem('pokemons', JSON.stringify(pokemons))
}

btnPrev.addEventListener('click', (e) => {
    e.preventDefault()
    let pokemon = JSON.parse(localStorage.getItem('pokemons'))
    pokeFetch((pokemon[0].id) - 1)
})

btnNext.addEventListener('click', (e) => {
    e.preventDefault()
    let pokemon = JSON.parse(localStorage.getItem('pokemons'))
    pokeFetch((pokemon[0].id) + 1)
})


const pokeInfo = (data) => {
    pokeStorage(data)
    const sprite = data.sprites.other.dream_world.front_default
    const sprite2 = data.sprites.front_default

    const typeOne = data.types[0].type.name
    
    const statsHp = data.stats[0].base_stat
    const statsAtk = data.stats[1].base_stat
    const statsDef = data.stats[2].base_stat
    const statsAtkSp = data.stats[3].base_stat
    const statsDefSp = data.stats[4].base_stat
    const statsSpd = data.stats[5].base_stat

    if(data.types[1] == undefined) {
        pokeCard.innerHTML = `
        <div class="container"> 
            <div class="card text-white bg-primary mb-3">
                <div class="card-header"><h2>${data.name.toUpperCase()}</h2></div>
                <div class="card-body">
                    <h4 class="card-title"># ${data.id}</h4>
                    <div class="card-img">
                        <img class="sprite" src="${sprite ?? sprite2}">
                    </div>
                    <div class="table types">
                        <div class="col" style="background-color : ${typeColors[data.types[0].type.name]}">${typeOne.toUpperCase()}</div>
                    </div>
                    <table class="table table-hover">
                        <tbody>
                            <tr class="table-active">
                                <th scope="row">HP</th>
                                <td>${statsHp}</td>
                            </tr>
                            <tr class="table-active">
                                <th scope="row">ATTACK</th>
                                <td>${statsAtk}</td>
                            </tr>
                            <tr class="table-active">
                                <th scope="row">DEFENSE</th>
                                <td>${statsDef}</td>
                            </tr>
                            <tr class="table-active">
                                <th scope="row">SPECIAL ATTACK</th>
                                <td>${statsAtkSp}</td>
                            </tr>
                            <tr class="table-active">
                                <th scope="row">SPECIAL DEFENSE</th>
                                <td>${statsDefSp}</td>
                            </tr>
                            <tr class="table-active">
                                <th scope="row">SPEED</th>
                                <td>${statsSpd}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
    }else {
        const typeTwo = data.types[1].type.name
        pokeCard.innerHTML = `
            <div class="container"> 
                <div class="card text-white bg-primary mb-3">
                    <div class="card-header"><h2>${data.name.toUpperCase()}</h2></div>
                    <div class="card-body">
                        <h4 class="card-title"># ${data.id}</h4>
                        <div class="card-img">
                            <img class="sprite" src="${sprite ?? sprite2}">
                        </div>
                        <div class="table types">
                            <div class="col" style="background-color : ${typeColors[data.types[0].type.name]}">${typeOne.toUpperCase()}</div>
                            <div class="col" style="background-color : ${typeColors[data.types[1].type.name]}">${typeTwo.toUpperCase()}</div>
                        </div>
                        <table class="table table-hover">
                            <tbody>
                                <tr class="table-active">
                                    <th scope="row">HP</th>
                                    <td>${statsHp}</td>
                                </tr>
                                <tr class="table-active">
                                    <th scope="row">ATTACK</th>
                                    <td>${statsAtk}</td>
                                </tr>
                                <tr class="table-active">
                                    <th scope="row">DEFENSE</th>
                                    <td>${statsDef}</td>
                                </tr>
                                <tr class="table-active">
                                    <th scope="row">SPECIAL ATTACK</th>
                                    <td>${statsAtkSp}</td>
                                </tr>
                                <tr class="table-active">
                                    <th scope="row">SPECIAL DEFENSE</th>
                                    <td>${statsDefSp}</td>
                                </tr>
                                <tr class="table-active">
                                    <th scope="row">SPEED</th>
                                    <td>${statsSpd}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `
    }
    pokeAbilities.innerHTML = ''
    btnPrev.disabled = false
    btnNext.disabled = false
    btnAbilities.disabled = false
}

function pokeNotFound () {
    pokeCard.innerHTML = `
        <div class="container"> 
            <div class="card text-white bg-primary mb-3">
                <div class="card-header"><h1>???</h1></div>
                <div class="card-body">
                    <h4 class="card-title"># --</h4>
                    <div class="card-img">
                        <img class="sprite" src="./img/poke-not-found.png" alt="Pokemon_Not_Found">
                    </div>
                </div>
            </div>
        </div>
    `
}

btnAbilities.addEventListener('click', (e) => {
    e.preventDefault()
    pokeAbilities.innerHTML = ''
    let idPokemon = JSON.parse(localStorage.getItem('pokemons'))
    let abilities = idPokemon[0].abilities[0].ability.name
    pokeAbilities.innerHTML = `
    <table class="table table-hover">
        <tbody>
            <tr class="table-active">
                <th scope="row">ABILITY</th>
                <td>${abilities.toUpperCase()}</td>
            </tr>
        </tbody>
    </table>    
    `
})
