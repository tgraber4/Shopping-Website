var allowWebImages = 0;
if (window.location.href.includes("localhost:5500")) {
    allowWebImages = 1;
}
var checkLink = function (linkValue) {
    if (allowWebImages === 1) {
        return linkValue;
    } else {
        return "./Images/no_image.jpg";
    }
}


var SoptOptions = [];
var SoptList = [];
var buttonnum = 1;
var pricenum = 1;
var containernum = 1;
var currentgreyid = 1;
var SoptCustom1Event = -1;
var mode = "none";
var cssmultiplier = 0;
SoptOptions.push({name: "Prices", RestrictionNames: ["price1", "price2"], type: "Custom1", shown: 0, id: "", displaycircleid: "", circletextid: "", priceid: []});
SoptOptions.push({name: "Location", RestrictionNames: ["location"], type: "Normal", shown: 0, id: "", displaycircleid: "", circletextid: "", List: ["All Stores", "Illinois Stores", "Local Stores"], ListID: [], current: -1});

var restrictions = {"price1": -1, "price2": -1, "location": " "}
/*

------------ Instructions for adding new Restrictions Types ------------

1.) Update hideSoptOption()
2.) Update addSoptOption()
3.) Update updateRestrictions()
4.) Update SoptPressed()
5.) Update ClearSopt()

*/

/*

------------ Instructions for adding already existing Restrictions Types ------------

1.) Update ClearSopt()
2.) Update updateRestrictions() IF: 
- it's a "Normal" Type Restriction and RestrictionNames has more than 1 element then 
update 
- it's a custom type

*/


var searchbar = document.getElementById("searchbar");

var searchBarPressed = function () {
    mode = "search";
}
searchbar.addEventListener('mousedown', searchBarPressed);

window.onclick = function(event){
    if (event.target != searchbar && document.activeElement != searchbar){
        mode = "none";
    }
}


var RestrictionNameIsList = function (num) {
    if (SoptOptions[num].RestrictionNames.length > 1) {
        return true;
    } else {
        return false;
    }
}
var hideSoptOption = function (num) {
    var arrow = document.getElementById("arrow-down");
    var container = document.getElementById(SoptOptions[num].id);
    if ("Normal" == SoptOptions[num].type) {
        arrow.style.display = "none";
        container.style.display = "none";
        for (var i = 0; i < SoptOptions[num].ListID.length; i++) {
            var tempgreybox = document.getElementById(SoptOptions[num].ListID[i])
            tempgreybox.style.display = "none";
        }
    } else if ("Custom1" == SoptOptions[num].type) {
        arrow.style.display = "none";
        container.style.display = "none";
    } // add new Restrictions Type here

    SoptOptions[num].shown = 0;
    if (SoptCustom1Event == num) {
        SoptCustom1Event = -1;
        window.removeEventListener('click', valueChecker);
    }
}
var valueChecker = function () {
    var testinput1 = SoptOptions[SoptCustom1Event].priceid[0];
    var testinput2 = SoptOptions[SoptCustom1Event].priceid[1];
    if (testinput1.value.length == 0) {
        testinput1.value = 0;
    }
    if (testinput2.value.length == 0) {
        testinput2.value = 0;
    }
}

var addSoptOption = function (num) {
    const button1 = document.createElement("button");
    const node1 = document.createTextNode(SoptOptions[num].name);
    button1.appendChild(node1);
    button1.id = "sopt" + containernum;
    button1.classList.add("soptinside");
    var element = document.getElementById("shopoptions");
    element.appendChild(button1);
    var element2 = document.getElementById("shopoptions2");
    SoptOptions[num].id = "container" + containernum;
    if (SoptOptions[num].type == "Normal") {
        const div1 = document.createElement("div");
        div1.id = "container" + containernum;
        div1.classList.add("container");
        element2.appendChild(div1);
    } else if (SoptOptions[num].type == "Custom1") {
        const div4 = document.createElement("div");

        div4.id = "container" + containernum;

        div4.classList.add("container", "customcon1");

        const div3 = document.createElement("div");

        div3.classList.add("extracontlayer");

        const div2 = document.createElement("div");

        div2.classList.add("optiontextholder");

        const p1 = document.createElement("p");

        const node5 = document.createTextNode("to");

        p1.appendChild(node5);

        const div1 = document.createElement("div");

        div1.classList.add("optiontextholder");

        const input2 = document.createElement("input");

        const node4 = document.createTextNode(" ");

        input2.appendChild(node4);

        input2.value = "0";

        input2.type = "number";

        input2.min = 0;

        input2.id = "price2_" + pricenum;

        input2.classList.add("optiontext");

        SoptOptions[num].priceid.push(input2);

        const h52 = document.createElement("h5");

        const node3 = document.createTextNode("$");

        h52.appendChild(node3);

        const input1 = document.createElement("input");

        const node2 = document.createTextNode(" ");

        input1.appendChild(node2);

        input1.value = "0";

        input1.type = "number";

        input1.min = 0;

        input1.id = "price1_" + pricenum;

        input1.classList.add("optiontext");

        SoptOptions[num].priceid.push(input1);

        const h51 = document.createElement("h5");

        const node1 = document.createTextNode("$");

        h51.appendChild(node1);

        div1.appendChild(h51);

        div1.appendChild(input1);

        div2.appendChild(h52);

        div2.appendChild(input2);

        div3.appendChild(div1);

        div3.appendChild(p1);

        div3.appendChild(div2);

        div4.appendChild(div3);

        element2.appendChild(div4);

        pricenum++;
    } // add new Restrictions Type here

    containernum++;
}

