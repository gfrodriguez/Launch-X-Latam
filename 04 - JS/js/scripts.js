const buttonPokeSearch = document.getElementById("buttonPokeSearch");
const buttonPokeSearchXS = document.getElementById("buttonPokeSearchXS");
const alertNull = document.getElementById("alertNull");
const alertThatPokeDoesNotExist = document.getElementById("alertThatPokeDoesNotExist");
const progressBar = document.querySelectorAll(".progress-bar");
const pokeInfo={};

/**
 * Toma los nombres de los 905 Pokémon y los pone en una matriz.
 * @returns Una serie de nombres de Pokémon.
 */
const pokenames = async () => {
    pokeInfo.names = new Array();
    for (let j = 1; j<905;j++){
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+j);
        const json = await response.json();
        pokeInfo.names.push(json.name);
    }
    return pokeInfo.names;
}

document.addEventListener("DOMContentLoaded",pokenames());

/**
 * Cuando el usuario escribe algo en el campo de entrada, la función busca el valor en la matriz y
 * muestra los resultados en una lista desplegable.
 * Codigo de W3Schools
 * @param inp - El elemento de campo de texto.
 * @param arr - La matriz de cadenas que se utilizará para la función de autocompletar.
 * @returns la función de autocompletar.
 */
autocomplete = (inp, arr) => {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("div");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) {
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    addActive = (x) =>{
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    removeActive = (x) => {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    closeAllLists = (elmnt) => {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById('pokeSearch'), pokeInfo.names);
autocomplete(document.getElementById('pokeSearchXS'), pokeInfo.names);

/**
 * Toma la entrada del usuario y luego usa esa entrada para obtener datos de PokeAPI.
 */
const callPokeAPI = e => async () => {
    if (!e.value == "") {
        /* Convirtiendo la entrada a minúsculas. */
        e.value = e.value.toLowerCase();
        alertNull.classList.add("d-none");
        /* Obtener datos de una API y almacenarlos en un objeto. */
        try {
            const resPoke = await fetch(
                "https://pokeapi.co/api/v2/pokemon/" + e.value
            );            
            alertThatPokeDoesNotExist.classList.add("d-none");
            const dataPoke = await resPoke.json();
            const resPokeEspecies = await fetch(
                "https://pokeapi.co/api/v2/pokemon-species/" + dataPoke.id
            );
            const dataPokeEspecies = await resPokeEspecies.json();
            pokeInfo.id = dataPoke.id;
            pokeInfo.name = dataPoke.name;
            pokeInfo.image = dataPoke.sprites.other["official-artwork"].front_default;
            pokeInfo.height = dataPoke.height/10;
            pokeInfo.weight = dataPoke.weight/10;
            for (let i of dataPokeEspecies.flavor_text_entries) {
                if (i.language.name == "es") {
                    pokeInfo.description = i.flavor_text.replace(/\n/g, " ");
                    break;
                }else {
                    pokeInfo.description = dataPokeEspecies.flavor_text_entries[0].flavor_text.replace(/\n/g, " ");
                }
            }
            for (let i of dataPokeEspecies.names) {
                if (i.language.name == "es") {
                    pokeInfo.name = i.name;
                    break;
                } else {
                    pokeInfo.name = dataPokeEspecies.name;
                }
            }
            for (let i of dataPokeEspecies.genera) {
                if (i.language.name == "es") {
                    pokeInfo.genus = i.genus;
                    break;
                }
            }
            pokeInfo.abilities = {};
            let j = 0;
            /* Obtener las habilidades de los pokemon y traducirlas al español. */
            for (let i of dataPoke.abilities) {
                const resPokeAbilities = await fetch(
                    "https://pokeapi.co/api/v2/ability/" + i.ability.name
                );
                const dataPokeAbilities = await resPokeAbilities.json();
                for (let k of dataPokeAbilities.names) {
                    if (k.language.name == "es") {
                        pokeInfo.abilities[j] = k.name;
                        break;
                    }
                }
                j++;
            }            
            pokeInfo.types = {};
            j = 0;
            for (let i of dataPoke.types) {
                pokeInfo.types[j] = i.type.name;
                j++;
            }

            /**
             * Toma un objeto con los id de tipo como claves y los nombres de tipo como valores, y
             * devuelve un objeto con los id de tipo como claves y los nombres de tipo en español como
             * valores.
             * </código>
             * @param obj - el objeto que contiene los tipos de pokemon
             * @returns Una matriz de objetos.
             */
            async function translateTypes(obj){
                j = 0;
                let types = {};
                for (let i of Object.keys(obj)) {
                    const resPokeTypes = await fetch(
                        "https://pokeapi.co/api/v2/type/"+obj[i]
                    );
                    const dataPokeTypes = await resPokeTypes.json();
                    for (let k of dataPokeTypes.names) {
                        if (k.language.name == "es") {
                            types[j] = k.name;
                            break;
                        }
                    }
                    j++;
                }
                return types;
            }
            
            async function removeDuplicates(obj){
                let unique = {};
                let temp = Object.values(obj);
                return unique = temp.filter((item,index)=>{
                    return temp.indexOf(item) === index;
                  })
            }

            pokeInfo.weakness = {};
            j = 0;
            for (let i of dataPoke.types) {
                const resPokeWeakness = await fetch(
                    "https://pokeapi.co/api/v2/type/" + i.type.name
                );          
                const dataPokeWeakness = await resPokeWeakness.json();
                for (let k of dataPokeWeakness.damage_relations.double_damage_from) {
                        pokeInfo.weakness[j] = k.name;
                        j++;
                    }
            }
            pokeInfo.types= await translateTypes(pokeInfo.types);
            pokeInfo.weakness= await translateTypes(await removeDuplicates(pokeInfo.weakness));

            pokeInfo.stats = {};
        
            j=0;
            for (i of dataPoke.stats){
                pokeInfo.stats[i.stat.name] = i.base_stat;
                j++;
            }

            /*for (let i of progressBar) {
                i.classList.add('progress-bar-striped', 'progress-bar-animated');
            }*/

            console.log(dataPoke);
            console.log(dataPokeEspecies);
            console.log(pokeInfo);
        } catch (e) {
            alertThatPokeDoesNotExist.classList.remove("d-none");
            pokeInfo.id = "";
            pokeInfo.name = "";
            pokeInfo.image = "images/nofound.gif";
            pokeInfo.height = "";
            pokeInfo.weight = "";
            pokeInfo.description = "";
            pokeInfo.genus = "";
            pokeInfo.types ="";
			pokeInfo.abilities = {};
			pokeInfo.types = {};
            pokeInfo.weakness={};
            pokeInfo.stats={hp:0,attack:0,defense:0,'special-attack':0,'special-defense':0,speed:0};
            console.log(pokeInfo);
        }
    } else {
        alertThatPokeDoesNotExist.classList.add("d-none");
        alertNull.classList.remove("d-none");
        pokeInfo.id = "";
        pokeInfo.name = "";
        pokeInfo.image = "images/null.png";
        pokeInfo.height = "";
        pokeInfo.weight = "";
        pokeInfo.description = "";
        pokeInfo.genus = "";
        pokeInfo.types ="";
		pokeInfo.abilities = {};
		pokeInfo.types = {};
        pokeInfo.weakness={};
        pokeInfo.stats={hp:0,attack:0,defense:0,'special-attack':0,'special-defense':0,speed:0};;
        console.log(pokeInfo);
    }
    /* Actualización del HTML con los datos de la API. */
    pokeDescription.innerText = pokeInfo.description;
    pokeName.innerText = "-" + pokeInfo.name;
    pokeImage.src = pokeInfo.image;
    pokeImage.alt = pokeInfo.name;
    pokeId.innerText = "#" + pokeInfo.id;
    pokeHeight.innerText = pokeInfo.height + " m";
    pokeWeight.innerText = pokeInfo.weight + " Kg";
    pokeGenus.innerText = pokeInfo.genus;
    pokeAbilities.innerText = Object.values(pokeInfo.abilities).join(', ');
    pokeTypes.innerText = Object.values(pokeInfo.types).join(', ');
    pokeWeakness.innerText = Object.values(pokeInfo.weakness).join(', ');
    pokeStatHP.style.width = pokeInfo.stats.hp/255*100+"%";
    pokeStatAttack.style.width = pokeInfo.stats.attack/255*100+"%";
    pokeStatDefense.style.width = pokeInfo.stats.defense/255*100+"%";
    pokeStatSpecialAttack.style.width = pokeInfo.stats["special-attack"]/255*100+"%";
    pokeStatSpecialDefense.style.width = pokeInfo.stats["special-defense"]/255*100+"%";
    pokeStatSpeed.style.width = pokeInfo.stats.speed/255*100+"%";
    pokeStatHP.ariaValueNow = pokeInfo.stats.hp;
    pokeStatAttack.ariaValueNow = pokeInfo.stats.attack;
    pokeStatDefense.ariaValueNow = pokeInfo.stats.defense;
    pokeStatSpecialAttack.ariaValueNow = pokeInfo.stats["special-attack"];
    pokeStatSpecialDefense.ariaValueNow = pokeInfo.stats["special-defense"];
    pokeStatSpeed.ariaValueNow = pokeInfo.stats.speed;
    pokeStatHP.innerText = pokeInfo.stats.hp;
    pokeStatAttack.innerText = pokeInfo.stats.attack;
    pokeStatDefense.innerText = pokeInfo.stats.defense;
    pokeStatSpecialAttack.innerText = pokeInfo.stats["special-attack"];
    pokeStatSpecialDefense.innerText = pokeInfo.stats["special-defense"];
    pokeStatSpeed.innerText = pokeInfo.stats.speed;
};

buttonPokeSearch.addEventListener("click", callPokeAPI(pokeSearch));
buttonPokeSearchXS.addEventListener("click", callPokeAPI(pokeSearchXS));