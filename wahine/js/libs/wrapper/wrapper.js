var gup = function (str) {
  var val = "";
  switch (str) {
    case "gname":
      val = 'wahine';
      break;
    default:
      val = "";
  }
  return val;
};

// In this example the following parameters are passed through the URL, but should be looked up appropriately as needed by the host system.
var serverAddress = gup("server"); //The IP address and port of the GDM game servers
var playerName = gup("pid"); //The player ID
var gameName = gup("gname"); //Name of the game to load
var directory = gup("dir"); //Tells the wrapper where to load the game from.
var delay = gup("delay") == "" ? "0" : gup("delay");

// -------- GAME API-----------------
// var languageCode = "en";       //Tells the game which language to load.
var languageCode = gup("lcode") == "" ? "en" : gup("lcode"); //Tells the wrapper where to load the game from.

//-----------------------------------

// ----------- WRAPPER API -------------
// The game will call this function when the home button is pressed.
// --------------------------------------
function homeButtonPressed() {
  console.log("wrapper#homeButtonPressed()");
  //TODO: Insert any code here specific to what you want to happen when the HOME button is pressed in the game.
  //          var mywindow = window.open("http://camilla.nextgengaming.com/launch/mobile");

  //if we want to let the game handle the home button press then return 0.
  // Return 1 if the button is handled here in the wrapper. (returning 0 will open the in-game option screen)
  return 0;

  //location.replace("http://camilla.nextgengaming.com/launch/mobile");
  //return 1;
}

function valueChanged(name, value) {
  console.log("wrapper#valueChanged()");
  console.log(name + ": " + value);
}

// ----------- WRAPPER API -------------
// The game will call this function when the game button is pressed.
// --------------------------------------
function gameButtonPressed(buttonID) {
  // console.log('wrapper#gameButtonPressed()', buttonID)
  //TODO: Insert any code here specific to what you want to happen when the PLAY SLOT button is pressed in the game.
  if (buttonID == "PLAY_SLOT") {
    //gameiframe.contentWindow.apiExt(buttonID, function(){});
    gameiframe.contentWindow.apiExt(
      buttonID,
      "Confirm",
      "Are you sure you want to play slot?",
      function () {}
    );
  } else if (buttonID == "CASHIER") {
    gameiframe.contentWindow.apiExt("MSG_POP_UP", "", "Cashier button pressed");
  }
}

// ----------- WRAPPER API -------------
// The game will call this function when all the assets are loaded.
// --------------------------------------
function gameReady() {
  // console.log('wrapper#gameReady()')
  document.title = gameiframe.contentWindow.document.title;
  // gameiframe.contentWindow.apiExt("HIDE_PORTRAIT_MODE", false);
  gameiframe.contentWindow.apiExt("SET_AUTOPLAY_STOP_OPTIONS", 2);
  gameiframe.contentWindow.apiExt("SET_MAX_AUTOPLAYS", 100);
  gameiframe.contentWindow.apiExt("SHOW_CASHIER_BUTTON", true);
  // gameiframe.contentWindow.apiExt("SHOW_HOME_BUTTON", false);
  // gameiframe.contentWindow.apiExt("PAUSE_AUTOPLAY", true);

  // gameiframe.contentWindow.apiExt("SET_CREDIT_CURRENCY", true);

  // gameiframe.contentWindow.apiExt("SHOW_BUTTON", "CASHIER_SETTINGS", false);
  // gameiframe.contentWindow.apiExt("CONFIRM_POP_UP",  "EXIT", "Are you sure you want to leave the game?", function() {alert("111")});
  // gameiframe.contentWindow.apiExt("SHOW_HOME_BUTTON", false);
  customGameReady();
}

// ----------- WRAPPER API -------------
// This function is called by the game to find out to what scale it needs to set itself to.
// --------------------------------------
function getSize() {
  console.log("wrapper#getSize()");
  // const div = document.getElementById('slot-preview')
  console.log(">>>>>" + document.getElementById("gameiframe").offsetWidth);

  return customGetSize();
}

// ----------- WRAPPER API -------------
// error notification from within the game
// --------------------------------------
function error(error_code) {
  console.log("wrapper#error()");
  // TODO: Do any special error handling here in the wrapper based on the error code.
  // (the game will display an error message)
  console.log(error_code);
}

// ----------- WRAPPER API -------------
// The game will call this function when it needs to send a message to the server.
// TODO: Update this function to suit your communication layer requirements.
// --------------------------------------
const mockServer = window.mockServer();

function sendMsgToServer(gameMsg) {
  mockServer.send(gameMsg);
}

// loadgame() function
$(function () {
  //gameiframe is declared in mobile.js file
  gameiframe = document.getElementById("gameiframe");
  //TODO: Set the correct location of the game's index file.
  gameiframe.src = "./" + gameName + ".html";
  initIframe();
});
