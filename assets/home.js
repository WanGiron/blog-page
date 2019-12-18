function getPost() {
    fetch('gettheposts')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            let blogs = '';
            data.forEach((results) => {
                let { id, my_blogs, blog_image, blog_date, blog_title } = results;
                blogs += `<div class="blog-div">
                            <img class="blog-image" src="${blog_image}" class="card-img-top" alt="...">
                            <div class="div-blog-body">
                            <h5>${blog_title}</h5>
                            <p>${blog_date}</p>
                            <button class="more-btn">Read</button>
                            </div>
                      </div>`;
                document.getElementById("posts").innerHTML = blogs;
            });
            
            // to get las blog in array //
            let last = data.slice(-1)[0]
            console.log(last);

        });
};

var token = '1754099140.2a0b257.eabf8e6964fd4b7c912e02aaefc497d7';
var num_photos = 10;
function getFeed(){
    fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token + '&count=' + num_photos)
            .then(res => {
                return res.json();
            })
            .then(res => {
                console.log(res.data);
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

getPost();
getFeed();