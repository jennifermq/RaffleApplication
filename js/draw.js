/**
 * @author jennifermq
 */

let drawStatus = "停止";
let winName = "奖";
let winList3 = [];
let roundList3 = [];
let winIndex = null;
let winListText = "";
let intervalName = "";
let level = 0;

let list3Template = '<table class="center"><tr><td>{0} </td><td>{1} </td><td>{2} </td><td>{3} </td><td>{4} </td></tr>' +
    '<tr><td>{5} </td><td>{6} </td><td>{7} </td><td>{8} </td><td>{9} </td></tr>' +
    '<tr><td>{10} </td><td>{11} </td><td>{12} </td><td>{13} </td><td>{14} </td></tr>' +
    '<tr><td>{15} </td><td>{16} </td><td>{17} </td><td>{18} </td><td>{19} </td></tr></table>';

let generate3Table = function (list) {
    return list3Template.format(list[0] || "", list[1] || "", list[2] || "", list[3] || "", list[4] || "",
        list[5] || "", list[6] || "", list[7] || "", list[8] || "", list[9] || "",
        list[10] || "", list[11] || "", list[12] || "", list[13] || "", list[14] || "",
        list[15] || "", list[16] || "", list[17] || "", list[18] || "", list[19] || "")
};

String.prototype.format = String.prototype.f = function () {
    let s = this,
        i = arguments.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

let loadPage = function (prizeLevel) {
    window.localStorage.setItem("document", "draw");
    level = prizeLevel;
    // 将抽奖标题中的所有空格替换为&nbsp;
    let drawTitle = window.localStorage.getItem("drawTitle");
    drawTitle = drawTitle.replace(new RegExp(' ', 'gm'), "&nbsp;");
    $("#drawTitle").html(drawTitle);

    if (prizeLevel === 0) {
        return;
    }
    //初始化中奖数字
    if (prizeLevel !== 3) {
        $("#win-num").html(winName);

    } else {
        let list = [];
        for (let i = 0; i < 20; i++) {
            list.push("奖 ")
        }
        $("#win-num-" + prizeLevel).html(generate3Table(list));
    }

    //显示之前抽到过的名单，特别奖不显示
    if (prizeLevel !== 4) {
        let winList = JSON.parse(window.localStorage.getItem("winList" + level));
        if (winList && prizeLevel !== 3) {
            $.each(winList, function (_, num) {
                winListText += "<div>" + num + " </div>";
            });
        }
    } else {
        let winListDisplay = JSON.parse(window.localStorage.getItem("winList4_display"));
        let len = winListDisplay.length;
        if (winListDisplay[len - 1] === []) {
            winListText = "";
        } else {
            $.each(winListDisplay[len - 1], function (_, item) {
                winListText += "<div>" + item + " </div>";
            });
        }
    }
    $("#win-list").html(winListText);
};

let drawWinner = function () {
    if (drawStatus === "停止") {
        let limit = JSON.parse(window.localStorage.getItem("limit" + level));
        let actual = JSON.parse(window.localStorage.getItem("actual" + level));
        let len1 = JSON.parse(window.localStorage.getItem("winList1")).length;
        let len2 = JSON.parse(window.localStorage.getItem("winList2")).length;
        let len3 = JSON.parse(window.localStorage.getItem("winList3")).length;
        let len4 = JSON.parse(window.localStorage.getItem("winList4")).length;
        let people = JSON.parse(window.localStorage.getItem("people"));

        if (len1 + len2 + len3 + len4 >= people) {
            alert("所有人都有奖品了哦");
        } else if (level <= 3 && actual >= limit) {
            alert("该奖项获奖人数已达上限");
        } else {
            drawStatus = "开始";
            startDraw();
        }
    } else if (drawStatus === "开始") {
        drawStatus = "停止";
        stopDraw();
    }
};

let startDraw = function () {
    winList3 = [];
    $("#btn-draw").css("background-image", "url(\"../src/btn-down.png\")");
    let drawList = JSON.parse(window.localStorage.getItem("drawList"));
    console.log(drawList);
    let people = JSON.parse(window.localStorage.getItem("people"));
    let len1 = JSON.parse(window.localStorage.getItem("winList1")).length;
    let len2 = JSON.parse(window.localStorage.getItem("winList2")).length;
    let len3 = JSON.parse(window.localStorage.getItem("winList3")).length;
    let len4 = JSON.parse(window.localStorage.getItem("winList4")).length;
    if (level !== 3) {
        intervalName = setInterval(function () {
            winIndex = Math.floor(Math.random() * drawList.length);// 随机一个序号，0 到 length-1
            console.log("winIndex", winIndex);
            winName = drawList[winIndex];
            $("#win-num").html(winName);
        }, 60);
    } else {
        intervalName = setInterval(function () {
            winList3 = [];
            roundList3 = JSON.parse(window.localStorage.getItem("drawList"));
            let max = 20;
            let rest = people - (len1 + len2 + len3 + len4);
            if (rest < max) {
                max = rest;
            }
            for (let i = 0; i < max; i++) {
                winIndex = Math.floor(Math.random() * roundList3.length);// 随机一个序号，0 到 length-1
                let winName = roundList3[winIndex];
                winList3.push(winName);
                roundList3.splice(winIndex, 1);
            }
            $("#win-num-3").html(generate3Table(winList3));
        }, 80);
    }
};

let stopDraw = function () {
    console.log("stop");
    $("#btn-draw").css("background-image", "url(\"../src/btn-up.png\")");

    clearInterval(intervalName);
    let drawList = JSON.parse(window.localStorage.getItem("drawList"));

    if (level === 1 || level === 2) {
        //将中奖者增加到奖项名单里
        let winList = JSON.parse(window.localStorage.getItem("winList" + level));
        winList.push(drawList[winIndex]);
        window.localStorage.setItem("winList" + level, JSON.stringify(winList));
        let actual = JSON.parse(window.localStorage.getItem("actual" + level));
        actual += 1;
        window.localStorage.setItem("actual" + level, actual);
        winListText += "<div>" + drawList[winIndex] + " </div>";
        $("#win-list").html(winListText);
        //将中奖者从奖池中去除
        drawList.splice(winIndex, 1);
        window.localStorage.setItem("drawList", JSON.stringify(drawList));
    } else if (level === 3) {
        //将中奖者增加到奖项名单里
        let winList = JSON.parse(window.localStorage.getItem("winList" + level));
        let winListDisplay = JSON.parse(window.localStorage.getItem("winList" + level + "_display"));
        winListDisplay.push({"normal": winList3.slice(0, 10), "add": []});
        winListDisplay.push({"normal": winList3.slice(10,20), "add": []});
        $.each(winList3, function (_, num) {
            if (num) {
                winList.push(num);
            }
        });
        console.log(winList3);
        let actual = JSON.parse(window.localStorage.getItem("actual3"));
        actual += winList3.length;
        window.localStorage.setItem("actual3", actual);
        window.localStorage.setItem("winList3", JSON.stringify(winList));
        window.localStorage.setItem("winList3_display", JSON.stringify(winListDisplay));
        winListText += "<div>" + drawList[winIndex] + " </div>";
        $("#win-num-3").html(generate3Table(winList3));
        //将中奖者从奖池中去除
        window.localStorage.setItem("drawList", JSON.stringify(roundList3));
    } else if (level === 4) {
        //将中奖者增加到奖项名单里
        let winList = JSON.parse(window.localStorage.getItem("winList4"));
        winList.push(drawList[winIndex]);
        window.localStorage.setItem("winList4", JSON.stringify(winList));

        let actual = JSON.parse(window.localStorage.getItem("actual4"));
        actual += 1;
        window.localStorage.setItem("actual4", actual);

        let winListDisplay = JSON.parse(window.localStorage.getItem("winList4_display"));
        if (winListDisplay.length === 0) {
            winListDisplay.push([]);
        }
        let len = winListDisplay.length;
        winListDisplay[len - 1].push(drawList[winIndex]);
        window.localStorage.setItem("winList4_display", JSON.stringify(winListDisplay));

        winListText += "<div>" + drawList[winIndex] + " </div>";
        $("#win-list").html(winListText);

        //将中奖者从奖池中去除
        drawList.splice(winIndex, 1);
        window.localStorage.setItem("drawList", JSON.stringify(drawList));
    }
    console.log("剩余奖池大小", JSON.parse(window.localStorage.getItem("drawList")).length);
    console.log("实际已经抽了的人数", JSON.parse(window.localStorage.getItem("actual" + level)));
};

let nextGroup = function () {
    let winListDisplay = JSON.parse(window.localStorage.getItem("winList4_display"));
    winListDisplay.push([]);
    window.localStorage.setItem("winList4_display", JSON.stringify(winListDisplay));
    winListText = "";
    $("#win-list").html(winListText);
    $("#win-num").html("奖");
};

$(window).keydown(function (event) {
    let document = window.localStorage.getItem("document");
    let keyCode = event.keyCode;
    let nextKeyList = [33, 34];
    if (document === "draw") {
        if ($.inArray(keyCode, nextKeyList) !== -1) {
            drawWinner();
        }
    } else if (document === "add") {
        if ($.inArray(keyCode, nextKeyList) !== -1) {
            addWinner();
        }
    }
});