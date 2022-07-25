var date = true, AP = false, secs = false, bookmark_tab = null, bmtxtclr = null, dform = "1", tform = "10", interval = 400, bm = { name: "", url: "" }, BUTTON = null;
var bma = [];
var left = null, trueleft = null;
var doctime = document.getElementById("time");
var docdate = document.getElementById("date");
var docbmname = document.getElementById("bmname");
var docbmurl = document.getElementById("bmurl");
var body = document.body;
document.cookie = 'same-site-cookie=foo; SameSite=Lax';
document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        chrome.storage.sync.set({
            bgim: "Images/GradientOrangeToRed.png",
            back_color: "lightblue",
            text_color: "white",
            repeatx: false,
            repeaty: false,
            settings_color: "Black",
            sizex: false,
            sizey: false,
            AP: false,
            secs: false,
            date: true,
            date_format: 1,
            timeBase: 10,
            bookmark_tab: true
        });
    }
});
chrome.storage.sync.get([
    'bgim',
    'back_color',
    'settings_color',
    'text_color',
    'repeatx',
    'repeaty',
    'sizex',
    'sizey',
    'AP',
    'secs',
    'date',
    'date_format',
    'timeBase',
    'bookmark_tab'
], function (vars) {
    if (vars.settings_color === undefined) {
        chrome.storage.sync.set({
            bgim: "Images/GradientOrangeToRed.png",
            back_color: "lightblue",
            text_color: "white",
            repeatx: false,
            repeaty: false,
            settings_color: "Black",
            sizex: false,
            sizey: false,
            AP: false,
            secs: false,
            date: true,
            date_format: 1,
            timeBase: 10,
            bookmark_tab: true
        });
        vars.bgim = "Images/GradientOrangeToRed.png";
        vars.back_color = "lightblue";
        vars.text_color = "white";
        vars.repeatx = false;
        vars.repeaty = false;
        vars.settings_color = "Black";
        vars.sizex = false;
        vars.sizey = false;
        vars.AP = false;
        vars.secs = false;
        vars.date = true;
        vars.date_format = 1;
        vars.timeBase = 10;
        vars.bookmark_tab = true;
    }

    body.style.backgroundImage = "url('" + vars.bgim + "')";
    body.style.backgroundColor = vars.back_color;
    document.getElementById("sett").src = "Icons/settings" + vars.settings_color + ".png";
    body.style.color = vars.text_color;
    if (vars.repeaty && vars.repeatx) {
        body.style.backgroundRepeat = "repeat";
    }
    else if (vars.repeaty) {
        body.style.backgroundRepeat = "repeat-y";
    }
    else if (vars.repeatx) {
        body.style.backgroundRepeat = "repeat-x";
    } else { body.style.backgroundRepeat = "no-repeat"; }
    if (vars.sizey && vars.sizex) {
        body.style.backgroundSize = "100vw 100vh";
    }
    else if (vars.sizey) {
        body.style.backgroundSize = "auto 100vh";
    }
    else if (vars.sizex) {
        body.style.backgroundSize = "100vw auto";
    } else { body.style.backgroundSize = "auto"; }
    secs = vars.secs;
    if (secs) {
        interval = 100;
    }
    date = vars.date;
    dform = vars.date_format;
    tform = vars.timeBase;
    if (tform == "2") {
        doctime.style.fontSize = '14vw';
    }
    AP = vars.AP;
    if (AP) {
        doctime.style.fontSize = '10vw';
    }
    bookmark_tab = vars.bookmark_tab;
    if (bookmark_tab == true) {
        chrome.storage.sync.get(['bookmarkarray', 'font_size_bmtab', 'alpha', 'bm_text_color'], function (bmtab) {
            bma = bmtab.bookmarkarray;
            if (bma == null) {
                bma = [];
            }
            left = document.createElement('left');
            trueleft = document.createElement('trueleft');
            left.className = "left";
            bmtxtclr = bmtab.bm_text_color;
            left.style.fontSize = bmtab.font_size_bmtab;
            trueleft.className = "trueleft";
            trueleft.style.backgroundColor = "rgba(55,55,55," + bmtab.alpha + ")";
            if ((window.innerWidth) * 12 / 100 < 160) {
                left.style.width = trueleft.style.width = "160px";
            } else if ((window.innerWidth) * 12 / 100 > 260) {
                left.style.width = trueleft.style.width = "260px";
            } else {
                left.style.width = trueleft.style.width = "12vw";
            }
            window.addEventListener("resize", function () {
                winwidth = window.innerWidth;
                if (winwidth * 12 / 100 < 160) {
                    left.style.width = trueleft.style.width = "160px";
                    if (BUTTON != null) {
                        BUTTON.style.width = "150px";
                    }
                }
                else {
                    if (winwidth * 12 / 100 > 260) {
                        left.style.width = trueleft.style.width = "260px";
                        if (BUTTON != null) {
                            BUTTON.style.width = "250px";
                        }
                    }
                    else {
                        left.style.width = trueleft.style.width = "12vw";
                        if (BUTTON != null) {
                            BUTTON.style.width = winwidth * 12 / 100 - 10 + "px";
                        }
                    }
                }
            });
            body.appendChild(left);
            body.appendChild(trueleft);
            constructBookmarkTab(bma, 0);
        });
    }
});

