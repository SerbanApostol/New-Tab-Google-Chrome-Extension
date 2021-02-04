var bgim = null;
var bgcolor = null;
var txtcolor =null ;
var tform = null;
var dform = null;
var fontsize = null;
var transp = null;
var settclr = null;
tips = document.getElementById("tips");
repeatx = document.getElementById("repeatx");
repeaty = document.getElementById("repeaty");
sizex = document.getElementById("sizex");
sizey = document.getElementById("sizey");
cogclr = document.getElementById("cogclr");
chrome.storage.sync.get([
	'repeatx',
	'repeaty',
	'sizex',
	'sizey',
	'AP',
	'secs',
	'date',
	'bookmark_tab'
],function(bool){
	if(bool.repeatx){
		repeatx.checked = true;
	} else {
		repeatx.checked = false;
	}
	if(bool.repeaty){
		repeaty.checked = true;
	} else {
		repeaty.checked = false;
	}
	if(bool.sizex){
		sizex.checked = true;
	} else {
		sizex.checked = false;
	}
	if(bool.sizey){
		sizey.checked = true;
	} else {
		sizey.checked = false;
	}
	if(bool.AP){
		document.getElementById("AP").checked = true;
	} else {
		document.getElementById("AP").checked = false;
	}
	if(bool.secs){
		document.getElementById("secs").checked = true;
	} else {
		document.getElementById("secs").checked = false
	}
	if(bool.date == false){
		document.getElementById("date").checked = false;
	} else {
		document.getElementById("date").checked = true;
	}
	if(bool.bookmark_tab == false){
		document.getElementById("bmtab").checked = false;
	} else {
		document.getElementById("bmtab").checked = true;
	}
});
if(window.innerWidth < 1120){
	tips.className = "tipssmall";
}

  let page = document.getElementById('BgClrButtonDiv');
  const kButtonColors = ['#e8453c','tomato','lightcoral','lightsalmon', '#f9bb2d','lightgreen', '#3aa757','darkcyan', '#4688f1', 'lightblue','purple','rebeccapurple','white','lightgrey','darkgrey','black'];
  function constructBgColorOptions(kButtonColors) {
    for (let item of kButtonColors) {
      let button = document.createElement('button');
      button.style.backgroundColor = item;
      button.className += "button";
      button.addEventListener('click', function() {
        bgcolor = item;
	document.body.style.backgroundColor = bgcolor;
      });
      page.appendChild(button);
    }
  }
  constructBgColorOptions(kButtonColors);

  page = document.getElementById('ClrButtonDiv');
  function constructTextColorOptions(kButtonColors) {
    for (let item of kButtonColors) {
      let button = document.createElement('button');
      button.style.backgroundColor = item;
      button.className += "button";
      button.addEventListener('click', function() {
        txtcolor = item;
	document.body.style.color = txtcolor;
      });
      page.appendChild(button);
    }
  }
  constructTextColorOptions(kButtonColors);

  page = document.getElementById('BmTxtClrButtonDiv');
  function constructBmTextColorOptions(kButtonColors) {
    for (let item of kButtonColors) {
      let button = document.createElement('button');
      button.style.backgroundColor = item;
      button.className += "button";
      button.addEventListener('click', function() {
        bmtxtcolor = item;
	document.body.style.color = bmtxtcolor;
      });
      page.appendChild(button);
    }
  }
  constructBmTextColorOptions(kButtonColors);

window.addEventListener("resize", function(){
	if(window.innerWidth < 1120){
		tips.className = "tipssmall";
	}
	if(window.innerWidth >= 1120){
		tips.className = "tipsnormal";
	}
});

  document.getElementById("newbgclr").addEventListener("change", function(){
	bgcolor = document.getElementById("newbgclr").value;
  });

  document.getElementById("newtxtclr").addEventListener("change", function(){
	txtcolor = document.getElementById("newtxtclr").value;
  });

  document.getElementById("BgDropDown").addEventListener("change", function(){
	bgim = document.getElementById("BgDropDown").value;
	document.getElementById("preview").src = bgim;
  });

  cogclr.addEventListener("change", function(){
	settclr = cogclr.value;
	document.getElementById("preview2").src = "Icons/settings" + settclr + ".png";
  });

  document.getElementById("dateformat").addEventListener("change", function(){
	dform = document.getElementById("dateformat").value;
  });

  document.getElementById("timeBase").addEventListener("change", function(){
	tform = document.getElementById("timeBase").value;
  });

  document.getElementById("fs").addEventListener("change", function(){
	fontsize = document.getElementById("fs").value;
  });

  document.getElementById("alpha").addEventListener("change", function(){
	transp = document.getElementById("alpha").value;
  });

  document.getElementById("newbg").addEventListener("change", function(){
	bgim = document.getElementById("newbg").value;
	document.getElementById("preview").src = bgim;
  });

