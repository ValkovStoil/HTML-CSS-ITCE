function attachEventsListeners() {

    console.log('TODO:...');

    const daysButton = document.getElementById("daysBtn");
    const hoursButton = document.getElementById("hoursBtn");
    const minutesButton = document.getElementById("minutesBtn");
    const secondsButton = document.getElementById("secondsBtn");

    const inputDays = document.getElementById("days");
    const inputHours = document.getElementById("hours");
    const inputMinutes = document.getElementById("minutes");
    const inputSeconds = document.getElementById("seconds");

    function setInputValue(days, hours, minutes, seconds) {
        inputDays.value = days;
        inputHours.value = hours;
        inputMinutes.value = minutes;
        inputSeconds.value = seconds;
    }

    function convertOne() {
        const days = inputDays.value;

        const hours = convertDaystoHours(days);
        const minutes = convertHourstoMinute(hours);
        const seconds = convertMinutestoSeconds(minutes);

        setInputValue(days, hours, minutes, seconds);

    }

    function convertTwo() {
        const hours = inputHours.value;

        const days = convertHourstoDays(hours);
        const minutes = convertHourstoMinute(hours);
        const seconds = convertMinutestoSeconds(minutes);

        setInputValue(days, hours, minutes, seconds);
    }

    function convertThree() {
        const minutes = inputMinutes.value;

        const hours = convertMinutestoHours(minutes);
        const days = convertHourstoDays(hours);
        const seconds = convertMinutestoSeconds(minutes);

        setInputValue(days, hours, minutes, seconds);

    }

    function convertFour() {
        const seconds = inputSeconds.value;

        const minutes = convertSecondstoMinutes(seconds);
        const hours = convertMinutestoHours(minutes);
        const days = convertHourstoDays(hours);

        setInputValue(days, hours, minutes, seconds);

    }

    function convertDaystoHours(days) {
        return Math.floor(days * 24);
    }

    function convertHourstoMinute(hours) {
        return Math.floor(hours * 60);
    }

    function convertMinutestoSeconds(minutes) {
        return Math.floor(minutes * 60);
    }

    function convertHourstoDays(hours) {
        return Math.floor(hours / 24)
    }

    function convertMinutestoHours(minutes) {
        return Math.floor(minutes / 60);
    }

    function convertSecondstoMinutes(seconds) {
        return Math.floor(seconds / 60);
    }

    daysButton.addEventListener("click", convertOne);
    hoursButton.addEventListener("click", convertTwo);
    minutesButton.addEventListener("click", convertThree);
    secondsButton.addEventListener("click", convertFour);

}