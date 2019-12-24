
var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get('value');
console.log(c);



// TODO get more info from blog //
function moreInfo(){
   
    fetch('/user/more-info/'+c, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        return res.json();
    })
    .then((res)=>{
        console.log(res);

    })
}

moreInfo();