document.getElementById("save").addEventListener("click", function(){
	if(bgim == null && bgcolor == null && txtcolor == null && dform == null && tform == null && settclr == null) {
		alert("There where no changes made!");
		return;
	}
	if(bgim != null){
		chrome.storage.sync.set({'bgim': bgim}, function(){});
	}
	if(bgcolor != null){
		chrome.storage.sync.set({back_color: bgcolor}, function() {
          		console.log('Background color is ' + bgcolor);
        	});
		document.body.style.backgroundColor = bgcolor;
	}
	if(settclr != null){
		chrome.storage.sync.set({'settings_color': settclr}, function(){});
	}
	if(txtcolor != null){
		chrome.storage.sync.set({text_color: txtcolor}, function() {
          		console.log('Text color is ' + txtcolor);
        	});
		document.body.style.color = txtcolor;
	}
	chrome.storage.sync.set({repeatx: repeatx.checked == true});
	chrome.storage.sync.set({repeaty: repeaty.checked == true});
	chrome.storage.sync.set({sizex: sizex.checked == true});
	chrome.storage.sync.set({sizey: sizey.checked == true});
	x = document.getElementById("AP").checked;
	chrome.storage.sync.set({AP: x.checked == true});
	x = document.getElementById("secs").checked;
	chrome.storage.sync.set({secs: x.checked == true});
	x = document.getElementById("date").checked;
	chrome.storage.sync.set({date: x.checked == true});
	if(dform != null){
		chrome.storage.sync.set({date_format: dform});
	}
	if(tform != null){
		chrome.storage.sync.set({timeBase: tform});
	}
	if(bmtxtcolor != null){
		chrome.storage.sync.set({bm_text_color: bmtxtcolor}, function() {
          		console.log('Text color is ' + bmtxtcolor);
        	});
		document.body.style.color = bmtxtcolor;
	}
	x = document.getElementById("bmtab");
	chrome.storage.sync.set({bookmark_tab: x.checked == true});
	if(fontsize != null){
		chrome.storage.sync.set({font_size_bmtab: fontsize});
	}
	if(transp != null){
		chrome.storage.sync.set({alpha: transp});
	}
});

document.getElementById("defa").addEventListener("click", function(){
	bgim="GradientOrangeToRed.png";
	chrome.storage.sync.get(['bgim'], function(prevbg){
		chrome.storage.sync.set({prev_bgim: prevbg.bgim});
	});
	chrome.storage.sync.set({'bgim': bgim});
	chrome.storage.sync.set({'repeatx': false});
	chrome.storage.sync.set({'repeaty': false});
	chrome.storage.sync.set({'sizex': false});
	chrome.storage.sync.set({'sizey': false});
	bgcolor = 'lightblue';
	chrome.storage.sync.get(['back_color'], function(prevclr){
		chrome.storage.sync.set({prev_back_color: prevclr.back_color});
	});
	chrome.storage.sync.get(['settings_color'], function(prevsett){
		chrome.storage.sync.set({prev_settings_color: prevsett.settings_color});
	});
	chrome.storage.sync.set({'settings_color': "Black"});
	chrome.storage.sync.set({back_color: bgcolor}, function() {
          	console.log('Background color is ' + bgcolor);
        });
	document.body.style.backgroundColor = bgcolor;
	txtcolor = 'white';
	chrome.storage.sync.get(['text_color'], function(prevtxt){
		chrome.storage.sync.set({prev_text_color: prevtxt.text_color});
	});
	chrome.storage.sync.set({text_color: txtcolor}, function() {
      		console.log('Text color is ' + txtcolor);
       	});
	document.body.style.color = txtcolor;
	chrome.storage.sync.set({'AP': false});
	chrome.storage.sync.set({'secs': false});
	chrome.storage.sync.set({'date': true});
	chrome.storage.sync.set({'date_format': "1"});
	chrome.storage.sync.set({'timeBase': "10"});
	chrome.storage.sync.set({'bookmark_tab': true});
	chrome.storage.sync.set({'bm_text_color': "black"});
	chrome.storage.sync.set({'font_size_bmtab': "16px"});
	chrome.storage.sync.set({'alpha': "0.2"});
});

