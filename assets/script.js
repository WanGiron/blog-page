var myId = [];
// TODO: get all posts from  database //
var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}

var client = new HttpClient();

client.get('/gettheposts', function (response) {
    var results = JSON.parse(response);
    var posts = results.length;
    document.getElementById('total').innerHTML = 'Total Posts: ' + posts;
    console.log(results);
    // loop thru array of blogs from data base //
    results.map(res => {
        //creating tags so we can add our values from db //
        var div1 = document.createElement('div');
        //class added for styling//
        div1.setAttribute("class", "post-content");
        // setting value as sql ID//
        div1.setAttribute("value", res.id);
        var h2 = document.createElement('h2');
        var nodeH = document.createTextNode(res.blog_title);
        var span = document.createElement('span');
        span.innerHTML = '<button id='+ res.id+ ' class="edit-btn" onclick="textArea(this.id)" value=' +res.id+ ' >(Edit)</button>'
        var ptag2 = document.createElement('P');
        ptag2.setAttribute("class", "date-created");
        var hr = document.createElement('hr');
        var br = document.createElement('br');
        var node2 = document.createTextNode(res.date_created);
        var nodeBlog = document.createTextNode(res.my_blogs);
        // div1.innerHTML = res.my_blogs;
        div1.appendChild(nodeH);
        div1.appendChild(br);
        div1.appendChild(nodeBlog);
        // ptag.appendChild(span);
        ptag2.appendChild(node2);
        var div2 = document.createElement('div');
        var div = document.getElementById('get-posts');
        div2.appendChild(div1);
        div2.appendChild(span);
        div2.appendChild(ptag2);
        div2.appendChild(hr);
        div.prepend(div2);    
    })
   
});


function textArea(id){
    // var text = document.getElementById(id).parentElement.previousElementSibling.innerHTML;
    var text = document.getElementById(id).parentElement.previousElementSibling.innerHTML;
    // var text = document.getElementById(id).value;
    var editBlog = document.getElementById('editor1');
    console.log('test'+ text);
    editBlog.innerHTML = text;
    // CKEDITOR.instances.editor1.setData(text);
    document.getElementById('update-btn').style.display = 'inline-block';
    document.getElementById('submit-btn').style.display = 'none';
    console.log(text);  
    myId.push(id); 
}




//TODO: Post function//
function sendPost() {
    var recentPost = document.getElementById('editor1').value;
    var date = document.getElementById('blog-date').value;
    var title = document.getElementById('blog-title').value;
    var image = document.getElementById('blog-image').value;
    // var recentPost = CKEDITOR.instances.editor1.document.getBody().getText();
    // var recentPost = CKEDITOR.instances.editor1.getData();
    console.log('test' + recentPost);
    //check for validation//
    if (recentPost === '') {
        alert('Please write something')
    }
    //post request if validation is right//
    else {
        var blogPost = {
            my_blogs: recentPost,
            blog_date: date,
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
        alert('Post added!')
        window.location.reload();
    }
   
}
//TODO: Post function//

function updatePost() {
    // var updatedPost = CKEDITOR.instances.editor1.getData();
    var updatedPost = document.getElementById('editor1').value;
    console.log(updatedPost);
    if (updatedPost === '') {
        alert('Please write something')
    }
    //post request if validation is right//
    else {
        var blogPost = {
            data: updatedPost
        };

        fetch('/updatedpost/'+myId[0], {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogPost)
        }).then(function (response) {
            return response.json();
        })
        alert('Post Updated!')
        window.location.reload();
    }
   
}