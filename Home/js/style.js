/**
 * Created by dell on 2015/12/10.
 */

function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
var items=document.querySelectorAll(".title ul a");

console.log(items.length);
for(var i=0;i<items.length;i++) {
    items[i].onclick = function () {
        if (hasClass(this, "change")) {
            console.log(this);
            this.classList.remove("change");
        }
        titles = document.querySelectorAll(".title ul a");
        console.log(titles);
        for (var i = 0; i < titles.length; i++) {
            if (titles[i] != this && !hasClass(titles[i], "change"))

                titles[i].classList.add("change");
        }

    }
}



