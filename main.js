var ow = new OpenWordsAPI();
var customcss = false;
var boardcompleted = true;


document.addEventListener("DOMContentLoaded", function() {
    if (window.localStorage.getItem("lastKnownWord") != correctWord) {
        ow.clearBoard();
    }
    try {
        if (window.localStorage.getItem("customCSS").startsWith("https://")) {
            $("#customCssInput").val(window.localStorage.getItem("customCSS"));
            var gscss = $("<link />",{
                rel: "stylesheet",
                type: "text/css",
                href: window.localStorage.getItem("customCSS")
            })
            $("head").append(gscss);
            ow.log("Applied custom CSS.","CSS")
            customcss = true;
        } else {
            ow.log("No custom CSS applied.","CSS")
        }
    } catch (e) {
        ow.log("No custom CSS applied.","CSS")
    }

    ow.loadRepoInfo();
    
    var initCurrentRow = 0;
    for (i = 0; i < 6; i++) {
        initCurrentRow++
        for (ia = 0; ia <= 5; ia++) {
            var itemname = "letterBoxR" + initCurrentRow + "C" + ia;
            $("#" + itemname).html(window.localStorage.getItem(itemname));
            if (window.localStorage.getItem("S" + itemname) == "correct") {
                $("#letterBoxR" + initCurrentRow + "C" + (ia)).removeClass("letter-empty");
                $("#letterBoxR" + initCurrentRow + "C" + (ia)).addClass("letter-correct");
            }
            if (window.localStorage.getItem("S" + itemname) == "wrongpos") {
                $("#letterBoxR" + initCurrentRow + "C" + (ia)).removeClass("letter-empty");
                $("#letterBoxR" + initCurrentRow + "C" + (ia)).addClass("letter-wrongpos");
            }
        }
    }

});

window.onload = () => {
    initCurrentRow = window.localStorage.getItem("currentRow");
    if (initCurrentRow == null) {
        initCurrentRow = 1;
    }

    var i = 2;
    while (i <= initCurrentRow){
        $("#row" + i + "Collapse").collapse("show");
        i++
    }

    if (customcss == true) {
        $("#settingsCustomCSSCollapse").collapse("show");
        $("#settingsCustomCSS")[0].checked = true;
    }


$(".keybBtn").click(function() {
    addLetter($(this).html());
})
$(".backspaceBtn").click(function() {
    delLetter($(this).html());
})
$(".enterBtn").click(function() {
    sendEnter($(this).html());
})
}


var boardcompletedl = window.localStorage.getItem("boardcompleted");
if (boardcompletedl == "true") {
    boardcompleted = true;
} else if (boardcompletedl == "false") {
    boardcompleted = false;
} else {
    boardcompleted = false;
}
var currentRow = window.localStorage.getItem("currentRow");
if (currentRow == null) {
    currentRow = 1;
}
if (currentRow == 0) {
    currentRow = 1;
}

var correctWord = ow.getTodayWord;


function addLetter(letter) {
    window.localStorage.setItem("lastKnownWord", correctWord);
    if (boardcompleted == false) {
        for (var i = 0; i < 5; i++) {
            if ($("#letterBoxR" + currentRow + "C" + (i + 1)).html() == "") {
                $("#letterBoxR" + currentRow + "C" + (i + 1)).html(letter);
                    window.localStorage.setItem("letterBoxR" + currentRow + "C" + (i + 1), letter);
                    break;
                }
            }
        }
}

function delLetter() {
    if (boardcompleted == false) {
        var rowLastLetter = $("#letterBoxR" + currentRow + "C5").html();
        for (var i = 0; i < 5; i++) {
            if ($("#letterBoxR" + currentRow + "C" + (i + 1)).html() == "") {
                rowLastLetter = i
                break;
            }
        }
    
        if (rowLastLetter == 0) {
            $("#letterBoxR" + currentRow + "C1").html("");
            window.localStorage.setItem("letterBoxR" + currentRow + "C1", "");
        } else if (rowLastLetter >= 1 && rowLastLetter <= 4) {
            $("#letterBoxR" + currentRow + "C" + rowLastLetter).html("");
            window.localStorage.setItem("letterBoxR" + currentRow + "C" + rowLastLetter, "");
        } else {
            $("#letterBoxR" + currentRow + "C5").html("");
            window.localStorage.setItem("letterBoxR" + currentRow + "C5", "");
        }
    }
}

function sendEnter() {
    var currentWord = $("#letterBoxR" + currentRow + "C1").html() + $("#letterBoxR" + currentRow + "C2").html() + $("#letterBoxR" + currentRow + "C3").html() + $("#letterBoxR" + currentRow + "C4").html() + $("#letterBoxR" + currentRow + "C5").html()
        if (currentWord.length == 5 && boardcompleted == false) {
            if (currentRow == 6) {
                boardcompleted = true;
                boardcompleted = window.localStorage.setItem("boardcompleted", true);
            }
            
            for (var i = 0; i < 5; i++) {
                if ($("#letterBoxR" + currentRow + "C" + (i + 1)).html() == correctWord[i]){
                    $("#letterBoxR" + currentRow + "C" + (i + 1)).removeClass("letter-empty");
                    $("#letterBoxR" + currentRow + "C" + (i + 1)).addClass("letter-correct");
                    window.localStorage.setItem("SletterBoxR" + currentRow + "C" + (i + 1), "correct");
                } else {
                    for (var ia = 0; ia < 5; ia++) {
                        if ($("#letterBoxR" + currentRow + "C" + (i + 1)).html() == correctWord[ia]) {
                            $("#letterBoxR" + currentRow + "C" + (i + 1)).removeClass("letter-empty");
                            $("#letterBoxR" + currentRow + "C" + (i + 1)).addClass("letter-wrongpos");
                            window.localStorage.setItem("SletterBoxR" + currentRow + "C" + (i + 1), "wrongpos");
                        }
                    }
                }
            }

            ow.log("Input: " + currentWord,"GAME")
            if (currentWord == correctWord) {
                window.localStorage.setItem("lastCompletedGame", new Date());
                boardcompleted = true;
                window.localStorage.setItem("boardcompleted", true);
                $("#victoryModal").modal("show");
                $(".modalCorrectWord").html(correctWord);
                if (currentRow == 1) {
                    $(".attemptsnumber").html("1st");
                } else if (currentRow == 2) {
                    $(".attemptsnumber").html("2nd");
                } else if (currentRow == 3) {
                    $(".attemptsnumber").html("3rd");
                } else {
                    $(".attemptsnumber").html(currentRow + "th");
                }
                
            } else {
                currentRow++;
                window.localStorage.setItem("currentRow", currentRow);
                $("#row" + currentRow + "Collapse").collapse("show");
            }

        }
}


document.addEventListener("keyup", function(e) {
    if ((e.keyCode >= 65) && (e.keyCode <= 90)) {
        addLetter(e.key.toLocaleUpperCase());
    }

    if (e.keyCode == 8) {
        delLetter();
    }

    if (e.keyCode == 13) {
        sendEnter();
    }
})