var SoptCircleHasID = function (num) {
    if (SoptOptions[num].displaycircleid.length != 0) {
        return true;
    }
    return false;
}
var updateRestrictions = function (temp) {
    var copyRestrictions = JSON.parse(JSON.stringify(restrictions));
    if (SoptOptions[temp].type == "Normal") {
        if (RestrictionNameIsList(temp) == false) {
            if (SoptOptions[temp].current == -1 && restrictions[SoptOptions[temp].RestrictionNames[0]] != " ") {
                restrictions[SoptOptions[temp].RestrictionNames[0]] = " ";
                if (SoptCircleHasID(temp)) {
                    removeCircle(temp);
                } 
            } else if (SoptOptions[temp].current != -1 && SoptOptions[temp].List[SoptOptions[temp].current] != restrictions[SoptOptions[temp].RestrictionNames[0]]) {
                restrictions[SoptOptions[temp].RestrictionNames[0]] = SoptOptions[temp].List[SoptOptions[temp].current];
                if (SoptCircleHasID(temp)) {
                    updateCircle(SoptOptions[temp].List[SoptOptions[temp].current], temp);
                } else {
                    addCircle(SoptOptions[temp].List[SoptOptions[temp].current], temp);
                }
            }
        } else {
            /*
            If a "Normal" Type Restriction has multiple Restriction Names 
            a custom restriction updater is required here
            */
        }
    } else if (SoptOptions[temp].type == "Custom1") {
        var tempPrice1 = Number(SoptOptions[temp].priceid[0].value);
        var tempPrice2 = Number(SoptOptions[temp].priceid[1].value);
        tempPrice2 = Math.floor(tempPrice2) + Math.round(100 * (tempPrice2 - Math.floor(tempPrice2))) / 100;
        tempPrice1 = Math.floor(tempPrice1) + Math.round(100 * (tempPrice1 - Math.floor(tempPrice1))) / 100;
        if (restrictions.price1 != -1 && tempPrice1 == 0 && tempPrice2 == 0) {
            restrictions.price1 = -1;
            restrictions.price2 = -1;
            if (SoptCircleHasID(temp)) {
                removeCircle(temp);
            } 
        } else if (tempPrice1 > tempPrice2 && tempPrice2 >= 0) {
            if (tempPrice2 == 0) {
                tempPrice2 = 0;
            }
            if (tempPrice1 > 999999999) { // cap for the max restriction price
                tempPrice1 = 1000000000;
            }
            restrictions.price1 = tempPrice2;
            restrictions.price2 = tempPrice1;
            if (SoptCircleHasID(temp)) {
                updateCircle("$" + pricechanger(tempPrice2) + "-$" + pricechanger(tempPrice1), temp);
            } else {
                addCircle("$" + pricechanger(tempPrice2) + "-$" + pricechanger(tempPrice1), temp);
            }
        }
    } // add new Restrictions Type here
    if (JSON.stringify(copyRestrictions) != JSON.stringify(restrictions)) {
        updatesearch();
    }

}
var SoptPressed = function (element) {
    var temp;
    for (var i = 0; i < SoptOptions.length; i++) {
        if (element.currentTarget.myParam == SoptOptions[i].name) {
            temp = i;
            break;
        }
    }
    updateRestrictions(temp);

    var arrow = document.getElementById("arrow-down");
    var container = document.getElementById(SoptOptions[temp].id);
    if ("Normal" == SoptOptions[temp].type) {
        var greybox = [];
        for (var i = 0; i < SoptOptions[temp].ListID.length; i++) {
            greybox.push(document.getElementById(SoptOptions[temp].ListID[i]));
        }
        let rect = element.currentTarget.getBoundingClientRect();
        if (SoptOptions[temp].shown == 0) {
            for (var i = 0; i < SoptOptions.length; i++) {
                if (SoptOptions.shown != 0) {
                    hideSoptOption(i);
                }
            }
            arrow.style.display = "block";
            container.style.display = "block";
            for (var i = 0; i < SoptOptions[temp].ListID.length; i++) {
                greybox[i].style.display = "inline-block";
            }
            SoptOptions[temp].shown = 1;
            arrow.style.marginLeft = rect.x + rect.width / 2 - 10;
            container.style.marginLeft = rect.x - 20;
        } else {
            hideSoptOption(temp);
        }
    } else if ("Custom1" == SoptOptions[temp].type) {
        let rect = element.currentTarget.getBoundingClientRect();
        if (SoptOptions[temp].shown == 0) {
            for (var i = 0; i < SoptOptions.length; i++) {
                if (SoptOptions.shown != 0) {
                    hideSoptOption(i);
                }
            }
            SoptCustom1Event = temp;
            window.addEventListener('click', valueChecker);
            arrow.style.display = "block";
            container.style.display = "block";
            SoptOptions[temp].shown = 1;
            arrow.style.marginLeft = rect.x + rect.width / 2 - 10;
            container.style.marginLeft = rect.x - 20;
        } else {
            hideSoptOption(temp);
        }
    } // add new Restrictions Type here

}

