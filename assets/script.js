// display current date on page
setInterval(function () {
  $("#currentDay").html(currentDate + ` `);
});

// use moment to get current date
var currentDate =
  moment().format("dddd") + ` ` + moment().format(`Do MMM YYYY`);

// variables for each block in military time
var nineAm = $(`#9am`);
var tenAm = $(`#10am`);
var elevenAm = $(`#11am`);
var twelvePm = $(`#12pm`);
var onePm = $(`#13pm`);
var twoPm = $(`#14pm`);
var threePm = $(`#15pm`);
var fourPm = $(`#16pm`);
var fivePm = $(`#17pm`);
var hour = moment().hours();

// on load if there is data set in local storage it will grab it and display in the corresponding block
function loadPage() {
  var init9 = JSON.parse(localStorage.getItem(`09:00 am`));
  nineAm.val(init9);
  var init10 = JSON.parse(localStorage.getItem(`10:00 am`));
  tenAm.val(init10);
  var init11 = JSON.parse(localStorage.getItem(`11:00 am`));
  elevenAm.val(init11);
  var init12 = JSON.parse(localStorage.getItem(`12:00 pm`));
  twelvePm.val(init12);
  var init13 = JSON.parse(localStorage.getItem(`01:00 pm`));
  onePm.val(init13);
  var init15 = JSON.parse(localStorage.getItem(`02:00 pm`));
  twoPm.val(init15);
  var init3 = JSON.parse(localStorage.getItem(`03:00 pm`));
  threePm.val(init3);
  var init4 = JSON.parse(localStorage.getItem(`04:00 pm`));
  fourPm.val(init4);
  var init5 = JSON.parse(localStorage.getItem(`05:00 pm`));
  fivePm.val(init5);
}

// will check the time and set the background color of each block according to what time it currently is
function backGround() {
  $(`.form-control`).each(function () {
    var timeTest = parseInt($(this).attr(`id`));
    hour = parseInt(hour);
    // if the block is in the past it will be grey, if the block is in the present it will be red, if the block is in the future it will be green
    if (hour > timeTest) {
      $(this).addClass(`past`);
    } else if (hour < timeTest) {
      $(this).addClass(`future`);
    } else {
      $(this).addClass(`present`);
    }
  });
}

// when save button is clicked it will collect the data from the userInput and which hourSpan it is in, then it will save it to local storage
function saveButton() {
  userInput = $(this).siblings(`.form-control`).val().trim();
  hourSpan = $(this).siblings(`.input-group-prepend`).text().trim();
  localStorage.setItem(hourSpan, JSON.stringify(userInput));
}

// when clear button is clicked the local storage will be cleared
function clearButton() {
  localStorage.clear();
  loadPage();
}

// when the page is loaded it initializes the loadPage and backGround function as well as allow the buttons to be clicked to initialize their own functions
$(document).ready(function () {
  loadPage();
  backGround();
  $(`.saveBtn`).on(`click`, saveButton);
  $(`#clearBtn`).on(`click`, clearButton);
});
