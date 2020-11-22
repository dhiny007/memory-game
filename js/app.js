var list = $(".card"); //get the list of cards
console.log(list.length);
var count = 0;
var timer = 0;
var timer1;
var timer2;
var timeInterval; // var to store the timer function

//Array of all the card values/classes.
var cards = ['fa fa-diamond', 'fa fa-plane', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-paper-plane-o', 'fa fa-diamond', 'fa fa-plane', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-paper-plane-o']

//function to trigger or start the timer
window.addEventListener('load', function() {

  timeInterval = setInterval(function() {
    timer++;
    timer1 = timer;
    timer2 = document.getElementById("timer").innerHTML = timer1 + "secs";
  }, 1000);
});

//function to shuffle the deck of cards
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Here i shuffle the array, so the position of each class is random in the array. Basically the position of a class in this array will be applied on the <i> class in that card. So if third position in this array is 'fa fa-diamond', then third card in the list will have diamond class.
cards = shuffle(cards)
$('.card').each(function(index) {
  //Replace the <i> class of each card with the corresponding value from the cards array.
  //First remove all the classes of the <i>
  $(this).find('i').removeClass();
  //Then add the appropriate class from the array position
  $(this).find('i').addClass(cards[index])
})

//Stores the class name of the currently open card so as to see if match happens when new card opens.
var openCardClassName;

//function to flip the card when a card is clicked.
$(".card").on('click', function() {

  // I am passing $(this) here because, this refers to the actual element itself. this is easier than giving it an id and getting the id back and passing it.
  flipFunction($(this));

});

function flipFunction(cardElement) {
  //If card already has open css class, means it is already open, so close it
  if (cardElement.hasClass('open')) {
    //Remove the open and show class, making the card flip back.
    if (openCardClassName) {
      openCardClassName = null;
    }
    cardElement.removeClass('open show');
    closeCard(cardElement);
  } else {
    //Add open and show css class to the card if it is not selected.
    cardElement.addClass('open show');
    openCard(cardElement);
  }
}

// Function called when opening new card (from flip function)
function openCard(cardElement) {
  // if openCardIconName has a value, this means another card is alredy open.
  if (openCardClassName) {

    //If openCardIconName has value, means this is the second card opening. This is counted as one move when user open two cards before they are checked for.
    increaseMoves();
    //Check if currently opened card element is equal to one in openCardValue
    var currentCardClassName = cardElement.find('i').attr('class');
    if (openCardClassName == currentCardClassName) {
      //This means the already open card and current card id match.
      cardMatched(openCardClassName);

    } else {
      //Else reset both the cards to closed state. since the match hasnt happened.
      // setTimeout here waits for 500 milliseconds before calling the function resetCard. This is so that the user sees both the cards they have opened, before the cards close back.
      setTimeout(function() {
        resetCards(openCardClassName, currentCardClassName);
      }, 500);
    }
  } else {
    //Assign openCardId to id of current card.
    //Each  card has a <i class="" in it. this is the icon class which gives value to the card like.. so <i class="fa fa-diamond"> has a diamond icon on the card. So, if another open card has the same class for <i>, means its a match
    openCardClassName = cardElement.find('i').attr('class');
    //$(cardElement).on('click',function(){
    //  increaseMoves();
    //})
  }
}

// Function called when closing open card (from flip function)
function closeCard() {
  increaseMoves();
}

// Called when cards matched with the passed id value.
function cardMatched(symbolclassName) {
  //Add match class to the cards with id.
  // This is the i element. the corresponding card is the parent element to this <i> element cos html is arranged like <div class="card"><i></i></div>
  // Remove the "fa " from each class because all classes for i have that. so removing that will only give fa-diamond for example, which is easier to do $() to find
  var basicClass = symbolclassName.replace("fa ", "");
  $('.' + basicClass).each(function() {
    $(this).parent().addClass('match');

  });

  // reset current open card
  openCardClassName = null;
  count++;
  //Check if all the cards in the list are matched.
  if ((count * 2) === list.length) {

    setTimeout(function() {
      var alertRestart = $('.hidden').show();
      $('.hidden').on('click', function() {
        location.reload();
      })
      window.alert("Congratulations!! Click the reset button to start a new game.Your game time was " + timer1 + " seconds.Your star rating was " + star2 + "..");
      clearInterval(timeInterval);
    }, 0);

  }
}


//Flip back the cards with ids 1 and 2 to the closed state.
function resetCards(className1, className2) {
  var basicClass1 = className1.replace("fa ", "");
  var basicClass2 = className2.replace("fa ", "");

  $('.' + basicClass1).each(function() {
    // This is the <i> element. the parent of this is the card. which is what we need to add css class to make it in close state again.
    $(this).parent().removeClass('open show');
  });
  $('.' + basicClass2).each(function() {
    $(this).parent().removeClass('open show');
  });
  // reset current open card
  openCardClassName = null;
}
var star2 = 3; //this is the variable that will be used to display the star rating to the user.
var intValue;

function increaseMoves() {
  //Get the current html value of the moves element
  var value = $('.moves').html();

  //Convert the value into integer so you can change it
  intValue = parseInt(value);
  //Increment value

  intValue++;

  console.log(intValue);
  //change the star rating to 2 if number of moves exceeds 17.
  if (intValue === 17) {
    var star = $('.stars').find('li');
    console.log(star.last().find('i'));
    star.last().remove();
    star2 = 2;
  }
  //Change the star rating to 1 if the number of moves exceeds 27.
  if (intValue === 27) {
    var star1 = $('.stars').find('li');
    console.log(star1);
    console.log(star1.last().find('i'));
    star1.last().remove();
    star2 = 1;
  }

  //Write it back to the html
  $('.moves').html(intValue);

}

//refresh the page on clicking restart.
$(".restart").on('click', function() {
  location.reload();
});
