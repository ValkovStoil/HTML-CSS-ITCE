{
    function hasKey(element, key) {

        return element.hasOwnProperty(key);
    }

    let towns = {};

    function calculateTotalSum(element) {
        for (let index = 0; index < element.length - 1; index += 2) {
            let town = element[index];
            let income = parseInt(element[index + 1]);

            if (hasKey(towns, town)) {
                towns[town] += income;
            } else {
                towns[town] = income;
            }
        }

        console.log(JSON.stringify(towns));
    }

    let test1 = ["Sofia", "20",
        "Varna", "3", "Sofia", "5",
        "Varna", "4"
    ]
    let test2 = ["Sofia", "20",
        "Varna", "3", "sofia", "5",
        "varna", "4"
    ]

    calculateTotalSum(test1);
    calculateTotalSum(test2);
}