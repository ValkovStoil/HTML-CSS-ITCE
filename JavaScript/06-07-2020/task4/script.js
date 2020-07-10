function lockedProfile() {
    console.log('TODO...')

    const userOne = document.getElementById("user1HiddenFields");
    const userTwo = document.getElementById("user2HiddenFields");
    const userThree = document.getElementById("user3HiddenFields");

    const buttonsShowMore = Array.from(document.getElementsByTagName("button"));
    const userOneRadioButtons = document.getElementsByName("user1Locked");
    const userTwoRadioButtons = document.getElementsByName("user2Locked");
    const userThreeRadioButtons = document.getElementsByName("user3Locked");

    let idButton = 0;
    buttonsShowMore.forEach(element => {
        element.onclick = showHide;
        element.id = `user${++idButton}`;
    });

    function showHide() {
        // Get the id of evry user button
        const userId = this.id;
        const button = document.getElementById(userId);
        const show = "Show more";
        const hide = "Hide it";

        switch (userId) {
            case "user1":
                if (button.innerHTML === show) {
                    showContent(userOneRadioButtons, userOne, button);
                } else if (button.innerHTML === hide) {
                    hideContent(userOneRadioButtons, userOne, button);
                }
                break;
            case "user2":
                if (button.innerHTML === show) {
                    showContent(userTwoRadioButtons, userTwo, button);
                } else if (button.innerHTML === hide) {
                    hideContent(userTwoRadioButtons, userTwo, button);
                }
                break;
            case "user3":
                if (button.innerHTML === show) {
                    showContent(userThreeRadioButtons, userThree, button);
                } else if (button.innerHTML === hide) {
                    hideContent(userThreeRadioButtons, userThree, button);
                }
                break;
        }

    }

    function showContent(userRadioButtons, user, button) {
        const userLock = userRadioButtons[0];
        const userUnlock = userRadioButtons[1];

        if (userUnlock.checked) {
            user.style.display = "block";
            button.innerHTML = "Hide it";
        }
    }

    function hideContent(userRadioButtons, user, button) {
        const userLock = userRadioButtons[0];
        const userUnlock = userRadioButtons[1];

        if (userUnlock.checked) {
            user.style.display = "none";
            button.innerHTML = "Show more"
        }
    }
}