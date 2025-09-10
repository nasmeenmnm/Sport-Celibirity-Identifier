Dropzone.autoDiscover = false;
function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Some Message",
        autoProcessQueue: false
    });

    dz.on("addedfile", function() {
        if (dz.files[1] != null) {
            dz.removeFile(dz.files[0]);        
        }
    });
dz.on("complete", function (file) {
    let imageData = file.dataURL;

    var url = "http://127.0.0.1:5000/classify_image";

    $.post(url, {
        image_data: file.dataURL
    }, function(data, status) {
        console.log(data); // Debugging output to check response
        if (!data || data.length == 0) {
            $("#resultHolder").hide();
            $("#divClassTable").hide();
            $("#error").show();
            return;
        }

        let players = ["lionel_messi", "maria_sharapova", "roger_federer", "serena_williams", "virat_kohli"];

        // Clear any previous results
        $("#resultHolder").html(''); 
        $("#resultHolder").show(); 
        $("#divClassTable").show();
        $("#error").hide();

        // Loop through each detected face in the response
        for (let i = 0; i < data.length; ++i) {
            let match = data[i];
            let classDictionary = match.class_dictionary;

            let playerName = match.class; // e.g., "lionel_messi"
            let imageUrl = `./images/${playerName}.jpeg`; // Assuming the images are stored in an "images" folder
        
            let imageElement = `<div class="player-image">
            <div class="image-container">
                <img src="${imageUrl}" alt="${playerName}" class="player-img">
                <p class="player-name">${playerName}</p>  <!-- Show the player's name centered over the image -->
            </div>
        </div>`;
        
            // Append the image to the resultHolder
            $("#resultHolder").append(imageElement);
        }
    }).fail(function(xhr, status, error) {
        // Debugging in case the post request fails
        console.log("Request failed: ", status, error);
    });
});
$("#submitBtn").on('click', function (e) {
    dz.processQueue();
});
}

$(document).ready(function() {
console.log("ready!");
$("#error").hide();
$("#resultHolder").hide();
$("#divClassTable").hide();

init();
});