function constructBookmarkTab(bma, i) {
    let n = bma.length;
    for (; i < n; i++) {
        let item = bma[i];
        constructNewBookmark(item, i);
    }
    constructAddBM();
}

function constructNewBookmark(bm, i) {
    let bmdiv = document.createElement('div');
    let bmlink = document.createElement('a');
    let bmlinkdiv = document.createElement('div');
    let bmimg = document.createElement('img');
    let bmname = document.createTextNode(bm.name);
    let bmopt = document.createElement('button');
    let bmopdiv = document.createElement('div');
    let popup = document.createElement('span');
    let del = document.createElement('div');
    let moveup = document.createElement('div');
    let movedown = document.createElement('div');
    let top = document.createElement('div');
    let bottom = document.createElement('div');
    let edit = document.createElement('div');
    bmimg.src = "https://plus.google.com/_/favicon?domain_url=" + bm.url;
    bmlink.href = bm.url;
    bmlink.title = bm.url;
    bmlink.id = "bmlink" + i;
    bmlink.style.color = bmtxtclr;
    bmopdiv.className = "popup";
    bmopdiv.id = "bmopdiv" + i;
    popup.className = "popuptext";
    popup.id = "popup" + i;
    del.innerHTML = "Delete";
    del.id = "del" + i;
    moveup.innerHTML = "Move Up";
    moveup.id = "moveup" + i;
    movedown.innerHTML = "Move Down";
    movedown.id = "movedown" + i;
    top.innerHTML = "Move to Top";
    top.id = "top" + i;
    bottom.innerHTML = "Move to Bottom";
    bottom.id = "bottom" + i;
    edit.innerHTML = "Edit";
    edit.id = "edit" + i;
    bmopt.innerHTML = '<img src="Icons/Menu.png" width="5px" height="15px" />';
    bmopt.className = "bmoptions";
    bmopt.id = "bmoptions" + i;
    bmlinkdiv.className = "linkdiv";
    bmlinkdiv.style.width = trueleft.style.width;
    bmlinkdiv.id = "bmlinkdiv" + i;
    bmdiv.className = "bookmark";
    bmdiv.id = "bmdiv" + i;
    bmdiv.addEventListener("mouseenter", function () {
        //position = i;
        bmoptval = parseInt(this.id.slice(5), 10);
        let bmopt = document.getElementById("bmoptions" + bmoptval);
        bmopt.style.display = "flex";
        bmopt.style.left = parseInt(left.style.width, 10) > 15 ? parseInt(left.style.width, 10) - 21 + "px" : (window.innerWidth) * 12 / 100 - 21 + "px";
    });
    bmlinkdiv.addEventListener("resize", function () {
        bmval = parseInt(this.id.slice(5), 10);
        document.getElementById("bmlinkdiv" + bmval).style.width = trueleft.style.width;
    });
    del.addEventListener("click", function () {
        bmoptval = parseInt(this.id.slice(3), 10);
        bma.splice(bmoptval, 1);
        chrome.storage.sync.set({ bookmarkarray: bma });
        let child = document.getElementById(("bmdiv" + bmoptval));
        if (document.getElementById("popup" + (bmoptval + 1)) != null) {
            document.getElementById("popup" + (bmoptval + 1)).classList.toggle("show");
        }
        //this.removeEventListener("click", function(){});
        left.removeChild(child);
        let n = bma.length;
        for (let i = bmoptval + 1; i <= n; i++) {
            document.getElementById(("bmdiv" + i)).id = "bmdiv" + (i - 1);
            document.getElementById(("bmoptions" + i)).id = "bmoptions" + (i - 1);
            document.getElementById(("bmopdiv" + i)).id = "bmopdiv" + (i - 1);
            document.getElementById(("del" + i)).id = "del" + (i - 1);
            document.getElementById(("popup" + i)).id = "popup" + (i - 1);
            document.getElementById(("bmlink" + i)).id = "bmlink" + (i - 1);
            document.getElementById(("bmlinkdiv" + i)).id = "bmlinkdiv" + (i - 1);
            document.getElementById(("moveup" + i)).id = "moveup" + (i - 1);
            document.getElementById(("movedown" + i)).id = "movedown" + (i - 1);
            document.getElementById(("top" + i)).id = "top" + (i - 1);
            document.getElementById(("bottom" + i)).id = "bottom" + (i - 1);
            document.getElementById(("edit" + i)).id = "edit" + (i - 1);
        }
    });
    bmdiv.addEventListener("mouseleave", function () {
        bmoptval = parseInt(this.id.slice(5), 10);
        document.getElementById("bmoptions" + bmoptval).style.display = "none";
    });
    bmopdiv.addEventListener("click", function () {
        let bmoptval = parseInt(this.id.slice(7), 10);
        let popup = document.getElementById("popup" + bmoptval);
        for (i = 0; i < bma.length; i++) {
            pop = document.getElementById("popup" + i);
            if (pop.classList.contains("show") && i != bmoptval) {
                pop.classList.toggle("show");
                break;
            }
        }
		if (popup != null)
			popup.classList.toggle("show");
			popup.style.left = parseInt(left.style.width, 10) > 15 ? parseInt(left.style.width, 10) - 22 + "px" : (window.innerWidth) * 12 / 100 - 22 + "px";
    });
    moveup.addEventListener("click", function () {
        bmoptval = parseInt(this.id.slice(6), 10);
        let str = "", str1 = "";
        bml0 = document.getElementById("bmlink" + bmoptval);
        bml1 = document.getElementById("bmlink" + (bmoptval - 1));
        if (bmoptval > 0) {
            str = bml0.innerHTML;
            //alert(str);
            bml0.innerHTML = bml1.innerHTML;
            //alert(bml1.innerHTML);
            bml1.innerHTML = str;
            str = bma[bmoptval].name;
            bma[bmoptval].name = bma[bmoptval - 1].name;
            bma[bmoptval - 1].name = str;
            str = bml0.title;
            str1 = bml0.href = bml0.title = bml1.title;
            bml1.href = bml1.title = str;
            bma[bmoptval].url = str1;
            bma[bmoptval - 1].url = str;
            chrome.storage.sync.set({ bookmarkarray: bma });
        } else { alert('Up where, fam?'); }
    });
    movedown.addEventListener("click", function () {
        bmoptval = parseInt(this.id.slice(8), 10);
        let str = "", str1 = "";
        bml0 = document.getElementById("bmlink" + bmoptval);
        bml1 = document.getElementById("bmlink" + (bmoptval + 1));
        if (bmoptval < (bma.length - 1)) {
            str = bml0.innerHTML;
            //alert(str);
            bml0.innerHTML = bml1.innerHTML;
            //alert(bml1.innerHTML);
            bml1.innerHTML = str;
            str = bma[bmoptval].name;
            bma[bmoptval].name = bma[bmoptval + 1].name;
            bma[bmoptval + 1].name = str;
            str = bml0.title;
            str1 = bml0.href = bml0.title = bml1.title;
            bml1.href = bml1.title = str;
            bma[bmoptval].url = str1;
            bma[bmoptval + 1].url = str;
            chrome.storage.sync.set({ bookmarkarray: bma });
        } else { alert('Down where, fam?'); }
    });
    top.addEventListener("click", function () {
        bmoptval = parseInt(this.id.slice(3), 10);
        let str = "", str1 = "", bml0 = "", bml1 = "";
        if (bmoptval > 0) {
            for (let i = bmoptval - 1; i > -1; i--) {
                bml0 = document.getElementById("bmlink" + i);
                bml1 = document.getElementById("bmlink" + (i + 1));
                str = bml0.innerHTML;
                //alert(str);
                bml0.innerHTML = bml1.innerHTML;
                //alert(bml1.innerHTML);
                bml1.innerHTML = str;
                str = bma[i].name;
                bma[i].name = bma[i + 1].name;
                bma[i + 1].name = str;
                str = bml0.title;
                str1 = bml0.href = bml0.title = bml1.title;
                bml1.href = bml1.title = str;
                bma[i].url = str1;
                bma[i + 1].url = str;
                chrome.storage.sync.set({ bookmarkarray: bma });
            }
        } else { alert('Top where, fam?'); }
    });
    bottom.addEventListener("click", function () {
        bmoptval = parseInt(this.id.slice(6), 10);
        let len = 0, str = "", str1 = "", bml0 = "", bml1 = "";
        len = bma.length;
        if (bmoptval < (len - 1)) {
            for (let i = bmoptval + 1; i < len; i++) {
                bml0 = document.getElementById("bmlink" + i);
                bml1 = document.getElementById("bmlink" + (i - 1));
                str = bml0.innerHTML;
                //alert(str);
                bml0.innerHTML = bml1.innerHTML;
                //alert(bml1.innerHTML);
                bml1.innerHTML = str;
                str = bma[i].name;
                bma[i].name = bma[i - 1].name;
                bma[i - 1].name = str;
                str = bml0.title;
                str1 = bml0.href = bml0.title = bml1.title;
                bml1.href = bml1.title = str;
                bma[i].url = str1;
                bma[i - 1].url = str;
                chrome.storage.sync.set({ bookmarkarray: bma });
            }
        } else { alert('Down where, fam?'); }
    });
    edit.addEventListener("click", function () {
        bmoptval = parseInt((this.id)[4] + ((this.id).length >= 6 ? ((this.id).length == 7 ? (this.id)[5] + (this.id)[6] : (this.id)[5]) : ""), 10);
        modal.style.display = "block";
        h1.innerHTML = "Edit Bookmark";
        h1.value = bmoptval;
        docbmname.value = bma[bmoptval].name;
        docbmurl.value = bma[bmoptval].url;
    });
    left.appendChild(bmdiv);
    bmdiv.appendChild(bmlink);
    bmlink.appendChild(bmlinkdiv);
    bmlinkdiv.appendChild(bmimg);
    bmlinkdiv.appendChild(bmname);
    bmdiv.appendChild(bmopdiv);
    bmopdiv.appendChild(bmopt);
    bmopdiv.appendChild(popup);
    popup.appendChild(top);
    popup.appendChild(moveup);
    popup.appendChild(movedown);
    popup.appendChild(bottom);
    popup.appendChild(edit);
    popup.appendChild(del);
}

