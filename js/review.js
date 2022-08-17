function fetchReview() {
    var request = new XMLHttpRequest();
    request.open('GET', review_url, true);
    //This command starts the calling of the reviews api
    request.onload = function () {
        //get all the reviews records into our reviews array
        review_array = JSON.parse(request.responseText);
        console.log(review_array);
    };
    request.send();
}

function newReview() {
    //Initialise each HTML input elements in the modal window with default value.
    rating = 0;
    document.getElementById("userReview").value = "";
    document.getElementById("username").value = "";
}

// Submit or send the new review to the server to be added.
function addReview() {
    var review = new Object();
    review.restaurantId = restaurant_array[currentIndex]._id; // Restaurant ID is required by server to create new review
    review.username = document.getElementById("username").value; // Value from HTML input text
    review.review = document.getElementById("userReview").value; // Value from HTML input text
    review.datePosted = null; // Change the datePosted to null instead of taking the timestamp on the client side;
    review.rating = rating;

    var postReview = new XMLHttpRequest(); // new HttpRequest instance to send review

    postReview.open("POST", review_url, true); //Use the HTTP POST method to send data to server

    postReview.setRequestHeader("Content-Type", "application/json");
    postReview.onload = function () {
        console.log("new review sent");
        fetchReview(); // fetch all reviews again so that the web page can have updated reviews.     
    };
    // Convert the data in Review object to JSON format before sending to the server.
    postReview.send(JSON.stringify(review));
}

//This function allows the user to mouse hover the black and white popcorn
//so that it will turn to a colored version when hovered
function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var stars = document.getElementsByClassName(classname);
    var classTarget = "." + classname;

    // This is another way of writing 'for' loop, which initialises the 
    // popcorn images to use black and white.
    for (let star of stars) {
        star.setAttribute("src", starBWImage);
    }
    changeStarImage(num, classTarget);
}

// This function sets the rating and coloured images based on the value of the image tag when  
// the mouse cursor hovers over the popcorn image.
function changeStarImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starImage);
            rating = 5;
            break;
    }
}

//This function will hide the existing modal and present a modal with the selected comment
//so that the user can attempt to change the username, rating or movie review
function editReview(element) {
    var item = element.getAttribute("item");

    currentIndex = item;

    document.getElementById("username").value = review_array[item].username;
    document.getElementById("editUserReview").value = review_array[item].review;
    console.log(review_array[item].rating);
    displayColorStar('editstar', review_array[item].rating);
}

//This function displayS the correct number of colored popcorn
//based on the movie rating that is given in the user review
function displayColorStar(classname, num) {
    var star = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let s of star) {
        s.setAttribute("src", starBWImage);
    }
    changeStarImage(num, classTarget);
}

//This function sends the Review data to the server for updating
function updateReview() {
    var response = confirm("Are you sure you want to update this review?");
    if (response == true) {
        var edit_review_url = review_url + "/" + review_array[currentIndex].reviewId;
        var updateReview = new XMLHttpRequest(); // new HttpRequest instance to send request to server
        updateReview.open("PUT", edit_review_url, true); //The HTTP method called 'PUT' is used here as we are updating data
        updateReview.setRequestHeader("Content-Type", "application/json");
        review_array[currentIndex].username = document.getElementById("username").value;
        review_array[currentIndex].review = document.getElementById("editUserReview").value;
        review_array[currentIndex].rating = rating;
        updateReview.onload = function () {
            fetchReview();
        };
        updateReview.send(JSON.stringify(review_array[currentIndex]));
    }
}

//This function deletes the selected review in a specific movie
function deleteReview(element) {
    var response = confirm("Are you sure you want to delete this review?");

    if (response == true) {
        var item = element.getAttribute("item"); //get the current item
        var delete_review_url = review_url + "/" + review_array[item].reviewId;
        var eraseReview = new XMLHttpRequest();
        eraseReview.open("DELETE", delete_review_url, true);
        eraseReview.onload = function () {
            fetchReview();
        };
        eraseReview.send();
    }
}


//This function is to display all the reviews of that restaurant
//whenever the user click on the "review" button
function showRestaurantReview(element) {
    document.getElementById("emptyReview").innerHTML = "No review yet. Create one now";
    var item = element.getAttribute("item");
    currentIndex = item;

    document.getElementById("review").textContent = "Review for " + restaurant_array[item].name;
    document.getElementById("reviewBody").textContent = "";

    for (var i = 0; i < review_array.length; i++) {
        if (review_array[i].restaurantId === restaurant_array[item]._id) {
            document.getElementById("emptyReview").innerHTML = "";
            selectedRestaurantId = restaurant_array[item]._id;
            star = "";
            var html = '<div class="text-center" style="width:100%;">                                                           \
                            <div class="card">                                                                                  \
                                <div class="card-body">                                                                         \
                                    <p class="card-text" id="rating' + i + '">' + review_array[i].review + "</p>               \
                                    <small>by " + review_array[i].username + " @ " + review_array[i].datePosted + "</small>   \
                                </div>                                                                                          \
                            </div>                                                                                              \
                        </div>";
            document.getElementById("reviewBody").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < review_array[i].rating; j++) {
                console.log(i);
                star += "<img src='images/star.png' style='width:50px' />";
            }
            star += "<i class='far fa-trash-alt fa-2x edit' data-dismiss='modal' item='" + i + "' onClick='deleteReview(this)' ></i>";
            star += "<i class='far fa-edit fa-2x edit' data-toggle='modal' data-target='#editReviewModal' data-dismiss='modal' item='" + i + "' onClick='editReview(this)' ></i>";
            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");

        }
    }
}