/**
 * @author jennifermq
 */

let maxRow = 7;

let loadPage = function() {
    let winListDisplay = JSON.parse(window.localStorage.getItem("winList3_display"));
    let total_len = winListDisplay.length;
    let total_page = Math.ceil(total_len / maxRow);
    for(let page = 1; page <= total_page; page++){
        $("#pageNum").append('<button class="page" onclick="loadPrizeList(3, ' + page + ')">' + page + '</button>');
    }
    loadPrizeList(3, 1)
};

let loadPrizeList = function(level, current_page) {
    if(level === 3) {
        let winListText = "";
        let winList = JSON.parse(window.localStorage.getItem("winList3"));
        console.log(winList);
        let actual = JSON.parse(window.localStorage.getItem("actual3"));
        let winListDisplay = JSON.parse(window.localStorage.getItem("winList3_display"));
        let total_len = winListDisplay.length;
        let total_page = Math.ceil(total_len / maxRow);
        winListDisplay = winListDisplay.slice((current_page - 1) * maxRow, current_page * maxRow);
        $("#page").html("(" + current_page + "/" + total_page + ")");
        $.each(winListDisplay, function(index, item){
            winListText += generateListRow3(index, item);
        });
        $("#thirdPrizeListTable").html(winListText);
        $("#totalThirdPrize").html("(共" + actual + "名)")
    } else if(level === 4) {
        let winListText = "";
        let winList = JSON.parse(window.localStorage.getItem("winList4"));
        console.log(winList);
        let winListDisplay = JSON.parse(window.localStorage.getItem("winList4_display"));
        $.each(winListDisplay, function(index, item){
            winListText += generateListRow4(index, item);
            winListText += "<tr></tr>";
        });
        console.log(winListText);
        $("#forthPrizeListTable").html(winListText);
    }
};

let generateListRow3 = function(count, item) {
    let html = "<tr>";
    let normal = item.normal;
    $.each(normal, function(index, item) {
        html += "<td>" + item + "&nbsp;&nbsp;&nbsp;</td>";
    });

    let add = item.add;
    $.each(add, function(index, item) {
        html += "<td class='orange'>" + item + "&nbsp;&nbsp;&nbsp;</td>";
    });
    html += "</tr>";
    return html;
};

let generateListRow4 = function(index, item) {
    let html = "<tr><td>第 " + (index + 1) + " 组</td></tr>";
    html += "<tr><td>";
    $.each(item, function(index, item) {
        html += item + "&nbsp;&nbsp;&nbsp;";
        if (index !== 0 && 0 === (index+1) % 10) {
            html += "<br>";
        }
    });
    html += "</td></tr>";
    return html;
};
