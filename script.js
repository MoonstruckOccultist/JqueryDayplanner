// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var tBlock = document.querySelectorAll('.time-block');
var cDay = $('#currentDay');
var saveConf = $('#saveConf');
var saveBtn = $('.saveBtn');


$(function () {
  // event listener checking save button clicks, will execute code to obtain the user's input and store thatl locally
  saveBtn.on('click', function (event) {
    var targ = event.target;
    // if they click on the symbol it could cause problems if i didn't ensure targ = the button
    if (targ.localName == "i") {
      targ = targ.parentElement;
    }
    var hrNum = targ.parentElement.id;

    var task = $(`#${hrNum}`).children('textarea')[0].value;

    // displays a message that the task was saved succesfully
    var confClock = 1;
    if (task.length > 0) {
      localStorage.setItem(`${hrNum}`, JSON.stringify(task))
      saveConf.text("task succesfully saved");
      confClock = 1;
      var showConf = setInterval(function () {
        if (confClock > 0) {
          confClock--;
        } else {
          saveConf.text("");
          clearInterval(showConf);
        }
      }, 1000);
    }
  })

  var currentHr = dayjs().format('h');
  var ampmCheck = dayjs().format('H');

  // checks if it is currently within the hours shown between 9-5
  if (ampmCheck > 8 && ampmCheck < 18) {
    // find present and set past present or future
    var thePresent = "";
    for (var i = 0; i < 9; i++) {
      var hrIdCheck = tBlock[i].id.split("-")[1];
      if (hrIdCheck == currentHr) {
        thePresent = tBlock[i];
      }
    }

    // will color code anything determined as the past by changing the class
    var xPast = ampmCheck - 9;
    for (var n = 0; xPast > n; n++) {
      tBlock[n].classList.remove("present");
      tBlock[n].classList.remove("future");
      tBlock[n].classList.add("past");
    }
    // will color code anything determined as the future by changing the class
    var xFuture = 17 - ampmCheck;
    var h = 8
    for (var i = 0; i < xFuture; i++) {
      tBlock[h].classList.remove("present");
      tBlock[h].classList.remove("past");
      tBlock[h].classList.add("future");
      h--;
    }
     // will color code what was determined as the present by changing the class
    thePresent.classList.remove("past");
    thePresent.classList.remove("future");
    thePresent.classList.add("present");

  } else if (ampmCheck < 9) {
    // if app opened ealier than 9am, will color code everything as the future via class change
    for (var a = 0; 9 > a; a++) {
      var soloTB = tBlock[a];
      var STBtense = soloTB.classList[2];
      if (STBtense == "present") {
        soloTB.classList.remove("present");
        soloTB.classList.add("future")
      }
      if (STBtense == "past") {
        soloTB.classList.remove("past");
        soloTB.classList.add("future");
      }
    }
  } else {
    // if app opened later than 5pm, will color code everything as the future via class change
    for (var p = 0; 9 > p; p++) {
      var soloTB = tBlock[p];
      var STBtense = soloTB.classList[2];
      if (STBtense == "present") {
        soloTB.classList.remove("present");
        soloTB.classList.add("past")
      }
      if (STBtense == "future") {
        soloTB.classList.remove("future");
        soloTB.classList.add("past");
      }
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  for (var i = 0; i < 9; i++) {
    var savedTask = JSON.parse(localStorage.getItem(tBlock[i].id));
    console.log(savedTask)
    if (savedTask != null) {
      $(`#${tBlock[i].id}`).children('.description').text(savedTask);
    }
  }


  // TODO: Add code to display the current date in the header of the page.
  cDay.text(dayjs().format('dddd, MMMM DD'))

});
