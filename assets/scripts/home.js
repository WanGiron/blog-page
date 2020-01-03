function getPost() {
    fetch('gettheposts')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // console.log(data);
            var data2 = data.slice(-3);
            let blogs = '';
            let latest = '';
            data2.forEach((results) => {
                let { id, my_blogs, category, blog_image, blog_date, blog_title } = results;
                blogs += `<div class="blog-div">
                            <p class="home-cat">-- ${category} --</p>
                            <img class="blog-image" src="${blog_image}" id=${id} onClick=(moreInfo(this.id)) alt="...">
                            <h5>${blog_title}</h5>        
                            <div class="div-blog-body">
                            <p class="home-date">${blog_date}</p>
                            
                            </div>
                      </div>`;
                    //   <button id=${id} class="more-btn" value=${id} onClick=(moreInfo(this.value))>Read</button> //
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
                        <button id=${last.id} class="more-btn-latest" value=${last.id} onClick=(moreInfo(this.value))>Read</button>
                        </div>
                        </div>`;
            document.getElementById("latest-post-home").innerHTML = latest;
            // home image based on latest post image // 
            document.getElementById("img-div").style.backgroundImage = `url(${last.blog_image})`;

        });
};



function moreInfo(value){
window.location='blogs.html?value='+value;

};

getPost();
// getFeed();
