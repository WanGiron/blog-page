
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
        let blogs = '';
            let latest = '';
            res.forEach((results) => {
                let { id, my_blogs, blog_image, blog_date, blog_title } = results;
                blogs += `<div class="blog-div">
                            <img class="blog-image" src="${blog_image}" class="card-img-top" alt="...">
                            <div class="div-blog-body">
                            <h5>${blog_title}</h5>
                            <p>${my_blogs}</p>
                            <p>${blog_date}</p>
                            </div>
                      </div>`;
                document.getElementById("my-blog").innerHTML = blogs;
            });

    })
}

moreInfo();

