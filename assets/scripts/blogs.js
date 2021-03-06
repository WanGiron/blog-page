

var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get('value');


// TODO get more info from blog //
function moreInfo() {

    fetch('/user/more-info/' + c, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        return res.json();
    })
        .then((res) => {
            // console.log(res);
            var results = res[0];
            var { id, my_blogs, blog_image, blog_date, blog_title, category, blog_subtitle } = results;
            var blogs = '';
            blogs += `  <p class="category-blog">-- ${category} --</p>
                        <div class="more-div">
                                <h1 class="blog-header">${blog_title}</h1>
                                <h4 class="blog-subtitle">${blog_subtitle}</h4>
                                <img class="blog-image-more" src="${blog_image}" class="more-img">
                            <div class="blog-body-div">
                                <p>${my_blogs}</p>
                            </div>
                            <hr>
                            <a href="https://facebook.com/sharer.php?u=totsandtravels.com/blogs.html?value=${id}">
                            <img src="../Images/shareBtn.png" class="share"><span class="share-text">Share</span></a>
                            <p class="date-created">${dateFormat(blog_date)}</p>                       
                        </div>


                        <div class="add-comment-form">
                        <h4 class="modal-title">Add comment</h4>
                        <form class="new-comment" name="form1" action="/add/comments" method="POST" onsubmit="return required()">
                            <div class="form-group">
                                <input type="text" class="form-control" id="name"
                                    placeholder="Enter name" name="name">
                            </div>
                            <div class="form-group">
                                <input class="blog-id" type="text"  id="val" name="val" value="${id}">
                            </div>
                            <div class="form-group">
                                <textarea maxlength="500" type="text" class="form-control" id="comment" 
                                    placeholder="Add comment here (500 Character max)" name="comment"></textarea>
                            </div>
                            <button class="option1-li" type="submit" name="submit">Submit</button>
                        </form>
                        </div>
                        `;
            document.getElementById("my-blog").innerHTML = blogs;
        });
}

// form validation // 
function required() {
    var empt = document.form1.name.value;
    var empt2 = document.form1.comment.value;
    
    if (empt.trim() == "" || empt2.trim() == "") {
        alert("Please fill all entries");
        return false;
    }
    else {
        alert('Thanks for your comment!');
        return true;
    }
}



//TODO get comment for blogs //
function getComments() {
    fetch('/get/comments/blogs/' + c)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            let comments = '';
            data.forEach((results) => {
                let { id, comment_id, user_name, new_comment, date_created } = results;
                comments += `
                <div class="comments-blog">
                    <h4 class="comment-user">${user_name}</h4>
                    <p class="comment-body">${new_comment}</p>
                    <span class="comment-date">(${formatCommentsDate(date_created)})</span>
                </div>
                <hr>
                `
                document.getElementById("new-comments").innerHTML = comments;
                document.getElementById('total-comments').innerHTML = `(${data.length})`;
            });

        });
};

//TODO send comment for blog to db //
// function sendComment() {
//     var name = document.getElementById('name').value;
//     var commentBody = document.getElementById('comment').value;
//     var val = document.getElementById('val').value;
//     //check for validation//
//     if (name === "" || commentBody === "") {
//         alert('Please fill all entries')
//     }

//     //post request if validation is right//
//     else {
//         var comment = {
//             user: name,
//             content: commentBody,
//             id: val
//         };

//         fetch('/add/comments', {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(comment),
//             redirect: "follow"
//         }).then(function(){
//             window.location.replace('http://localhost:5005/blogs.html?value='+val);
//         })   

//     };

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

//date for blogs //
function dateFormat(blog_date) {
    let d = blog_date.split('-');
    return `${months[d[1]]} ${d[2]}, ${d[0]} `;
}

//date for comments //
function formatCommentsDate(date_created) {
    let d = date_created.split('-');
    var day = d[2].split('T');
    return `${months[d[1]]} ${day[0]}, ${d[0]}`;
}

moreInfo();
getComments();