var addGreyBox = function (text, num) {
    const button1 = document.createElement("button");
    const node1 = document.createTextNode(text);
    button1.appendChild(node1);
    button1.id = "greybox" + currentgreyid;
    currentgreyid++;
    button1.classList.add("greybox");
    const element = document.getElementById(SoptOptions[num].id);
    element.appendChild(button1);
}
var greyBoxPressed = function (element) {
    var tempnum;
    for (var i = 0; i < SoptOptions[element.currentTarget.myNum].ListID.length; i++) {
        if (SoptOptions[element.currentTarget.myNum].ListID[i] == element.currentTarget.myParam) {
            tempnum = i;
            break;
        }
    }
    const temp2greybox = document.getElementById(element.currentTarget.myParam);
    if (SoptOptions[element.currentTarget.myNum].current != tempnum) {
        if (SoptOptions[element.currentTarget.myNum].current != -1) {
            const replacegreybox = document.getElementById(SoptOptions[element.currentTarget.myNum].ListID[SoptOptions[element.currentTarget.myNum].current]);
            replacegreybox.style.backgroundColor = "lightgrey";
        }
        temp2greybox.style.backgroundColor = "darkgrey";
        SoptOptions[element.currentTarget.myNum].current = tempnum;
    } else {
        SoptOptions[element.currentTarget.myNum].current = -1;
        temp2greybox.style.backgroundColor = "lightgrey";
    }
}


for (var i = 0; i < SoptOptions.length; i++) {
    addSoptOption(i);
    SoptList.push(document.getElementById("sopt" + (i + 1)));
}

for (var i = 0; i < SoptOptions.length; i++) {
    SoptList[i].addEventListener('click', SoptPressed);
    SoptList[i].myParam = SoptOptions[i].name;
}
for (var j = 0; j < SoptOptions.length; j++) {
    if (SoptOptions[j].type == "Normal") {
        for (var i = 0; i < SoptOptions[j].List.length; i++) {
            addGreyBox(SoptOptions[j].List[i], j);
            SoptOptions[j].ListID.push("greybox" + (currentgreyid - 1));
            const tempgreybox = document.getElementById("greybox" + (currentgreyid - 1));
            tempgreybox.addEventListener('click', greyBoxPressed);
            tempgreybox.myNum = 1;
            tempgreybox.myParam = "greybox" + (currentgreyid - 1);
        }
    }
}


