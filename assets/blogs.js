
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
                blogs += `<div class="more-div">
                            <h1 class="blog-header">${blog_title}</h1>
                            <img class="blog-image" src="${blog_image}" class="more-img" alt="...">
                            <div class="blog-body-div">
                            <p>${my_blogs}</p>
                            <p class="date-created">${blog_date}</p>
                            </div>
                      </div>`;
                document.getElementById("my-blog").innerHTML = blogs;
            });

    })
}

moreInfo();

