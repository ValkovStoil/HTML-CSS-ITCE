{
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        compareAge(person) {

            let result = ""
            if (this.age > person.age) {
                result = `${person.name} is yonger then me.`;
            } else if (this.age < person.age) {
                result = `${person.name} is older then me.`;
            } else {
                result = `${person.name} is the same age as me.`
            }

            return result;
        }
    }

    let p1 = new Person("Samuel", 24);
    let p2 = new Person("Joel", 36);
    let p3 = new Person("Lily", 24);

    console.log(p1.compareAge(p2));
    console.log(p2.compareAge(p1));
    console.log(p1.compareAge(p3));
}