var ClearSopt = function (num) {
    if (SoptOptions[num].name == "Prices") {
        restrictions.price1 = -1;
        restrictions.price2 = -1;
        const price1thing = SoptOptions[num].priceid[0];
        price1thing.value = 0;
        const price2thing = SoptOptions[num].priceid[1];
        price2thing.value = 0;
    } else if (SoptOptions[num].name == "Location") {
        const replacegreybox = document.getElementById(SoptOptions[num].ListID[SoptOptions[num].current]);
        replacegreybox.style.backgroundColor = "lightgrey";
        restrictions.location = " ";
        SoptOptions[num].current = -1;
    } // add new and existing Restrictions Types here

    SoptOptions[num].displaycircleid = "";
    SoptOptions[num].circletextid = "";
    updatesearch();
}

var addCircle = function (text, num) {
    const button1 = document.createElement("button");
    button1.classList.add("circle");
    button1.id = "button" + buttonnum;
    const p2 = document.createElement("p");
    const node2 = document.createTextNode("X");
    p2.appendChild(node2);
    p2.classList.add("x");
    const p1 = document.createElement("p");
    const node1 = document.createTextNode(text);
    p1.appendChild(node1);
    p1.id = "circlep" + buttonnum;
    button1.appendChild(p1);
    button1.appendChild(p2);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "550 14px Arial";
    var y = ctx.measureText(text).width;
    var xsize = ctx.measureText("X").width;
    button1.style.width = y + 25 + xsize;
    p2.onclick = function() {button1.remove(); ClearSopt(num)};
    const element = document.getElementById("circleholder");
    element.appendChild(button1);
    SoptOptions[num].displaycircleid = "button" + buttonnum;
    SoptOptions[num].circletextid = "circlep" + buttonnum;
    buttonnum++;
}
var updateCircle = function (text, num) {
    const circletext = document.getElementById(SoptOptions[num].circletextid);
    circletext.innerHTML = text;
    const circle = document.getElementById(SoptOptions[num].displaycircleid);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "550 14px Arial";
    var y = ctx.measureText(text).width;
    var xsize = ctx.measureText("X").width;
    circle.style.width = y + 25 + xsize;
}
var removeCircle = function (num) {
    const circle = document.getElementById(SoptOptions[num].displaycircleid);
    circle.remove();
    SoptOptions[num].displaycircleid = "";
    SoptOptions[num].circletextid = "";
}


var pricechanger = function (digitnum) {
    var tempnum = Math.floor(digitnum).toString();
    var tempnum2 = (Math.round(100 * (digitnum - Math.floor(digitnum))) / 100);
    if (tempnum2 == 0) {
        tempnum2 = "";
    } else {
        tempnum2 = tempnum2.toString();
        tempnum2 = tempnum2.substring(1, tempnum2.length)
        if (tempnum2.length == 2) {
            tempnum2 = tempnum2 + "0";
        }
    }
    var zchecker = (Math.floor((tempnum.length - 1) / 3));
    for (t = 0; t < zchecker; t++) {
        tempnum = tempnum.substring(0, tempnum.length - 3 - 4 * t) + "," + tempnum.substring(tempnum.length - 3 - 4 * t, tempnum.length)
    }
    return tempnum + tempnum2;
}



// update w3schools and github
// add question mark

var items = [{"name": "GV Socks", "price": 4.99, "desc": "N/A", "locations": "Any Store", "brand": "GV"}, {"name": "Orange", "desc": "N/A", "price": 1.99}, {"name": "Orange Socks", "price": 3.99, "desc": "N/A", "locations": "Any Store", "brand": "GV"}, {"name": "Apple", "price": 0.99, "desc": "N/A", "locations": "Any Store", "brand": "GV"}, {"name": "TV", "price": 199.99, "desc": "N/A", "locations": "Any Store", "brand": "GV"}]
var imagelinks = ["https://i.imgur.com/cTRe4sr.png" , "https://i.imgur.com/E5JeHTB.jpg", "https://i.imgur.com/hpT4QuV.jpeg", "https://i.imgur.com/CbR6Tzj.jpeg", "https://cdn.thewirecutter.com/wp-content/media/2023/08/oledtv-2048px-2002-3x2-1.jpg?auto=webp&width=1024", "https://i.imgur.com/nwoWz1n.jpg", "https://i.imgur.com/j01dqOm.jpg", "https://i.imgur.com/N7Y2Sya.jpg", "https://i.imgur.com/UdThxKC.jpg", "https://i.imgur.com/QTPCMeL.jpg", "https://i.imgur.com/wcEclQv.jpg", "https://i.imgur.com/VevtlgJ.jpg"]
var searchit = [["socks", "sock", "GV socks", "great value socks", "GV"], ["orange", "oranges", "fruit"], ["orange", "sock", "socks", "orange sock"], ["apple", "fruit", "apples"], ["TV", "television", "telvision"]]


