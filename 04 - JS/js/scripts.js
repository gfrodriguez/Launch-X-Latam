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
};

buttonPokeSearch.addEventListener("click", callPokeAPI);