function constructAddBM() {
    linebreak = document.createElement("br");
    linebreak.id = "addbmbr";
    left.appendChild(linebreak);
    addbm = document.createElement("button");
    addbm.id = "BUTTON";
    addbm.style.width = parseInt(left.style.width, 10) > 15 ? parseInt(left.style.width, 10) - 10 + "px" : (window.innerWidth) * 12 / 100 - 10 + "px";
    addbm.innerHTML = '<img src="Icons/Add.png" width="24" height="24" /> &nbsp;New bookmark';
    // When the user clicks on the button, open the modal 
    addbm.addEventListener("click", function () {
        modal.style.display = "block";
    });
    left.appendChild(addbm);
    BUTTON = addbm;
}



// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var h1 = document.getElementById("h1");

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    if (h1.value > -1) {
        h1.innerHTML = "New Bookmark";
        h1.value = -1;
        docbmname.value = "";
        docbmurl.value = "";
    }
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        if (h1.value > -1) {
            h1.innerHTML = "New Bookmark";
            h1.value = -1;
            docbmname.value = "";
            docbmurl.value = "";
        }
        modal.style.display = "none";
    }
}

document.getElementById("cancel").addEventListener("click", function () {
    if (h1.value > -1) {
        h1.innerHTML = "New Bookmark";
        h1.value = -1;
        docbmname.value = "";
        docbmurl.value = "";
    }
    modal.style.display = "none";
});

