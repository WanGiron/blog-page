
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
            var { id, my_blogs, blog_image, blog_date, blog_title, category } = results;
            var blogs = '';
            blogs += `<p class="category-blog">-- ${category} --</p>
                            <div class="more-div">
                            <h3 class="blog-header">${blog_title}</h3>
                            <img class="blog-image-more" src="${blog_image}" class="more-img">
                            <div class="blog-body-div">
                                <p>${my_blogs}</p>
                            </div>
                            <hr>
                            <a href="https://facebook.com/sharer.php?u=totsandtravels.com/blogs.html?value=${id}">
                            <img src="../Images/shareBtn.png" class="share"><span class="share-text">Share</span></a>
                            <button type="button" class="comment" data-toggle="modal" data-target="#comment-modal">Add comment</button>
                            <p class="date-created">${dateFormat(blog_date)}</p>                       
                        </div>
                        
                        <!-- Modal -->
    <div class="modal fade" id="comment-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add comment</h5>
                    <hr>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="new-comment" action="/add/comments" method="POST">
                        <div class="form-group">
                            <label for="Name">Name</label>
                            <input type="text" class="form-control" id="name"
                                placeholder="Enter name" name="name">
                        </div>
                        <div class="form-group">
                            <input class="blog-id" type="text"  id="val" name="val" value="${id}">
                        </div>
                        <div class="form-group">
                            <label for="comment-body">Add comment</label>
                            <textarea maxlength="500" type="text" class="form-control" id="comment" 
                                placeholder="Add comment here (500 Character max)" name="comment"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

                        `;
            document.getElementById("my-blog").innerHTML = blogs;
        });
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
                    <p class="comment-body">"${new_comment}"</p>
                    <span class="comment-date">(${formatCommentsDate(date_created)})</span>
                </div>
                <hr>
                `
                document.getElementById("new-comments").innerHTML = comments;
            });

        });
};

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


