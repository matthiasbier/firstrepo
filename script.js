function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}


function InitializeCanvas() {
    loadjscssfile("https://cdn.datatables.net/v/bs-3.3.7/jq-2.2.4/dt-1.10.15/datatables.min.css", "css");
    

    var mytable = document.createElement("table");
    mytable.id = "example";
    mytable.className = "display";
    mytable.width = "100%";
    document.getElementById("controlAddIn").appendChild(mytable);
}

$(document).ready(function () {
    InitializeCanvas();
});

function getCellContent(data, type, full, meta) {
    if (data == 'frei') {
        var tthtml = '<div><b>Price</b>: ' + full.days[meta.col - 1].price + '</div>';
        return '<span data-toggle="tooltip" data-html="true" title="' + tthtml + '">' + full.days[meta.col - 1].price + '</span>';
    } else {
        var tthtml = '<div><b>Reservation</b>:<br />Mr. Mustermann, Mrs. Mustermann<br />01.02.2017 - 02.07.2017</div>';
        return '<span data-toggle="tooltip" data-html="true" data-placement="auto" title="' + tthtml + '">' + data + '</span>';
    }

}
function ShowMultilineText(textData) {

    var startdate = new Date();
    var enddate = new Date();
    enddate.setDate(startdate.getDate() + 12);
    var daysOfYear = [];
    var dates = [];
    var dateoptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    for (var d = startdate; d < enddate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d).toLocaleDateString('de-De', dateoptions));
    }
    textData = textData.replace(/@/g, "");
    
    var resv = JSON.parse(textData);

    var options = {
        data: resv.root.room,
        searching: false, ordering: false, paging: false,
        columnDefs: []
    };
    options.columnDefs.push(
    { targets: 0, "data": "Name", "title": "Raum" }
    );
    for (var i = 0; i < (dates.length) ; i++) {
        var dayIndex = "days." + (i).toString() + ".test";
        var dayIndex = "Days.Day."+ (i).toString() + ".DayNo";
        options.columnDefs.push(
        {
            "targets": i + 1, "data": dayIndex, "title": dates[i],
            "render": function (data, type, full, meta) {
                return getCellContent(data, type, full, meta);
            },
            "createdCell": function (td, cellData, rowData, row, col) {
                if (col == 0) {
                    $(td).addClass("roomColumn");
                    exit;
                }
                var cssClass = "dayColumn class";
                if (col >= 2) {
                    if (rowData.Days.Day[col -2].DayNo.Reservation.EntryNo == "") {
                        cssClass += "0";
                    } else {
                        cssClass += "1";
                    }
                } else {
                    cssClass += "1";
                }
                if (rowData.Days.Day[col -1].DayNo.Reservation.EntryNo == "") {
                    cssClass += "0";
                } else {
                    cssClass += "1";
                }
                if (col < 11) {
                    if (rowData.Days.Day[col].DayNo.Reservation.EntryNo == "") {
                        cssClass += "0";
                    } else {
                        cssClass += "1";
                    }
                } else {
                    cssClass += "1";
                }
                $(td).addClass(cssClass);
            }
        }
      );
    }
    $('#example').dataTable(options);
    $('[data-toggle="tooltip"]').tooltip();
    //$('#example').dataTable({
    //    "data": resv.root.room
    //    ,
    //    "columns": [
    //{ "data": "Name", "title": "Raum" },
    //{"data": "Days.Day.0.@DayNo"}
    ///*,{ "data": "day1.test", "title" : dates[0]},
    //{ "data": "day2.test", "title" : dates[1]},
    //{ "data": "day3.test", "title" : dates[2]}*/
    //    ],
        
    //});
}
function ShowRawHtml(htmData){
    var htmlDiv = document.createElement("div");
    htmlDiv.id = "htmlDiv";
    htmlDiv.innerHTML = htmlData;
    document.getElementById("controlAddIn").appendChild(htmlDiv);
}

function SetHeightToMax() {
    var frameElem = $(window.frameElement);
    if (frameElem.length !== 0) {
        var myscrollContainer = $(frameElem).closest('.ms-nav-scrollable');
        if (myscrollContainer.length !== 0) {
            $(frameElem).css('height', $(myscrollContainer).css('max-height'));            
        }
    }
}

function SetHeightTo(pixel) {
    var frameElem = $(window.frameElement);
    if (frameElem.length !== 0) {
        $(frameElem).css('height', pixel + 'px');        
    }
}

