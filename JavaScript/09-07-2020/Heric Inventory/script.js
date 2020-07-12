function heroicInventory(input) {

    let result = [];

    for (const data of input) {
        let [name, level, items] = data.split(" / ");
        level = Number(level);
        items = items ? items.split(", ") : [];

        let hero = {
            name: "",
            level: 0,
            items: []
        }
        hero.name = name;
        hero.level = level;
        hero.items = items;

        result.push(hero);
    }

    console.log(JSON.stringify(result));

}

const test1 = ["Isacc / 25 / Apple, GravityGun", "Derek / 12 / BarrelVest, DestructionSword", "Hes / 1 / Desolator, Sentinel, Antara"];
const test2 = ["Jake / 1000 / Gauss, HolidayGranade"];
heroicInventory(test1);
heroicInventory(test2);