var unsorteditems = []
var sorteditems = []
var backupcheck = []
var maincheck = []
var imglist = []
var itemcounter = 1;
var itemsdisplayed = 0;
var itemperrow = 3;
var itemcss = [];
var searchtext = ""; // text in searchbar

var itemid = 1;
var addItem = function (title, price, imgLink) {
    var wholedollar = Math.floor(price);
    var centsonly = Math.round((price - Math.floor(price)) * 100) / 100;
    centsonly = centsonly.toString().slice(2, centsonly.toString().length);

    const div3 = document.createElement("div");

    div3.classList.add("item");

    div3.id = "item" + itemid;

    const button1 = document.createElement("button");

    button1.classList.add("add");

    const div2 = document.createElement("div");

    div2.classList.add("priceholder");

    const p5 = document.createElement("p");

    const node6 = document.createTextNode(title);

    p5.appendChild(node6);

    p5.classList.add("item_title");

    const img1 = document.createElement("img");

    img1.classList.add("img");

    img1.src = checkLink(imgLink);

    console.log(img1.src);

    const h11 = document.createElement("h1");

    const node5 = document.createTextNode("Add");

    h11.appendChild(node5);

    const p4 = document.createElement("p");

    const node4 = document.createTextNode("+");

    p4.appendChild(node4);

    const p3 = document.createElement("p");

    const node3 = document.createTextNode(centsonly);

    p3.appendChild(node3);

    p3.classList.add("upper");

    const p2 = document.createElement("p");

    const node2 = document.createTextNode(wholedollar);

    p2.appendChild(node2);

    p2.classList.add("start");

    const p1 = document.createElement("p");

    const node1 = document.createTextNode("$");

    p1.appendChild(node1);

    p1.classList.add("dollar");

    div2.appendChild(p1);

    div2.appendChild(p2);

    div2.appendChild(p3);

    button1.appendChild(p4);

    button1.appendChild(h11);

    div3.appendChild(img1);

    div3.appendChild(p5);

    div3.appendChild(div2);

    div3.appendChild(button1);

    itemcss.push("item" + itemid);

    var element = document.getElementById("itemsholder");

    element.appendChild(div3);

    itemsdisplayed++;
    itemid++;
}


var itemResize = function () {
    if (itemcss.length > 0) {
        var itemtest = document.getElementById(itemcss[0]);
        var actualInnerWidth = $("body").prop("clientWidth");
        var style = itemtest.currentStyle || window.getComputedStyle(itemtest);
        var margin = Number(style.marginLeft.slice(0, style.marginLeft.length - 2));
        var itemsinarow = 0;
        if (itemsdisplayed > Math.floor(actualInnerWidth / (margin * 2 + itemtest.offsetWidth))) {
            itemsinarow = Math.floor(actualInnerWidth / (margin * 2 + itemtest.offsetWidth));
        } else {
            itemsinarow = itemsdisplayed;
        }
        var itemsholder = document.getElementById("itemsholder");
        itemsholder.style.paddingLeft = (actualInnerWidth - (margin * 2 + itemtest.offsetWidth) * itemsinarow) / 2;
        var paddingLeft = (itemsholder.style.paddingLeft.slice(0, itemsholder.style.paddingLeft.length - 2))
        itemsholder.style.width = actualInnerWidth - paddingLeft - 0.1;
    }
}
window.onresize = function () {
    itemResize();
} // might need to add on refresh too


