var todayWord = "HELLO";

class OpenWordsAPI {
    constructor() {

    }
    get getTodayWord() {
      return todayWord;
    }
    clearBoard() {
      window.localStorage.setItem("boardcompleted", false);
      window.localStorage.setItem("currentRow", 0);
        $(".letter").html("");
        var scriptCurrentRow = 0;
        /* for (i = 0; i < 6; i++) {
        scriptCurrentRow++
        for (ia = 0; ia <= 5; ia++) {
            var itemname = "letterBoxR" + scriptCurrentRow + "C" + ia;
            window.localStorage.setItem(itemname, "");
            window.localStorage.setItem("S" + itemname, "");
        }
    } */
    }
    copyResultToClipboard() {
      navigator.clipboard.writeText("I guessed the word " + todayWord + " on OpenWords!");
    }
    launchGitPage() {
      window.open("https://github.com/Cutotopo/OpenWords", "_blank");
    }
    launchGitIssues() {
      window.open("https://github.com/Cutotopo/OpenWords/issues", "_blank");
    }
  }

function toggleCustomCSSTheme() {
    if ($("#settingsCustomCSS")[0].checked == true) {
        $("#settingsCustomCSSCollapse").collapse("show");
        window.localStorage.setItem("customCSS", $("#customCssInput").val(""));
    } else {
      $("#settingsCustomCSSCollapse").collapse("hide");
      $("#customCssInput").val("");
      window.localStorage.setItem("customCSS", "");
      }
}

function applyCustomCSS() {
  window.localStorage.setItem("customCSS", $("#customCssInput").val());
  window.location.reload();
}