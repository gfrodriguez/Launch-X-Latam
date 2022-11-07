const buttonPokeSearch = document.getElementById("buttonPokeSearch");
const alertNull = document.getElementById("alertNull")
const alertThatPokeDoesNotExist = document.getElementById("alertThatPokeDoesNotExist");
const pokeInfo=[];
//const pokeSearch = document.getElementById("pokeSearch");
//const pokeDescription = document.getElementById("pokeDescription");

const callPokeAPI = async () => {
  if (!pokeSearch.value == "") {
      pokeSearch.value = pokeSearch.value.toLowerCase();
      alertNull.classList.add("d-none");
      try {
          const resPoke = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokeSearch.value);
          const resPokeEspecies = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokeSearch.value);
          alertThatPokeDoesNotExist.classList.add("d-none");
          const dataPoke = await resPoke.json();
          const dataPokeEspecies = await resPokeEspecies.json();
          pokeInfo.id = dataPoke.id;
          pokeInfo.name = dataPoke.name;
          pokeInfo.image = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + (pokeInfo.id > 99 ? pokeInfo.id  : pokeInfo.id > 10 ? "0" + pokeInfo.id : "00" + pokeInfo.id) + ".png";
          pokeInfo.height = dataPoke.height*10;
          pokeInfo.weight = dataPoke.weight/10;
          for (let i of dataPokeEspecies.flavor_text_entries) {
              if (i.language.name == 'es') {
                  pokeInfo.description = i.flavor_text.replace(/\n/g, ' ');
                  break
              }
          }
          pokeDescription.innerText = pokeInfo.description;
          pokeName.innerText = pokeInfo.name;
          pokeImage.src = pokeInfo.image;
          pokeId.innerText = "No. "+pokeInfo.id;
          pokeHeight.innerText = pokeInfo.height+' cm';
          pokeWeight.innerText = pokeInfo.weight+' Kg';
          console.log(dataPoke);
      } catch (e) {
          alertThatPokeDoesNotExist.classList.remove("d-none");
          pokeImage.src = "images/nofound.gif"
      }
  } else {
      alertNull.classList.remove("d-none");
      pokeImage.src = "images/null.png"
  }
}

buttonPokeSearch.addEventListener("click", callPokeAPI);