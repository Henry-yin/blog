

function createuuid() {
var s = [];
var hexDigits = "0123456789abcdef";//组成十六进制数的所有字符
for (var i = 0; i < 36; i++) {
s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
}
s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
s[8] = s[13] = s[18] = s[23] = "-";

var uuid = s.join("");
return uuid;
}

function Attach_img(id, title, src, align, w, h) {
	this.id = id;
	this.type = 'image';
	this.title = title;
	this.src = src;
	this.align = align;
	this.width = w;
	this.height = h;
	this.listid = 'attaches_ul';
	this.jsonStr="";
}
Attach_img.prototype = {
	showJson: function() {
		var js = document.querySelector('#attach_img').querySelector('textarea');

		var str='{',
			k = 0,t=0;
		for (var i in this)
			if (k++ < 7) {
				str +='"'+ i+'"'+ ':' +'"'+ this[i]+'"' ;
			if(t++<6) str+= ',';	
			};
		str += '}';
		js.innerHTML = str;
        this.jsonStr=str;
	},


	preshow: function() {
		var w = window.open(encodeURI("display.html"+'?'+this.jsonStr));
		
		d.close();
	},

	confirm: function() {

		var ul = document.querySelector('#' + this.listid),
			li = document.createElement('li');

		li.data = '#attach-' + this.type + '-' + this.id + '#';
		li.innerHTML = this.type + '-' + this.id;
		ul.appendChild(li);
	},

}

Attach_img.newJson=function  () {
	var inputs = document.querySelector('#attach_img').querySelectorAll('.attach_img_form'),
			datas = [];

		for (var i = 0; i < inputs.length; i++) datas[i] = inputs[i].value;
		var aligns = document.querySelector('#attach_img_radio').align;

		var align;
		for (var i in aligns)
			if (aligns[i].checked) align = aligns[i].value;

		var wse = document.querySelector('#attach_img_width');
		var widthd = wse.options[wse.selectedIndex].value,//宽度修饰符
			hse = document.querySelector('#attach_img_height');
		heightd = hse.options[hse.selectedIndex].value;
		
		
       var id=createuuid();
		return new Attach_img(id,datas[0], datas[1],  align, datas[2] + widthd, datas[3] + heightd);
}

Attach_img.thisJson=null;

var btns = document.querySelector('#attach_img').querySelectorAll('button');
btns[0].onclick = function() {
	 var img = Attach_img.newJson();
	 Attach_img.thisJson=img;
	img.showJson();

}
btns[1].onclick = function() {
	Attach_img.thisJson.preshow();
//	new Attach_img("","","catehead4.png","right_float","100px",'100px').preshow();
}
btns[2].onclick = function() {
	Attach_img.thisJson.confirm();
	//new Attach_img("10001","","catehead4.png","center","100px",'100px').confirm();
}