const buttonPokeSearch = document.getElementById("buttonPokeSearch");
const alertNull = document.getElementById("alertNull")
const alertThatPokeDoesNotExist = document.getElementById("alertThatPokeDoesNotExist");
const pokeInfo=new Object();


//const pokeSearch = document.getElementById("pokeSearch");

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
          pokeInfo.image = dataPoke.sprites.other['official-artwork'].front_default;
          pokeInfo.height = dataPoke.height*10;
          pokeInfo.weight = dataPoke.weight/10;
          for (let i of dataPokeEspecies.flavor_text_entries) {
              if (i.language.name == 'es') {
                  pokeInfo.description = i.flavor_text.replace(/\n/g, ' ');
                  break
              }
          }
          for (let i of dataPokeEspecies.genera) {
            if (i.language.name == 'es') {
                pokeInfo.genus = i.genus;
                break
            }
        }
          console.log(dataPoke);
          console.log(dataPokeEspecies);
      } catch (e) {
          alertThatPokeDoesNotExist.classList.remove("d-none");
          pokeInfo.id = "";
          pokeInfo.name = "";
          pokeInfo.image = "images/nofound.gif";
          pokeInfo.height = "";
          pokeInfo.weight = "";
          pokeInfo.description = "";
          pokeInfo.genus = "";
      }
  } else {
      alertNull.classList.remove("d-none");
      pokeInfo.id = "";
      pokeInfo.name = "";
      pokeInfo.image = "images/null.png";
      pokeInfo.height = "";
      pokeInfo.weight = "";
      pokeInfo.description = "";
      pokeInfo.genus = "";
  }
  pokeDescription.innerText = pokeInfo.description;
  pokeName.innerText = "-"+pokeInfo.name;
  pokeImage.src = pokeInfo.image;
  pokeId.innerText = "#"+pokeInfo.id;
  pokeHeight.innerText = pokeInfo.height+' cm';
  pokeWeight.innerText = pokeInfo.weight+' Kg';
  pokeGenus.innerText = pokeInfo.genus;
}

buttonPokeSearch.addEventListener('click', callPokeAPI);