window.onkeydown = function (event) {
    if (event.keyCode == 27) {
        if (h1.value > -1) {
            h1.innerHTML = "New Bookmark";
            h1.value = -1;
            docbmname.value = "";
            docbmurl.value = "";
        }
        modal.style.display = "none";
    }
    if (event.keyCode == 13) {
        bm = { name: "", url: "" };
        bm.name = docbmname.value;
        bm.url = docbmurl.value;
        if (bm.name != null && bm.url != null) {
            if (h1.value > -1) {
                bma[h1.value].name = bm.name;
                bma[h1.value].url = bm.url;
                bml = document.getElementById("bmlink" + h1.value);
                bml.innerHTML = '<img src="https://plus.google.com/_/favicon?domain_url=' + bm.url + '"> ' + bm.name;
                bml.href = bml.title = bm.url;
                h1.innerHTML = "New Bookmark";
                h1.value = -1;
            } else {
                bma.push(bm);
                left.removeChild(BUTTON);
                left.removeChild(document.getElementById("addbmbr"));
                i = bma.length - 1;
                constructNewBookmark(bm, i);
                constructAddBM();
            }
            chrome.storage.sync.set({ bookmarkarray: bma });
            modal.style.display = "none";
            docbmname.value = "";
            docbmurl.value = "";
        } else { alert("Enter both a name and an URL (address) for the bookmark!"); }
    }
}


