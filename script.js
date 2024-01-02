// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var tBlock = document.querySelectorAll('.time-block');
var cDay = $('#currentDay');
var saveConf = $('#saveConf');
var saveBtn = $('.saveBtn');


// var currentHr = dayjs().format('h');
// console.log(currentHr);
// var soloTB = tBlock[0];
// var STBtense = soloTB.classList[2];
// console.log(STBtense);
// if (STBtense != "future") {
//   STBtense = "future";
//   console.log(STBtense);
//   console.log(soloTB);

// }


$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  saveBtn.on('click', function (event) {
    var targ = event.target;
    if (targ.localName == "i") {
      targ = targ.parentElement;
    }
    var hrNum = targ.parentElement.id;
    console.log(hrNum);
    var task = $(`#${hrNum}`).children('textarea')[0].value;

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
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var currentHr = dayjs().format('h');
  // var ampmCheck = dayjs().format('H');
  var ampmCheck = 11;
  if (ampmCheck > 8 && ampmCheck < 18) {
    // find present and set past present or future
    // for tblock[i].id
    var thePresent = "";
    for (var i = 0; i < 9; i++) {
      var hrIdCheck = tBlock[i].id.split("-")[1];
      console.log(hrIdCheck);
      if (hrIdCheck == currentHr) {
        thePresent = tBlock[i];
      }
    }
    console.log(thePresent);

    var xPast = ampmCheck - 9;
    for (var n = 0; xPast > n; n++) {
      tBlock[n].classList.remove("present");
      tBlock[n].classList.remove("future");
      tBlock[n].classList.add("past");
    }
    var xFuture = "";
    // Figure out how to call from the end of an array and how to set up xFuture

    thePresent.classList.remove("past");
    thePresent.classList.remove("future");
    thePresent.classList.add("present");

  } else if (ampmCheck < 9) {
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
  //
  // TODO: Add code to display the current date in the header of the page.
  var day = dayjs();
});
