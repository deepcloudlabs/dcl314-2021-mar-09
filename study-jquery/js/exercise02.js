$("document").ready(() => {
    $("#movies tbody tr:even").css("border", "solid 2px blue");
    $("#movies tbody tr:odd").css("border", "solid 2px red");
    $(".panel-heading").css("border", "solid 5px green");
})