var displayitem = function (num) {
    if (itemcounter < itemperrow && k != 0) {  
        itemcounter += 1;
    } else {
        itemcounter = 1    
    }
    var imagetext = "";
    if (num < imagelinks.length && imagelinks[num] != "N/A") {
        imagetext = imagelinks[num];
    } else {
        imagetext = "https://i.imgur.com/cZL0LkX.jpeg";
    }
    addItem(items[num]["name"], items[num]["price"], imagetext);
}
var addNoResults = function () {
    const div3 = document.createElement("div");

    div3.classList.add("center");

    div3.id = "NoResults";

    const p1 = document.createElement("p");

    const node1 = document.createTextNode("No Results Found");

    p1.appendChild(node1);

    p1.classList.add("noresults");

    div3.appendChild(p1);

    var element = document.getElementById("itemsholder");

    element.appendChild(div3);
}
var clearAllItems = function () {
    for (var i = 0; i < itemcss.length; i++) {
        var tempitem = document.getElementById(itemcss[i]);
        tempitem.remove();
    }
    var noResults = document.getElementById("NoResults");
    if (noResults != null) {
        noResults.remove();
    }
    itemcss = [];
}
var searcher = function() {
    if (unsorteditems.length > 0) {
        for (i = 0; i < unsorteditems.length; i++) { // sorts items into correct order
            if (i === 0) {
                sorteditems.push(unsorteditems[0]) 
            } else {
                if (unsorteditems[i][1] < sorteditems[0][1]) {
                    sorteditems.unshift(unsorteditems[i]);    
                } else if (unsorteditems[i][1] > sorteditems[sorteditems.length - 1][1]) {
                    sorteditems.push(unsorteditems[i]);  
                } else if (unsorteditems[i][1] === sorteditems[sorteditems.length - 1][1] && sorteditems.length === 1) {
                    sorteditems.push(unsorteditems[i]); 
                } else {
                    for (t = 0; t < sorteditems.length - 1; t++) {
                        if (unsorteditems[i][1] >= sorteditems[t][1] && unsorteditems[i][1] <= sorteditems[t + 1][1]) {
                        sorteditems.splice(t + 1, 0, unsorteditems[i]) 
                        t = 1000000
                        }
                    } 
                }
            }   
        }
        itemcounter = 1;
        for (k = 0; k < sorteditems.length; k++) { // displays info on screen
            displayitem(sorteditems[sorteditems.length - 1 - k][0]);
        }
        // if using canvas images load them here
    } else {
        addNoResults();
    }
}
var searchsetup = function () {
    maincheck = []
    sorteditems = []
    backupcheck = []
    for (o = 0; o < searchit.length; o++) {
        itemnum = 0
        for (k = 0; k < searchit[o].length; k++) {
            if ((searchtext.toLowerCase()).includes(searchit[o][k].toLowerCase())) { // checks search for matches
                itemnum += 1
            }    
        }
        if (itemnum > 0) {
            if ((items[o]["price"] >= restrictions.price1 && items[o]["price"] <= restrictions.price2) || (restrictions.price2 === -1 && restrictions.price1 === -1)) { // checks all restrictions
                maincheck.push([o, itemnum])  
            }
            backupcheck.push([o, itemnum])      
        }
    }
    unsorteditems = maincheck
    clearAllItems();
    searcher();
}

var updatesearch = function () {
    maincheck = []
    sorteditems = []
    for (f = 0; f < backupcheck.length; f++) {
        if ((items[backupcheck[f][0]]["price"] >= restrictions.price1 && items[backupcheck[f][0]]["price"] <= restrictions.price2) || (restrictions.price2 === -1 && restrictions.price1 === -1)) { // checks all restrictions
            maincheck.push([backupcheck[f][0], backupcheck[f][1]]) 
        }  
    }
    unsorteditems = maincheck
    clearAllItems();
    searcher();
}

var Ball = function () {
};
Ball.prototype.moving = function (guess) {
    if (guess === "Enter") {
        if (mode == "search") {
            mode = "none";
            searchbar.blur();
            searchtext = searchbar.value;
            searchsetup();
        }
    }
}


var ball = new Ball();
$("body").keydown(function (event) {
var whatletteris = event.key;
ball.moving(whatletteris);
});

var modal = document.getElementById("myModal");
var questionCircleStatus = 0;
var QuestionCircle = function () {
    modal.style.display = "block";
}

var spanx = document.getElementsByClassName("close")[0];
spanx.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


/* 
---------------------------- Search Steps ----------------------------

1.) Enter Key pressed
2.) searchsetup()
    - search algorithm, determines what items could match based on search
    - maincheck - list of items that match both search and restrictions
    - backupcheck - list of items that match just search but fail restrictions
3.) searcher()
    - goes through unsorted items and sorts then in the order in which they should be displayed
    - then displays items on screen


--- Refreshing Restrictions ---
1.) updatesearch()
    - goes through backup items 
2.) runs searcher() again


--- Refreshing search ---
1.) runs searchsetup() again

*/




/*
Create a search engine
could use
*/
// https://programmablesearchengine.google.com/controlpanel/create
