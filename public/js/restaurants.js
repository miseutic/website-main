//This function is to call the restaurants api and get all the movies
//that is showing in Shaw Theatres for Showing Now and Coming Soon
function getRestaurantData() {
    var request = new XMLHttpRequest();
    request.open('GET', restaurant_url, true);

    //This function will be called when data returns from the web api
    request.onload = function () {
        //get all the movies records into our restaurant array
        restaurant_array = JSON.parse(request.responseText);
        //call the function so as to display all restaurants tiles for "Now Showing"
        fetchReview();
        fetchUser();
        console.log(restaurant_array) //output to console
        displayRestaurants(category);
    };
    //This command starts the calling of the restaurant web api
    request.send();
}

//This function is to display the meal category
//that filters based on "Lunch" or "Dessert"
function displayRestaurants(category) {
    var table = document.getElementById("restaurantsTable");
    var restaurantCount = 0;
    var message = "";

    table.innerHTML = "";
    totalRestaurants = restaurant_array.length;
    for (var count = 0; count < totalRestaurants; count++) {
        if (restaurant_array[count].meal == category) {
            var picture = restaurant_array[count].picture;
            var name = restaurant_array[count].name;
            var cell = '<div class="card col-md-3" ><img class="card-img-top" src="' + picture + '" width = "600" height="200" alt="Card image cap">\
                        <div class="card-body"><i class="far fa-comment fa-lg" style="float:left;cursor:pointer" data-toggle="modal" data-target="#reviewModal" item="' + count + '" onClick="showRestaurantReview(this)"></i>\
                        <h5 style="padding-left:30px;cursor:pointer" data-toggle="modal" data-target="#restaurantModal" class="card-title" item="' + count + '" onClick="showRestaurantDetails(this)">' + name + '</h5></div>\
            </div>'
            table.insertAdjacentHTML('beforeend', cell);
            restaurantCount++;
        }
    }
    message = restaurantCount + "Restaurants" + category;
    document.getElementById("parent").textContent = "";
}

function listLunch() {
    category = "Lunch";
    displayRestaurants(category);
    document.getElementById("lunchMenu").classList.add("active");
    document.getElementById("dessertMenu").classList.remove("active");
}

function listDessert() {
    category = "Dessert";
    displayRestaurants(category);
    document.getElementById("lunchMenu").classList.remove("active");
    document.getElementById("dessertMenu").classList.add("active");
}

//This function is to display the individual restaurant details
//whenever the user clicks on "See More"

function showRestaurantDetails(element) {
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("restaurantName").textContent = restaurant_array[item].name;
    document.getElementById("restaurantPic").src = restaurant_array[item].picture;
    document.getElementById("category").textContent = restaurant_array[item].category;
    document.getElementById("meal").textContent = restaurant_array[item].meal;
    document.getElementById("address").textContent = restaurant_array[item].address;
    document.getElementById("dietary").textContent = restaurant_array[item].dietary;
    document.getElementById("telephone").textContent = restaurant_array[item].telephone;
    document.getElementById("awards").textContent = restaurant_array[item].awards;
    document.getElementById("mrt").textContent = restaurant_array[item].mrt;
    document.getElementById("menu").src = restaurant_array[item].menu;
    document.getElementById("map").src = restaurant_array[item].map;
}

