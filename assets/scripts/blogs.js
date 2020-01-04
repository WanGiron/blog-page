
var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get('value');


// TODO get more info from blog //
function moreInfo() {

    fetch('/user/more-info/' + c, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        return res.json();
    })
        .then((res) => {
            // console.log(res);
            var results = res[0];
            var { id, my_blogs, blog_image, blog_date, blog_title, category } = results;
            var blogs = '';
            blogs += `<p class="category-blog">-- ${category} --</p>
                            <div class="more-div">
                            <h3 class="blog-header">${blog_title}</h3>
                            <img class="blog-image-more" src="${blog_image}" class="more-img">
                            <div class="blog-body-div">
                                <p>${my_blogs}</p>
                            </div>
                            <hr>
                            <p class="date-created">${blog_date}</p>                       
                        </div>`;
            document.getElementById("my-blog").innerHTML = blogs;
        });
}

function modal(id) {
    var img = document.createElement('img');
    img.setAttribute('src', id);
    var div = document.getElementById('modal-img');
    div.appendChild(img);
}

moreInfo();



