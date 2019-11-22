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
        var blogBody = res.my_blogs;
        //creating tags so we can add our values from db //
        var ptag = document.createElement('div');
        //class added for styling//
        ptag.setAttribute("class", "post-content")
        // setting value as sql ID//
        ptag.setAttribute("value", res.id);
        var span = document.createElement('span');
        span.innerHTML = '<button id='+ res.id+ ' class="edit-btn" onclick="textArea(this.id)" value=' +res.id+ ' >(Edit)</button>'
        var ptag2 = document.createElement('P');
        ptag2.setAttribute("class", "date-created");
        var hr = document.createElement('hr');
        var node2 = document.createTextNode(res.date_created);
        ptag.innerHTML = blogBody;
        // ptag.appendChild(span);
        ptag2.appendChild(node2);
        var div2 = document.createElement('div');
        var div = document.getElementById('get-posts');
        div2.appendChild(ptag);
        div2.appendChild(span);
        div2.appendChild(ptag2);
        div2.appendChild(hr);
        div.prepend(div2);    
    })
   
});


function textArea(id){
    var text = document.getElementById(id).parentElement.previousElementSibling.innerHTML;
    console.log('test'+ text);
    CKEDITOR.instances.editor1.setData(text);
    document.getElementById('update-btn').style.display = 'inline-block';
    document.getElementById('submit-btn').style.display = 'none';
    console.log(text);  
    myId.push(id); 
}




//TODO: Post function//
function sendPost() {
    // var recentPost = document.getElementById('editor1').value;
    // var recentPost = CKEDITOR.instances.editor1.document.getBody().getText();
    var recentPost = CKEDITOR.instances.editor1.getData();
    console.log('test' + recentPost);
    //check for validation//
    if (recentPost === '') {
        alert('Please write something')
    }
    //post request if validation is right//
    else {
        var blogPost = {
            data: recentPost
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
    var updatedPost = CKEDITOR.instances.editor1.getData();
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