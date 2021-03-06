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
                let { id, my_blogs, category, blog_image, blog_date, blog_title, blog_intro } = results;
                blogs += `<div class="blog-div">
                            <p class="home-cat">-- ${category} --</p>
                            <img class="blog-image" src="${blog_image}" id=${id} onClick=(moreInfo(this.id))>
                            <h5>${blog_title}</h5>        
                            <div class="div-blog-body">
                            <p class="blog-intro-home">${blog_intro}</p>
                            <p class="home-date">${dateFormat(blog_date)}</p>
                            </div>
                            <hr class="hr-blogs-home">
                      </div>
                      `;
                //   <button id=${id} class="more-btn" value=${id} onClick=(moreInfo(this.value))>Read</button> //
                document.getElementById("posts").innerHTML = blogs;
            });

            // to get las blog in array //

            let last = data.slice(-1)[0]
            let { id, my_blogs, category, blog_image, blog_date, blog_title } = last;
            // console.log(last);
            latest += `<div class="latest-blog-navigation">
                        <div class="div-home-latest">
                        <p class="cat-latest">${category}</p>
                        <h3 class="latest-blog-title">${blog_title}</h3>
                        <p class="latest-blog-date">${dateFormat(blog_date)}</p>
                        <button id=${id} class="more-btn-latest" value=${id} onClick=(moreInfo(this.value))>Read more</button>
                        <hr>
                        <p class="share">Follow me! <a href="https://www.instagram.com/totsandtravel/"><img src="../Images/instalogo.png" class="social-media-img" alt="pic" /></a></p>
                        <p class="share">Share <a href="https://facebook.com/sharer.php?u=totsandtravels.com/blogs.html?value=${id}"><img class="social-media-img" src="../Images/facelogo.png"/></a></p>
                        </div>
                        </div>`;
            document.getElementById("latest-post-home").innerHTML = latest;
            // home image based on latest post image // 
            document.getElementById("img-div").style.backgroundImage = `url(${blog_image})`;

        });
};

// function messageSubs() {
//     fetch("/email/list/subs")
//         .then(function (res) {
//             return res.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             alert(data);
//         });
// };

// Format date //
let months = {
    '01': "January",
    '02': "February",
    '03': "March",
    '04': "April",
    '05': "May",
    '06': "June",
    '07': "July",
    '08': "August",
    '09': "September",
    '10': "October",
    '11': "November",
    '12': "December"
}


function dateFormat(blog_date) {
    let d = blog_date.split('-');
    return `${months[d[1]]} ${d[2]}, ${d[0]} `;
}


function moreInfo(value) {
    window.location = 'blogs.html?value=' + value;
};

getPost();

// getFeed();
