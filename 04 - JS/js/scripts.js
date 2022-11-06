const buttonPokeSearch = document.getElementById("buttonPokeSearch");
const alertNull = document.getElementById("alertNull")
const alertThatPokeDoesNotExist = document.getElementById("alertThatPokeDoesNotExist")
//const pokeSearch = document.getElementById("pokeSearch");
//const pokeName = document.getElementById("pokeName");

const callPokeAPI = async () => {
  if(!pokeSearch.value==""){
    alertNull.classList.add("d-none");
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/"+pokeSearch.value);
      alertThatPokeDoesNotExist.classList.add("d-none");
      const data = await res.json();
      pokeName.innerText = data.name;
      pokeImage.src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+(data.id > 99 ? data.id : "0"+data.id)+".png";
      console.log(data)
    } catch (e) {
      alertThatPokeDoesNotExist.classList.remove("d-none");
      pokeImage.src="images/nofound.gif"
    }
  }else{
    alertNull.classList.remove("d-none");
    pokeImage.src="images/null.png"
  }
  
};

buttonPokeSearch.addEventListener("click", callPokeAPI);