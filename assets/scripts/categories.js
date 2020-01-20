var contentDiv = document.getElementById('body-blogs-div');


// to get parms from url //
var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get('value');
// console.log(c);

// TODO: change page title based on category // 
var h3 = document.createElement('h3');
h3.setAttribute('class', 'header');
var p = document.createElement('p');
p.setAttribute('class', 'subtitle');
var traveHeader = document.createTextNode('TRAVELS');
var travelSub = document.createTextNode('Perfect vacations with your toddler!');
var tipsHeader = document.createTextNode('TIPS!');
var tipsSub = document.createTextNode('Useful tips for your adventures!');
var trips = document.createTextNode('DAY TRIPS');
var tripsSub = document.createTextNode('One day trips with toddlers');
//----------------------------------------------------//

var styleTravels = document.getElementById('travels');
var styleTips = document.getElementById('tips');
var styleTrips = document.getElementById('trips');

function title() {
    switch (c) {
        case 'Travel':
            h3.appendChild(traveHeader);
            p.appendChild(travelSub);
            contentDiv.prepend(h3);
            contentDiv.prepend(p);
            //-------------------//
            styleTravels.setAttribute('class', 'active-travels');
            break;

        case 'Tips': 
            h3.appendChild(tipsHeader);
            p.appendChild(tipsSub);
            contentDiv.prepend(h3);
            contentDiv.prepend(p);
            //-------------------//
            styleTips.setAttribute('class', 'active-tips');
            break;

        case 'Day-trips':           
            h3.appendChild(trips);
            p.appendChild(tripsSub);
            contentDiv.prepend(h3);
            contentDiv.prepend(p);
            //-------------------//
            styleTrips.setAttribute('class', 'active-trips');
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
                let { id, my_blogs, category, blog_image, blog_date, blog_title, blog_intro } = results;
                blogs += `
                <div class="blog-div">
                <img class="blog-img blog-image" src="${blog_image}" id=${id} onClick="moreInfo(this.id)">
                <div class="blog-body">
                <h4 class="title-blog">${blog_title}</h4>
                <p class="blog-intro-home">${blog_intro}</p>
                <p class="home-date">${blog_date}</p>
                </div>
                <hr class="hr-blogs-home">
               </div>`;
                document.getElementById("more-content").innerHTML = blogs;
                // <button id=${id} class="more-btn" value=${id} onClick="moreInfo(this.value)">Read</button>
            });

        })
}

// //To get more info from the categories pages //
function moreInfo(value) {
    window.location = 'blogs.html?value=' + value;

};


getAll();
title();

