var save = document.getElementById("save");
var cancel = document.getElementById("cancel");
var close = document.getElementById("close");
var bmname = document.getElementById("bmname");
var bmurl = document.getElementById("bmurl");
var currentTab;
var bm;
var bma;

chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
	bmurl.value = tabs[0].url;
	bmname.value = tabs[0].title;
	currentTab = tabs[0].id;
});

chrome.storage.sync.get(['bookmarkarray'], function(bkmkarr) {
	bma = bkmkarr.bookmarkarray;
	if(bma == undefined) {
		bma = [];
	}
});


/*close.onclick = function() {
	window.close();
}

document.getElementById("cancel").addEventListener("click", function() {
	chrome.tabs.remove();
});
*/
window.onkeydown = function(event) {
	/*if (event.keyCode == 27) {
		window.close();
	}*/
	if (event.keyCode == 13) {
		bm = {name:"", url:""};
		bm.name = bmname.value;
		bm.url = bmurl.value;
		if(bm.name && bm.url){
			if(bma.length != 0) {
				if(bma[bma.length - 1].name != bm.name && bma[bma.length -1].url != bm.url){
					bma.push(bm);
					chrome.storage.sync.set({bookmarkarray: bma});
					alert("New bookmark added successfully!");
				}
			} else {
				bma.push(bm);
				chrome.storage.sync.set({bookmarkarray: bma});
				alert("New bookmark added successfully!");
			}
		} else {alert("Enter both a name and an URL (address) for the bookmark!");}
	}
}


document.getElementById("save").addEventListener("click", function() {
	bm = {name:"", url:""};
	bm.name = bmname.value;
	bm.url = bmurl.value;
	if(bm.name && bm.url){
		if(bma[bma.length - 1].name != bm.name && bma[bma.length -1].url != bm.url){
			bma.push(bm);
			chrome.storage.sync.set({bookmarkarray: bma});
			alert("New bookmark added successfully!");
		}
	} else {alert("Enter both a name and an URL (address) for the bookmark!");}
});

