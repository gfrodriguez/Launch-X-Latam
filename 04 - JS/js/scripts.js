const buttonPokeSearch = document.getElementById("buttonPokeSearch");
const alertNull = document.getElementById("alertNull");
const alertThatPokeDoesNotExist = document.getElementById("alertThatPokeDoesNotExist");
const pokeInfo=new Object();

const callPokeAPI = async () => {
    if (!pokeSearch.value == "") {
        pokeSearch.value = pokeSearch.value.toLowerCase();
        alertNull.classList.add("d-none");
        try {
            const resPoke = await fetch(
                "https://pokeapi.co/api/v2/pokemon/" + pokeSearch.value
            );
            const resPokeEspecies = await fetch(
                "https://pokeapi.co/api/v2/pokemon-species/" + pokeSearch.value
            );
            alertThatPokeDoesNotExist.classList.add("d-none");
            const dataPoke = await resPoke.json();
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
            pokeInfo.weakness = {};
            let l = 0;
            for (let i of dataPoke.types) {
                const resPokeWeakness = await fetch(
                    "https://pokeapi.co/api/v2/type/" + i.type.name
                );          
                const dataPokeWeakness = await resPokeWeakness.json();
                for (let k of dataPokeWeakness.damage_relations.double_damage_from) {
                        pokeInfo.weakness[l] = k.name;
                        l++;
                    }
            }
            pokeInfo.types= await translateTypes(pokeInfo.types);
            pokeInfo.weakness= await translateTypes(pokeInfo.weakness);
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
        pokeInfo.types ="";
		pokeInfo.abilities = {};
		pokeInfo.types = {};
        pokeInfo.weakness={};
    }
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
};

buttonPokeSearch.addEventListener("click", callPokeAPI);