document.getElementById("save").addEventListener("click", function () {
    bm = { name: "", url: "" };
    bm.name = docbmname.value;
    bm.url = docbmurl.value;
    if (bm.name != null && bm.url != null) {
        if (h1.value > -1) {
            bma[h1.value].name = bm.name;
            bma[h1.value].url = bm.url;
            bml = document.getElementById("bmlink" + h1.value);
            bml.innerHTML = '<img src="https://plus.google.com/_/favicon?domain_url=' + bm.url + '"> ' + bm.name;
            bml.href = bml.title = bm.url;
            h1.innerHTML = "New Bookmark";
            h1.value = -1;
        } else {
            bma.push(bm);
            left.removeChild(BUTTON);
            left.removeChild(document.getElementById("addbmbr"));
            i = bma.length - 1;
            constructNewBookmark(bm, i);
            constructAddBM();
        }
        chrome.storage.sync.set({ bookmarkarray: bma });
        modal.style.display = "none";
        docbmname.value = "";
        docbmurl.value = "";
    } else { alert("Enter both a name and an URL (address) for the bookmark!"); }
});




setInterval(function () {
    var d = new Date();
    var day, month, time, dh10 = d.getHours(), tb = parseInt(tform, 10);
    if (tform != 10) {
        min = (d.getMinutes()).toString(tb);
        sec = (d.getSeconds()).toString(tb);
        dh = (d.getHours()).toString(tb);
    } else {
        min = d.getMinutes();
        sec = d.getSeconds();
        dh = dh10;
    }
    if (dh10 < 10 && (!AP || dh10 > 0)) {
        time = "0" + dh;
    } else {
        if (!AP || (AP && dh10 < 12)) {
            time = dh;
        } else {
            if (dh10 > 12) {
                if (dh10 < 22) {
                    time = "0" + (dh10 - 12).toString(tb);
                } else {
                    time = (dh10 - 12).toString(tb);
                }
            }
            if (dh10 == 0) {
                time = "0" + (12).toString(tb);
            }
        }
    }
    if (d.getMinutes() < 10) {
        time = time + ":0" + min;
    } else {
        time = time + ":" + min;
    }
    if (secs) {
        if (d.getSeconds() < 10) {
            time = time + ":0" + sec;
        } else {
            time = time + ":" + sec;
        }
    }
    if (AP) {
        if (dh < 12) {
            time = time + " AM";
        } else {
            time = time + " PM";
        }
    }
    doctime.innerHTML = time;

    if (date) {
        switch (d.getDay()) {
            case 0:
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day = "Saturday";
        }

        switch (d.getMonth()) {
            case 0:
                month = "January";
                break;
            case 1:
                month = "February";
                break;
            case 2:
                month = "March";
                break;
            case 3:
                month = "April";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "June";
                break;
            case 6:
                month = "July";
                break;
            case 7:
                month = "August";
                break;
            case 8:
                month = "September";
                break;
            case 9:
                month = "October";
                break;
            case 10:
                month = "November";
                break;
            case 11:
                month = "December";
        }
        switch (dform) {
            case 1:
                docdate.innerHTML = day + ", " + d.getDate() + " " + month + " " + d.getFullYear();
                break;
            case 2:
                docdate.innerHTML = day + ", " + d.getFullYear() + ", " + month + " " + d.getDate();
                break;
            case 3:
                docdate.innerHTML = day + ", " + month + " " + d.getDate() + ", " + d.getFullYear();
                break;
            case 4:
                docdate.innerHTML = day + ", " + d.getFullYear() + ", " + d.getDate() + " " + month;
        }
    }
    //bma = [];
    //chrome.storage.sync.set({bookmarkarray: bma});
}, interval);