document.getElementById("defabg").addEventListener("click",function(){
	bgim="GradientOrangeToRed.png";
	chrome.storage.sync.get(['bgim'], function(prevbg){
		chrome.storage.sync.set({prev_bgim: prevbg.bgim});
	});
	chrome.storage.sync.set({'bgim': bgim});
	chrome.storage.sync.set({'repeatx': false});
	chrome.storage.sync.set({'repeaty': false});
	chrome.storage.sync.set({'sizex': false});
	chrome.storage.sync.set({'sizey': false});
});

document.getElementById("defaclr").addEventListener("click",function(){
	bgcolor = 'lightblue';
	chrome.storage.sync.get(['back_color'], function(prevclr){
		chrome.storage.sync.set({prev_back_color: prevclr.back_color});
	});
	chrome.storage.sync.set({back_color: bgcolor}, function() {
          	console.log('Background color is ' + bgcolor);
        });
	document.body.style.backgroundColor = bgcolor;
	chrome.storage.sync.get(['settings_color'], function(prevsett){
		chrome.storage.sync.set({prev_settings_color: prevsett.settings_color});
	});
	chrome.storage.sync.set({'settings_color': "Black"});
});

document.getElementById("defatxt").addEventListener("click",function(){
	txtcolor = 'white';
	chrome.storage.sync.get(['text_color'], function(prevtxt){
		chrome.storage.sync.set({prev_text_color: prevtxt.text_color});
	});
	chrome.storage.sync.set({text_color: txtcolor}, function() {
      		console.log('Text color is ' + txtcolor);
       	});
	document.body.style.color = txtcolor;
	chrome.storage.sync.set({'AP': false});
	chrome.storage.sync.set({'secs': false});
	chrome.storage.sync.set({'date': true});
	chrome.storage.sync.set({'date_format': "1"});
	chrome.storage.sync.set({'timeBase': "10"});
});

document.getElementById("defabm").addEventListener("click",function(){
	chrome.storage.sync.set({'bookmark_tab': true});
	chrome.storage.sync.set({bm_text_color: "black"});
	chrome.storage.sync.set({'font_size_bmtab': "16px"});
	chrome.storage.sync.set({'alpha': "0.2"});
});

document.getElementById("savebm").addEventListener("click",function(){
	if(bmtxtcolor != null){
		chrome.storage.sync.get(['bm_text_color'], function(prevbmtxt){
			chrome.storage.sync.set({prev_bm_text_color: prevbmtxt.bm_text_color});
		});
		chrome.storage.sync.set({bm_text_color: bmtxtcolor}, function() {
      			console.log('Text color is ' + bmtxtcolor);
	       	});
		document.body.style.color = bmtxtcolor;
	}
	x = document.getElementById("bmtab");
	chrome.storage.sync.set({bookmark_tab: x.checked == true});
	if(fontsize != null){
		chrome.storage.sync.set({font_size_bmtab: fontsize});
	}
	if(alpha != null){
		chrome.storage.sync.set({alpha: transp});
	}
});

document.getElementById("resetbm").addEventListener("click",function(){
	chrome.storage.sync.get(['prev_bm_text_color'], function(prev){
		bmtxtcolor = prev.prev_bm_text_color;
	});
	chrome.storage.sync.get(['bm_text_color'], function(prevtxt){
		chrome.storage.sync.set({prev_bm_text_color: prevtxt.bm_text_color});
	});
	chrome.storage.sync.set({bm_text_color: bmtxtcolor}, function() {
      		console.log('Text color is ' + bmtxtcolor);
       	});
	document.body.style.color = bmtxtcolor;
});

