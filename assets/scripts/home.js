function getPost() {
    fetch('gettheposts')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // console.log(data);
            let blogs = '';
            let latest = '';
            data.forEach((results) => {
                let { id, my_blogs, category, blog_image, blog_date, blog_title } = results;
                blogs += `<div class="blog-div">
                            <img class="blog-image" src="${blog_image}" class="card-img-top" alt="...">
                            <div class="div-blog-body">
                            <h5>${blog_title}</h5>
                            <p>${category}</p>
                            <p>${blog_date}</p>
                            <button id=${id} class="more-btn" value=${id} onClick=(moreInfo(this.value))>Read</button>
                            </div>
                      </div>`;
                document.getElementById("posts").innerHTML = blogs;
            });

            // to get las blog in array //
            let last = data.slice(-1)[0]
            // console.log(last);
            latest += `<div class="latest-blog-navigation">
                        <div class="div-home-latest">
                        <h1 class="latest-blog-title">${last.blog_title}</h1>
                        <p>${last.category}</p>
                        <p class="latest-blog-date">${last.blog_date}</p>
                        <button id=${last.id} class="more-btn" value=${last.id} onClick=(moreInfo(this.value))>Read</button>
                        </div>
                        </div>`;
            document.getElementById("latest-post-home").innerHTML = latest;
            // home image based on latest post image // 
            document.getElementById("img-div").style.backgroundImage = `url(${last.blog_image})`;

        });
};


var token = '1754099140.2a0b257.eabf8e6964fd4b7c912e02aaefc497d7';
var num_photos = 12;
function getFeed() {
    fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token + '&count=' + num_photos)
        .then(res => {
            return res.json();
        })
        .then(res => {
            // console.log(res.data);
            var feed = res.data;
            feed.map(results => {
                var img = document.createElement('img');
                img.setAttribute('src', results.images.low_resolution.url);
                img.setAttribute('class', 'insta-feed-img');
                var div = document.getElementById('instagram-feed');
                div.appendChild(img);
            })

        })
        .catch(err => {
            console.log(err)
        })
}


function moreInfo(value){
window.location='blogs.html?value='+value;

};

getPost();
getFeed();

// fot active menu buttons //
var header = document.getElementById("navigation");
var btns = header.getElementsByClassName("li-menu");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("li-menu");
  current[0].className = current[0].className.replace("place", "");
  this.className += "active";
  });
}