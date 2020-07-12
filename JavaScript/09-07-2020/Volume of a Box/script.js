{
    function columeOfBox(element) {

        let result = 1;
        for (var val in element) {
            result *= element[val]
        }

        return result
    }

    console.log(columeOfBox({
        width: 2,
        length: 5,
        height: 1
    }));
    console.log(columeOfBox({
        width: 4,
        length: 2,
        height: 2
    }));
    console.log(columeOfBox({
        width: 2,
        length: 3,
        height: 5
    }));
}