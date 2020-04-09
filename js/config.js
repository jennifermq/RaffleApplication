/**
 * @author jennifermq
 */

// 初始化页面
let loadConfigPage = function () {
    // 初始化奖品个数
    for (let i = 1; i <= 3; i++) {
        let limit = JSON.parse(window.localStorage.getItem("limit" + i));
        if (limit) {
            $("#total" + i).val(limit);
        }
    }

    console.log("三等奖");
    console.log(window.localStorage.getItem("winList3"));

    console.log("二等奖");
    console.log(window.localStorage.getItem("winList2"));

    console.log("一等奖");
    console.log(window.localStorage.getItem("winList1"));

    console.log("特别奖");
    console.log(window.localStorage.getItem("winList4"));

    // 初始化抽奖标题
    let drawTitle = window.localStorage.getItem("drawTitle");
    $("#drawTitle").val(drawTitle);
};

// 清空奖池，重新抽奖
let resetDraw = function () {
    window.localStorage.removeItem("drawList");
    window.localStorage.removeItem("winList1");
    window.localStorage.removeItem("winList2");
    window.localStorage.removeItem("winList3");
    window.localStorage.removeItem("winList4");
    window.localStorage.removeItem("winList3_display");
    window.localStorage.removeItem("winList4_display");

    setNameList();
    _initWinList(["winList1", "winList2", "winList3", "winList4", "winList3_display", "winList4_display"]);

    console.log(window.localStorage);
    for (let i = 1; i <= 4; i++) {
        window.localStorage.setItem("actual" + i, "0");
    }
};

// 清空缓存，慎点！！
let clearStorage = function () {
    window.localStorage.clear();
    for (let i = 1; i <= 3; i++) {
        let limit = JSON.parse(window.localStorage.getItem("limit" + i));
        if (limit) {
            $("#total" + i).val(limit);
        }
    }
    _initWinList(["winList1", "winList2", "winList3", "winList4", "winList3_display", "winList4_display"]);
    setNameList();
    for (let i = 1; i <= 4; i++) {
        window.localStorage.setItem("actual" + i, "0");
    }
    console.log(window.localStorage);
};

// 初始化localStorage中的列表
let _initWinList = function (listNames) {
    $.each(listNames, function (_, listName) {
        let winList = window.localStorage.getItem(listName);
        if (!winList) {
            window.localStorage.setItem(listName, JSON.stringify([]));
        }
    });
};

// 初始化localStorage中每种奖项的最大个数
let setPrizeTotal = function () {
    for (let i = 1; i <= 3; i++) {
        let limit = $("#total" + i).val();
        if (limit) {
            window.localStorage.setItem("limit" + i, limit);
            console.log(window.localStorage.getItem("limit" + i));
        }
    }
};

// 初始化抽奖标题
let setDrawTitle = function() {
    let drawTitle = $("#drawTitle").val();
    window.localStorage.setItem("drawTitle", drawTitle);
};

// 重置抽奖名单，可能导致有人重复获奖
let setNameList = function () {
    // console.log(namelist);
    window.localStorage.setItem("drawList", JSON.stringify(namelist));
    window.localStorage.setItem("people", JSON.stringify(namelist.length));
    console.log(JSON.parse(window.localStorage.getItem("drawList")).length);
};

let exportPrizeList = function () {
    let content = "一等奖\n";
    content += window.localStorage.getItem("winList1") + "\n";
    content += "二等奖\n";
    content += window.localStorage.getItem("winList2") + "\n";
    content += "三等奖\n";
    content += window.localStorage.getItem("winList3") + "\n";
    content += "特别奖\n";
    content += window.localStorage.getItem("winList4_display") + "\n";
    console.log(content);
};