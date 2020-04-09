/**
 * @author jennifermq
 */

let addStatus = "停止";
let addWinName = "奖";
let addWinIndex = null;
let addIntervalName = "";
let addLevel = null;

let loadAddPage = function(prizeLevel) {
    window.localStorage.setItem("document", "add");
    addLevel = prizeLevel;
    $("#win-num").html(addWinName);
};

let addWinner = function() {
    if(addStatus === "停止") {
        let drawList = JSON.parse(window.localStorage.getItem("drawList"));
        if(drawList.length <= 0) {
            alert("所有人都有奖品了哦");
        } else {
            addStatus = "开始";
            startAdd();
        }
    } else if(addStatus === "开始") {
        addStatus = "停止";
        stopAdd();
    }
};

let startAdd = function() {
    $("#btn-draw").css("background-image", "url(\"../src/btn-down.png\")");
    let drawList = JSON.parse(window.localStorage.getItem("drawList"));
    addIntervalName = setInterval(function() {
        addWinIndex = Math.floor(Math.random()*drawList.length);// 随机一个序号，0 到 length-1
        addWinName = drawList[addWinIndex];
        $("#win-num").html(addWinName);
    }, 30);
};

let stopAdd = function() {
    console.log("stop");
    $("#btn-draw").css("background-image", "url(\"../src/btn-up.png\")");
    clearInterval(addIntervalName);
    let drawList = JSON.parse(window.localStorage.getItem("drawList"));

    //将中奖者增加到奖项名单里
    let winList = JSON.parse(window.localStorage.getItem("winList" + addLevel));
    winList.push(drawList[addWinIndex]);
    window.localStorage.setItem("winList" + addLevel, JSON.stringify(winList));

    let winListDisplay = JSON.parse(window.localStorage.getItem("winList" + addLevel + "_display"));
    if(winListDisplay) {
        let len = winListDisplay.length;
        winListDisplay[len-1].add.push(drawList[addWinIndex]);
        window.localStorage.setItem("winList" + addLevel + "_display", JSON.stringify(winListDisplay));

    }
    //将中奖者从奖池中去除
    drawList.splice(addWinIndex, 1);
    window.localStorage.setItem("drawList", JSON.stringify(drawList));

    console.log("剩余奖池大小", JSON.parse(window.localStorage.getItem("drawList")).length);
    console.log("实际已经抽了的人数", JSON.parse(window.localStorage.getItem("actual" + addLevel)));
};