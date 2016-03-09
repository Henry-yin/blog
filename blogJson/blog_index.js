function blog(title, author, time, category, keywords) {
	this.title = title;
	this.author = author;
	this.time = time;
	this.category = category;
	var temp = [];
	temp = keywords.split('；');
	this.keywords = temp;
	this.listid = 'attaches_ul';
	this.jsonStr = "";
}
blog.prototype = {
	showJson: function() {
		var js = document.querySelector('#showJson').querySelector('textarea');

		var str = "{",
			k = 0,t = 0;
		for (var i in this)
			if (k++ < 5) {
				str += '"'+ i+'"' + ':' +'"'+ this[i] + '"' ;
			if(t++<4) str+=',';
			};
		str += '}';
		js.innerHTML = str;
		this.jsonStr = str;
	},
	preview: function() {
		var w = window.open("preview.html");
		var d = w.document;
		d.write(" <br>");

		var div = d.createElement('div');
		div.innerHTML = '<div style="text-align: center;">' + '<h2>' + this.title + '</h2>' + '<span>' + this.author + '</span>' + '<span>' + this.time + '</span>' + '<span>' + this.category + '</span>' + '<p>' + '<span>关键词：</span>' + '<span>' + this.keywords + '</span>' + '</p>' + '</div>';
		d.body.appendChild(div);
		d.close();
	}
	

}
var btns = document.querySelector('#button').querySelectorAll('button');
btns[0].onclick = function() {
	var inputs = document.querySelector('#button').querySelectorAll('input');
	datas = [];
	for (var i = 0; i < inputs.length; i++)
		datas[i] = inputs[i].value;

	var blogJson = new blog(datas[0], datas[1], datas[2], datas[3], datas[4]);
	blogJson.showJson();
}
btns[1].onclick = function() {
	var inputs = document.querySelector('#button').querySelectorAll('input');
	datas = [];
	for (var i = 0; i < inputs.length; i++)
		datas[i] = inputs[i].value;

	var blogJson = new blog(datas[0], datas[1], datas[2], datas[3], datas[4]);
	blogJson.preview();
}