document.getElementById("savetxt").addEventListener("click",function(){
	if(txtcolor != null){
		chrome.storage.sync.get(['text_color'], function(prevtxt){
			chrome.storage.sync.set({prev_text_color: prevtxt.text_color});
		});
		chrome.storage.sync.set({text_color: txtcolor}, function() {
      			console.log('Text color is ' + txtcolor);
	       	});
		document.body.style.color = txtcolor;
	}
	x = document.getElementById("AP");
	chrome.storage.sync.set({AP: x.checked == true});
	x = document.getElementById("secs");
	chrome.storage.sync.set({secs: x.checked == true});
	x = document.getElementById("date");
	chrome.storage.sync.set({date: x.checked == true});
	if(dform != null){
		chrome.storage.sync.set({date_format: dform});
	}
	if(tform != null){
		chrome.storage.sync.set({timeBase: tform});
	}
});

document.getElementById("resettxt").addEventListener("click",function(){
	chrome.storage.sync.get(['prev_text_color'], function(prev){
		txtcolor = prev.prev_text_color;
	});
	chrome.storage.sync.get(['text_color'], function(prevtxt){
		chrome.storage.sync.set({prev_text_color: prevtxt.text_color});
	});
	chrome.storage.sync.set({text_color: txtcolor}, function() {
      		console.log('Text color is ' + txtcolor);
       	});
	document.body.style.color = txtcolor;
});

document.getElementById("saveclr").addEventListener("click",function(){
	if(bgcolor != null){
		chrome.storage.sync.get(['back_color'], function(prevclr){
			chrome.storage.sync.set({prev_back_color: prevclr.back_color});
		});
		chrome.storage.sync.set({back_color: bgcolor}, function() {
          		console.log('Background color is ' + bgcolor);
	        });
		document.body.style.backgroundColor = bgcolor;
	}
	if(settclr != null){
		chrome.storage.sync.get(['settings_color'], function(prevclr){
			chrome.storage.sync.set({prev_setings_color: prevclr.settings_color});
		});
		chrome.storage.sync.set({'settings_color': settclr}, function(){});
	}
});

document.getElementById("resetclr").addEventListener("click",function(){
	chrome.storage.sync.get(['prev_back_color'], function(prev){
		bgcolor = prev.prev_back_color;
	});
	chrome.storage.sync.get(['back_color'], function(prevclr){
		chrome.storage.sync.set({prev_back_color: prevclr.back_color});
	});
	chrome.storage.sync.set({back_color: bgcolor}, function() {
       		console.log('Background color is ' + bgcolor);
        });
	document.body.style.backgroundColor = bgcolor;
	chrome.storage.sync.get(['prev_settings_color'], function(prev){
		settclr = prev.prev_settings_color;
	});
	chrome.storage.sync.get(['settings_color'], function(prevclr){
		chrome.storage.sync.set({prev_settings_color: prevclr.settings_color});
	});
	chrome.storage.sync.set({settnings_color: bgcolor});
});

document.getElementById("savebg").addEventListener("click",function(){
	if(bgim != null) {
		chrome.storage.sync.get(['bgim'], function(prevbg){
			chrome.storage.sync.set({prev_bgim: prevbg.bgim});
		});
		chrome.storage.sync.set({bgim: bgim});
	}
	chrome.storage.sync.set({repeatx: repeatx.checked == true});
	chrome.storage.sync.set({repeaty: repeaty.checked == true});
	chrome.storage.sync.set({sizex: sizex.checked == true});
	chrome.storage.sync.set({sizey: sizey.checked == true});
});

document.getElementById("resetbg").addEventListener("click",function(){
	chrome.storage.sync.get(['prev_bgim'], function(prev){
		bgim = prev.prev_bgim;
	});
	chrome.storage.sync.get(['bgim'], function(prevbg){
		chrome.storage.sync.set({prev_bgim: prevbg.bgim});
	});
	chrome.storage.sync.set({bgim: bgim});
});
