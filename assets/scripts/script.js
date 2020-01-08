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
                blogs += ` <div>
                        <h2>${blog_title}</h2>
                        <div class="post-content" value=${id}>
                        ${my_blogs}
                        </div>
                        <span><button id=${id} class="edit-btn" onclick="editPost(this.id)" value=${id}>(Edit)</button> 
                        <button class="edit-btn" onclick="deletePost(this.value)" value=${id}>(Delete)</button>
                        </span><p class="date-created">${blog_date}</p>
                        <hr>
                    </div>
                    `
                document.getElementById('get-posts').innerHTML = blogs;

            })
        });
}

posts();

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

//TODO: Post function//
function deletePost(value) {
    var erase = confirm("Are you sure you want to erase this post?");
    if (erase == true) {
        del(value);

    } else {
        alert('Post not deleted')
    };
};


