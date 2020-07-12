{
    function isEmpty(element) {

        return Object.keys(element).length === 0;
    }

    console.log(isEmpty({}));
    console.log(isEmpty({
        a: 1
    }));
}