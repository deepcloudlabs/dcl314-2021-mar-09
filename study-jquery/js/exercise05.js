$("document").ready(() => {
    $("#movies tr").each(function(){
        let numberOfDirectors = $(this).find("td:eq(2) a").length;
        if (numberOfDirectors < 2)
            $(this).hide();
    });
})