$(document).ready(function () {

    var currentMenuSectionIndex = 0; //starting section is crust
    var menuSelection = ['#crust-selection', '#cheese-sauce-selection', '#topping-selection'];

    //cost variables
    var crustCost = 0;
    var stuffedCrustCost = 0;
    var extraCheeseCost = 0;
    var meatsCost = 0;
    var veggiesCost = 0;
    var totalCost = 0;

    hideMenuSections(); //hide menu sections except the currently viewed one (starting is crust)
    $("#order-summary").hide(); //hide the order summary on load.
    disableBackButton();  //back button should start as disabled.
    $("#topping-note").hide();

    //object to hold each section of the menu, and the prices of each item in a section
    var pizzaPrice = {
        crust: {
            personal: {
                name: "Personal",
                price: 6
            },
            medium: {
                name: "Medium",
                price: 10
            },
            large: {
                name: "Large",
                price: 14
            },
            xlarge: {
                name: "Extra Large",
                price: 16
            },
            stuffed: {
                name: "Stuff Crust",
                price: 3
            }
        },
        cheese: {
            extraCheese: {
                name: "Extra Cheese",
                price: 3
            }
        },
        meats: {
            pepperoni: {
                name: "Pepperoni",
                price: 1,
                itemChecked: false
            },
            sausage: {
                name: "Sausage",
                price: 1,
                itemChecked: false
            },
            bacon: {
                name: "Canadian Bacon",
                price: 1,
                itemChecked: false
            },
            beef: {
                name: "Ground Beef",
                price: 1,
                itemChecked: false
            },
            anchovy: {
                name: "Anchovy",
                price: 1,
                itemChecked: false
            },
            chicken: {
                name: "Chicken",
                price: 1,
                itemChecked: false
            }
        },
        veggies: {
            tomato: {
                name: "Tomatoes",
                price: 1,
                itemChecked: false
            },
            onion: {
                name: "Onions",
                price: 1,
                itemChecked: false
            },
            olive: {
                name: "Olives",
                price: 1,
                itemChecked: false
            },
            pepper: {
                name: "Green Peppers",
                price: 1,
                itemChecked: false
            },
            mushroom: {
                name: "Mushrooms",
                price: 1,
                itemChecked: false
            },
            pineapple: {
                name: "Pineapple",
                price: 1,
                itemChecked: false
            },
            spinach: {
                name: "Spinach",
                price: 1,
                itemChecked: false
            },
            jalapeno: {
                name: "Jalapeno",
                price: 1,
                itemChecked: false
            }
        }
    };

    //on page load, calculate price at default selected values
    calculatePrice();


    //when back button pressed, return to previous menu
    $("#btn-back").on('click', function () {
        changeMenuSection("prev");
    });
    //when next button pressed, return to next menu
    $("#btn-next").on('click', function () {
        //if the button text is order, show the order summary
        if ($(this).text() == "Order") {
            console.log("workig");
            $("#topping-selection").hide();
            $(".order-box-buttons").hide();
            $("#topping-note").hide();
            $("#order-summary").show();
            displayOrderSummary();
        } else {
            changeMenuSection("next");
        }
    });

    //listens for any item that should update the current price
    $(".calcPrice").on('click', calculatePrice);

    //records a meat item as checked or unchecked
    $("input[name=meats-chkbox]").click(function () {
        if ($(this).prop('checked')) {
            pizzaPrice.meats[this.id].itemChecked = true;
        } else {
            pizzaPrice.meats[this.id].itemChecked = false;
        }
    });

    //records a veggie item as checked or unchecked
    $("input[name=veggie-chkbox]").click(function () {
        if ($(this).prop('checked')) {
            pizzaPrice.veggies[this.id].itemChecked = true;
        } else {
            pizzaPrice.veggies[this.id].itemChecked = false;
        }
    });

    //when a menu section is changed, change the currentMenuSectionIndex as needed
    //call function to hide sections not currently seen, and show the section changed to
    //if on the first section (index of 0), disable the back button
    function changeMenuSection(navigation) {
        if (navigation == "next") {
            currentMenuSectionIndex += 1;
            hideMenuSections();
            disableBackButton();
            changeToOrderButton();
            showToppingNote();
        } else if (navigation == "prev") {
            currentMenuSectionIndex -= 1;
            hideMenuSections();
            disableBackButton();
            changeToOrderButton();
            showToppingNote();
        }
    };

    //hides menu sections that are not the currently viewed section
    function hideMenuSections() {
        menuSelection.forEach(function (value, index) {
            if (index == currentMenuSectionIndex) {
                $(value).show();
            }
            else {
                $(value).hide();
            }
        })
    }
    //on the last menu section, change the text of the 'next' button to 'order'
    function changeToOrderButton() {
        if (currentMenuSectionIndex == menuSelection.length - 1) {
            $("#btn-next").text('Order');
        } else {
            $("#btn-next").text('Next');
        }
    }

    //on the last section, show the topping note, otherwise hide it.
    function showToppingNote() {
        if (currentMenuSectionIndex == menuSelection.length - 1) {
            $("#topping-note").show();
        } else {
            $("#topping-note").hide();
        }
    }

    //function that simply disables the back button if on the first menu section
    function disableBackButton() {
        if (currentMenuSectionIndex == 0) {
            $("#btn-back").prop("disabled", true);
        } else {
            $("#btn-back").prop("disabled", false);
        }
    }

    function calculatePrice() {
        //element variables
        var crustSelection = $('input[name=crust-size-radio]:checked').attr('id');
        var stuffCrustSelected = $("input[id=stuffed]:checked").val();
        var extraCheestSelected = $("input[id=extraCheese]:checked").val();
        var numOfMeatSelected = $("input[name=meats-chkbox]:checked").length;
        var numOfVeggieSelected = $("input[name=veggie-chkbox]:checked").length;

        //crust cost
        crustCost = pizzaPrice.crust[crustSelection].price;

        //check if stuffed crust was selected
        if (stuffCrustSelected == "on") {
            stuffedCrustCost = pizzaPrice.crust.stuffed.price;
        } else {
            stuffedCrustCost = 0;
        }

        //check if extra cheese was selected
        if (extraCheestSelected == "on") {
            extraCheeseCost = pizzaPrice.cheese.extraCheese.price
        } else {
            extraCheeseCost = 0;
        }

        //meat cost
        if (numOfMeatSelected <= 1) {
            meatsCost = 0;
        } else {
            meatsCost = (numOfMeatSelected - 1) * 1;
        }

        //veggie cost
        if (numOfVeggieSelected <= 1) {
            veggiesCost = 0;
        } else {
            veggiesCost = (numOfVeggieSelected - 1) * 1;
        }

        //add up total
        totalCost = crustCost + stuffedCrustCost + extraCheeseCost + meatsCost + veggiesCost;

        //display current total
        $("#current-total").text("Current Total: $" + totalCost + ".00");
    }

    function displayOrderSummary() {
        var orderListElement = $("#order-summary-list");
        var crustSelection = $('input[name=crust-size-radio]:checked').attr('id');
        var stuffCrustSelected = $("input[id=stuffed]:checked").val();
        var extraCheestSelected = $("input[id=extraCheese]:checked").val();
        var numOfMeatSelected = $("input[name=meats-chkbox]:checked").length;
        var numOfVeggieSelected = $("input[name=veggie-chkbox]:checked").length;

        var orderItems = [];

        //

        //add crust to order summary
        orderItems.push(pizzaPrice.crust[crustSelection].name + " -- $" + pizzaPrice.crust[crustSelection].price + ".00");

        //add stuff to summary if selected
        if (stuffCrustSelected == "on") {
            orderItems.push(pizzaPrice.crust.stuffed.name + " -- +$" + pizzaPrice.crust.stuffed.price + ".00");
        }

        //add extra cheese to summary if selected
        if (extraCheestSelected == "on") {
            orderItems.push(pizzaPrice.cheese.extraCheese.name + " -- +$" + pizzaPrice.cheese.extraCheese.price + ".00");
        }

        //add meat items to the list
        if (numOfMeatSelected >= 1) {
            var meatKeys = Object.keys(pizzaPrice.meats);
            var freeMeat = false; //free meat item has not been added
            var meatString = "";
            meatKeys.forEach(function (value, index) {
                if (pizzaPrice.meats[value].itemChecked) {
                    //add first item as a free item
                    if (freeMeat == false) {
                        freeMeat = true;
                        orderItems.push(pizzaPrice.meats[value].name + " -- Free!");
                    } else { //add rest as single string 
                        meatString += pizzaPrice.meats[value].name + ", ";
                    }
                }
            });

            //only add meatString if there were more than 1 meat selected
            if (numOfMeatSelected > 1) {
                //remove the last comma and space.
                meatString = meatString.substring(0, meatString.length - 2);

                //add meatString to the orderItems array
                orderItems.push(meatString + " -- +$" + (numOfMeatSelected - 1) + ".00")
            }
        }

        //add veggie items to the list
        if (numOfVeggieSelected >= 1) {
            var veggieKeys = Object.keys(pizzaPrice.veggies);
            var freeVeggie = false; //free veggie item has not been added
            var veggieString = "";
            veggieKeys.forEach(function (value, index) {
                if (pizzaPrice.veggies[value].itemChecked) {
                    //add first item as a free item
                    if (freeVeggie == false) {
                        freeVeggie = true;
                        orderItems.push(pizzaPrice.veggies[value].name + " -- Free!");
                    } else { //add rest as single string 
                        veggieString += pizzaPrice.veggies[value].name + ", ";
                    }
                }
            });

            //only add veggieString is numOfVeggieSelected
            if (numOfVeggieSelected > 1) {
                //remove the last comma and space.
                veggieString = veggieString.substring(0, veggieString.length - 2);

                //add veggieString to the orderItems array
                orderItems.push(veggieString + " -- +$" + (numOfVeggieSelected - 1) + ".00")
            }
        }

        //add all items in orderItems as a list item to the order-list element
        orderItems.forEach(function (value, index) {
            $("<li/>").text(value).addClass("order-summary-list-item").appendTo(orderListElement);
        });

        //change 'current total' to 'final total'
        $("#current-total").text("Final Total: $" + totalCost + ".00");

    }



}); //document ready end