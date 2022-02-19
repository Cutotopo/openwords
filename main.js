var ow = new OpenWordsAPI();



document.addEventListener("DOMContentLoaded", function() {
    if (window.localStorage.getItem("lastKnownWord") != correctWord) {
        ow.clearBoard();
    }
    
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
}


var boardcompleted = window.localStorage.getItem("boardcompleted");
if (boardcompleted == null) {
    boardcompleted = false;
}
var currentRow = window.localStorage.getItem("currentRow");
if (currentRow == null) {
    currentRow = 1;
}

var correctWord = "hello".toLocaleUpperCase();


document.addEventListener("keyup", function(e) {
    if ((e.keyCode >= 65) && (e.keyCode <= 90)) {
        window.localStorage.setItem("lastKnownWord", correctWord);
        if (boardcompleted == false) {

            for (var i = 0; i < 5; i++) {
                if ($("#letterBoxR" + currentRow + "C" + (i + 1)).html() == "") {
                    $("#letterBoxR" + currentRow + "C" + (i + 1)).html(e.key.toLocaleUpperCase());
                    window.localStorage.setItem("letterBoxR" + currentRow + "C" + (i + 1), e.key.toLocaleUpperCase());
                    break;
                }
            }
    }
}

    if (e.keyCode == 8) {
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

    if (e.keyCode == 13) {
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

            console.log(currentWord);
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
})