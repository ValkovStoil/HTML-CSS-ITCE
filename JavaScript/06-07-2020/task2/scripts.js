function notify(message) {
    console.log('TODO:...');


    const notificationDiv = document.getElementById("notification");

    notificationDiv.innerHTML = message;
    notificationDiv.style.display = "block";

    function hide() {
        notificationDiv.style.display = "none";
        notificationDiv.innerHTML = "";
    }

    setTimeout(hide, 2000);
}