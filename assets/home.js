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
                            <p>${my_blogs}</p>
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

getPost();