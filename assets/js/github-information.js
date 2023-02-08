function userInformationHTML(user) { // pass it parameter user is the object been returned from the git hub api
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

function fetchGitHubInformation(event) {

    var username = $("#gh-username").val(); //'gh-username is the id, then get the val in that text field
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return; // return out of function
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`); // display a loader
    // a promise jQuery
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`) //when takes a argument
    ).then(
        function (response) {
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData));
        }, // maybe promise does not work out
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`);
            } else { // if the error is not a 404 error
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}