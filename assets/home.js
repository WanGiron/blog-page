function getPost() {
    fetch('gettheposts')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            let blogs = '';
            data.forEach((results) => {
                let { id, my_blogs } = results;
                blogs += `<div class="blog-div">
                            <img class="blog-image" src="https://scontent.fewr1-1.fna.fbcdn.net/v/t31.0-8/22713560_1581357185312346_3533782086177103912_o.jpg?_nc_cat=100&_nc_ohc=ntvThwDSY04AQkbyQ89-IFHNZr78O5RFH9mD5IHRi2t1PaeEh6QRzpMTw&_nc_ht=scontent.fewr1-1.fna&oh=a5c09ce1c302402a70b288660cf16cc9&oe=5E4E114C" class="card-img-top" alt="...">
                            <div class="div-blog-body">
                            <h5>Blog Title</h5>
                            <h4>${id}</h4>
                            <p>${my_blogs}</p>
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