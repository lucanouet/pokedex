const cards= document.querySelectorAll('.card')
const placeHolder = document.querySelector('.placeHolder')
const btnPrevius = document.querySelector('#previus')
const btnNext = document.querySelector('#next')
let offset = 1
let limit = 9
const amountsCards = 9

function getPokemon(id, index){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((response) => response.json())
    .then((data) => distributePokemons(data,index))
}

function getPokemons(number,number2){
    let index = 0
    for (let i = number; i <= number2; i++){
        getPokemon(i, index)
        index++
    }
}

function distributePokemons(data, i){

        const img = document.createElement('img')
        img.src = data.sprites.front_default      

        cards[i].textContent = data.name
        cards[i].appendChild(img)
        cards[i].addEventListener('click', ()=>{
            placeHolder.innerHTML = ''

            const name = document.createElement('h4')
            name.textContent = data.name
    
            const imgPlace = document.createElement('img')
            imgPlace.classList.add('pepe')
            imgPlace.src = data.sprites.front_default

            const info = document.createElement('p')
            const height = data.height
            const weight = data.weight

            info.textContent ='altura:' + height
            info.textContent += ' peso:' + weight + 'kg'


            
            placeHolder.appendChild(name)
            placeHolder.appendChild(imgPlace)
            placeHolder.appendChild(info)

        })
                

}

btnPrevius.addEventListener('click', ()=>{
    placeHolder.innerHTML = ''
    if(offset == 1 & limit == 9){
        return
    }else{
        offset = offset - amountsCards
        limit = limit - amountsCards
    }

    getPokemons(offset,limit)
})

btnNext.addEventListener('click', ()=>{
    placeHolder.innerHTML = ''
    offset = offset + amountsCards
    limit = limit + amountsCards

    getPokemons(offset,limit)
})

getPokemons(1,9)
