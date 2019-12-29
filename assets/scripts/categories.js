var contentDiv = document.getElementById('body-blogs-div');


// to get parms from url //
var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get('value');
console.log(c);

// TODO: change page title based on category // 
var h1 = document.createElement('h1');
h1.setAttribute('class', 'header');
var node1 = document.createTextNode('Perfect vacations with your toddler');
var node2 = document.createTextNode('Tips!');
var node3 = document.createTextNode('One Day Trips with Toddlers');

function title() {
    switch (c) {
        case 'Travel':
            h1.appendChild(node1);
            contentDiv.prepend(h1);
            break;

        case 'Tips': 
            h1.appendChild(node2);
            contentDiv.prepend(h1);
            break;

        case 'Day-trips':           
            h1.appendChild(node3);
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
                <img class="blog-img-cat blog-image" src="${blog_image}" id=${id} onClick="moreInfo(this.id)">
                <div class="blog-body-cat">
                <h2 class="title-blog">${blog_title}</h2>
                <hr>
                <p>${category}</p>
                <p>${blog_date}</p>
                <button id=${id} class="more-btn" value=${id} onClick="moreInfo(this.value)">Read</button>
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

