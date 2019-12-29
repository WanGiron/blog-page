var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get('value');
console.log(c);

// TODO get more info from blog //
function getAll() {
    fetch('/user/all-post-cat/' + c, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        return res.json();
    })
        .then((res) => {
            // console.log(res);
            let blogs = '';
            res.forEach((results) => {
                let { id, my_blogs,category, blog_image, blog_date, blog_title } = results;
                blogs += `<h1>${category}</h1>
                <div class="blog-div">
                <img class="blog-image" src="${blog_image}" class="card-img-top" alt="...">
                <div class="div-blog-body">
                <h5>${blog_title}</h5>
                <p>${category}</p>
                <p>${blog_date}</p>
                <button id=${id} class="more-btn" value=${id} onClick=(moreInfo(this.value))>Read</button>
                </div>
          </div>`;
                document.getElementById("more-content").innerHTML = blogs;
            });

        })
}

getAll();
// fot active menu buttons //
var header = document.getElementById("navigation");
var btns = header.getElementsByClassName("li-menu");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("place");
  current[0].className = current[0].className.replace("active", "");
  this.className += "active";
  });
}
