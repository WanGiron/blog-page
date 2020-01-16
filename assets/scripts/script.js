var myId = [];


//TODO: to get posts to admin site //
function posts() {
    fetch('/gettheposts')
        .then(function (res) {
            return res.json();
        })
        .then(function (results) {
            var posts = results.length;
            document.getElementById('total').innerHTML = 'Total Posts: ' + posts;
            let blogs = '';
            results.forEach((res) => {
                let { id, my_blogs, blog_image, blog_date, blog_title } = res;
                blogs += ` <div class="nav-blogs">
                        <h5 class="blog-title">${blog_title}</h5>
                        <div class="post-content" value=${id}>
                        ${my_blogs}
                        </div>
                        <span><button id=${id} class="edit-btn" onclick="editPost(this.id)" value=${id}>(Edit)</button> 
                        <button class="edit-btn" onclick="deletePost(this.value)" value=${id}>(Delete)</button>
                        <button class="edit-btn" data-toggle="modal"
                        data-target="#comments-modal" id=${id} onClick="getComments(this.id)">(Comments)</button>
                        </span>
                        <p class="date-created">${blog_date}</p>
                    </div>
                    `
                document.getElementById('get-posts').innerHTML = blogs;

            })
        });
}

//get subscribers list //
function subscribers() {
    fetch("/get/subs/email/list")
        .then(function (res) {
            return res.json();
        })
        .then(function (results) {
            let subs = results.length;
            let emailList = '';
            document.getElementById('total-subs').innerHTML = 'Subscribed: ' + subs;
            results.forEach((res) => {
                let { id, email} = res;
                emailList += `<div value=${id}>
                           <p>${email}</P>
                          </div>
                        `
                document.getElementById('subscribers-div').innerHTML = emailList;

            })
        });
}

//TODO get comment for blogs //
function getComments(id) {
    fetch('/get/comments/blogs/'+id)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            let comments = '';
            data.forEach((results) => {
                let { id, blog_id, user_name, new_comment, date_created } = results;
                comments += `
                <div class="comments-blog">
                    <h4 class="comment-user">${user_name}</h4>
                    <p class="comment-body">"${new_comment}"</p>
                    <span class="comment-date">(date_created)</span>
                    <span class="comment-date" id="${id}" onClick="delCom(this.id)">(Delete)</span>
                </div>
                <hr>
                `
                document.getElementById("comments-div").innerHTML = comments;
            });

        });
};



posts();
subscribers();

function editPost(id) {
    var text = document.getElementById(id).parentElement.previousElementSibling.innerHTML;
    CKEDITOR.instances.editor1.setData(text);
    // var editBlog = document.getElementById('editor1');
    console.log('test' + text);
    // editBlog.innerHTML = text;
    document.getElementById('update-btn').style.display = 'inline-block';
    document.getElementById('submit-btn').style.display = 'none';
    console.log(text);
    myId.push(id);
}


//TODO: Post function//
function sendPost() {
    // var recentPost = document.getElementById('editor1').value;
    var recentPost = CKEDITOR.instances.editor1.getData();
    var date = document.getElementById('blog-date').value;
    var title = document.getElementById('blog-title').value;
    var image = document.getElementById('blog-image').value;
    var cat = document.getElementById('category').value;
    console.log('test' + recentPost);
    //check for validation//
    if (recentPost === "" || date === "" || title === "" || image === "" || cat === "") {
        alert('Please fill all entries')
    }

    //post request if validation is right//
    else {
        var blogPost = {
            my_blogs: recentPost,
            blog_date: date,
            category: cat,
            blog_title: title,
            blog_image: image
        };

        console.log(blogPost);

        fetch('/postblog', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogPost)
        }).then(function (response) {
            return response.json();
        })
        alert('Post added!');
        posts();
    }

}

//TODO: Post function//
function updatePost() {
    // var updatedPost = document.getElementById('editor1').value;
    var updatedPost = CKEDITOR.instances.editor1.getData();
    var updatedImage = document.getElementById('blog-image').value;
    var updatedTilte = document.getElementById('blog-title').value;
    var updatedDate = document.getElementById('blog-date').value;
    var updatedCat = document.getElementById('category').value;

    // check for validations //
    if (updatedPost === "" || updatedDate === "" || updatedImage === "" || updatedTilte === "") {
        alert('Please fill all entries');
    }
    //post request if validation is right//
    else {
        var blogPost = {
            my_blogs: updatedPost,
            blog_image: updatedImage,
            blog_title: updatedTilte,
            blog_date: updatedDate,
            category: updatedCat
        };

        fetch('/updatedpost/' + myId[0], {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogPost)
        }).then(function (response) {
            return response.json();
        })
        alert('Post Updated!')
        // window.location.reload();
        var div = document.getElementById('get-posts');
        div.innerHTML = '';
        document.getElementById('editor1').value = '';
        posts();
    }

}


//delete//
function del(value) {
    fetch('/deletepost/' + value, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        console.log("Deleted");
    })
    alert('Post Deleted!')
    // window.location.reload();
    var div = document.getElementById('get-posts');
    div.innerHTML = '';
    document.getElementById('editor1').value = '';
    posts();

}

//TODO: DELETE function comfirm//
function deletePost(value) {
    var erase = confirm("Are you sure you want to erase this post?");
    if (erase == true) {
        del(value);

    } else {
        alert('Post not deleted')
    };
};

//delete comments//
function delCom(id) {
    fetch('/deletepost/comments/' + id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        console.log("Deleted");
    })
    alert('Comment Deleted!')
    // window.location.reload();

}
