{
    class Calculator {
        constructor(number1, number2) {
            this.number1 = number1;
            this.number2 = number2;
        }

        add(number1, number2) {
            return number1 + number2;
        }

        subtract(number1, number2) {
            return number1 - number2;
        }

        multiplay(number1, number2) {
            return number1 * number2;
        }

        divide(number1, number2) {
            if (number1 === 0 || number2 === 0) {
                return 0;
            }
            return number1 / number2;
        }
    }

    let calculator = new Calculator();

    console.log(calculator.add(10, 5));
    console.log(calculator.subtract(10, 5));
    console.log(calculator.multiplay(10, 5));
    console.log(calculator.divide(10, 5));
}