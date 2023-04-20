var numberArt = document.getElementsByTagName("article").length;
const articles=[];
for(let i=0;i<numberArt;i++){
    articles.push(document.getElementsByTagName("article")[i])
    document.getElementsByTagName("article")[i].style.display = "none";
}
articles[0].style.display = "block";
console.log(articles);

var active = 0; 

function showArt(art){
    active = art;
    artSwitch(0);
}

function artSwitch(next){
    active += next;
    if(active>=articles.length){
        active=0;
    }
    if(active<0){
        active=articles.length-1;
    }
    for(var i=0;i<articles.length;i++){
        if(active == i){
            articles[i].style.display = "block";
        }else{
            articles[i].style.display = "none";
        }
    }
}

//Example
function sendToServer(form){
   
}