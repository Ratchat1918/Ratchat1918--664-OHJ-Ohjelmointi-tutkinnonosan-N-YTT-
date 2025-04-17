let tuoteIndex=0;
let urlLsit=[];
let imgNum=0
function createSlideShow(){
    fetch('./tavaraLista.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                if(element.tuoteIndex===0){
                    element.kuvaUrl.forEach(imgUrl=>{
                        urlLsit.push(imgUrl);
                    })
                }
                document.getElementById("slideshowContainer").innerHTML=`<img img id="imgTuote" src="${urlLsit[imgNum]}" style="max-width: 500px;">`;
            });
        });
};
createSlideShow();
function createTuoteInfo(){
    fetch('./tavaraLista.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                if(element.tuoteIndex===0){
                    document.getElementById("tuoteNimi").textContent=`${element.tuoteNimi}`;
                    document.getElementById("tuoteInfo").innerHTML+=`<p>${element.tuoteKuvausPitka}</p>`;
                }
            });
        });
};
createTuoteInfo();

function nextImg(){
    if(imgNum<urlLsit.length-1){
        imgNum++;
        console.log(imgNum);
        document.getElementById("slideshowContainer").innerHTML=`<img img id="imgTuote" src="${urlLsit[imgNum]}" style="max-width: 500px;">`;
    }
}
function previousImg(){
    if(imgNum>0){
        imgNum--;
        console.log(imgNum);
        document.getElementById("slideshowContainer").innerHTML=`<img id="imgTuote" src="${urlLsit[imgNum]}">`;
    }
}
