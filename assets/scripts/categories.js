var contentDiv = document.getElementById('body-blogs-div');


// to get parms from url //
var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get('value');
console.log(c);

var h1 = document.createElement('h1');
h1.setAttribute('class', 'header');

function title() {
    switch (c) {
        case 'Travel':
            
            console.log('vacations')
            var node = document.createTextNode('Perfect vacations with your toddler');
            h1.appendChild(node);
            contentDiv.prepend(h1);
            break;
        case 'Tips':
            
            console.log('tips');
            var node = document.createTextNode('Tips!');
            h1.appendChild(node);
            contentDiv.prepend(h1);
            break;
        case 'Day-trips':
            
            console.log('day trip')
            var node = document.createTextNode('One Day Trips with Toddlers');
            h1.appendChild(node);
            contentDiv.prepend(h1);
            break;
        default:
    }

}

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
                let { id, my_blogs, category, blog_image, blog_date, blog_title } = results;
                blogs += `
                <div class="blog-div-cat">
                <img class="blog-img-cat" src="${blog_image}" class="card-img-top" alt="...">
                <div class="blog-body-cat">
                <h2 class="title-blog">${blog_title}</h2>
                <hr>
                <p>${category}</p>
                <p>${blog_date}</p>
                <button id=${id} class="more-btn" value=${id} onClick=(moreInfo(this.value))>Read</button>
                </div>
               </div>`;
                document.getElementById("more-content").innerHTML = blogs;
            });

        })
}

// //To get more info from the categories pages //
function moreInfo(value) {
    window.location = 'blogs.html?value=' + value;

};


getAll();
title();

