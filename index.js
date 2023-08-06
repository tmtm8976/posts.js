// get posts
const loadMoreButton = document.getElementById("more");
let post_list = [] ;

const xhr = new XMLHttpRequest();
let url = "https://jsonplaceholder.typicode.com/photos"

xhr.open('GET',url);
xhr.onload = () => {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        post_list = data;
        checkForEdits()
        showPosts();
        moreBtn();
    } else {
        console.error(xhr.statusText);  
    }
};

  
  xhr.onerror = () => console.error(xhr.statusText);
  xhr.send();

const posts_wrapper = document.getElementById("wrapper");


// create posts UI elements
function createPost({id, albumId, title, url}) {

    let post = document.createElement('div');
    post.className = "post-card"

    post.innerHTML = "<h1>"+id+"</h1><span class=\"a-id\">Album "+albumId+"</span><p class=\"title\">"+title+"</p><img src=\""+url+"\" alt=\"\"><div><button onclick=\"editPost(this)\">E D I T</button><button onClick=\"deletePost(this)\">D E L E T E</button></div>";
    post.id = id
    return post ;      
}

// show posts
let index = 0 ;
function showPosts(){
    for (let i = index; i < index+20; i++) {
        let post = createPost(post_list[i]);
        posts_wrapper.appendChild(post);
        
    }
    index+=20;
}


// handlMoreBtn
function handlMoreBtn(e) {
    e.target.remove();
    showPosts();
    if(index<post_list.length)moreBtn();
}

// show more posts btn
function moreBtn() {
    let more_btn = document.createElement('button')
    more_btn.className = "more-btn";
    more_btn.id = "more"
    more_btn.addEventListener('click',handlMoreBtn);
    more_btn.innerText = "load more"
    posts_wrapper.appendChild(more_btn);
}



// delete posts
function deletePost(e) {

    confirm("Are you sure you want to delete this post");

    let post = e.parentNode.parentNode
    const postId = post.id;

    const deleteUrl = "https://jsonplaceholder.typicode.com/photos/"+postId;
    let xhr = new XMLHttpRequest();

    xhr.open('DELETE', deleteUrl);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send();

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log("Post with ID "+postId+" deleted successfully!");
            // Remove post from UI
            posts_wrapper.removeChild(post);
        } else {
            console.error("Error deleting post with ID "+postId+".");
        }
    };
}




// edit post
function editPost(e) {
    let post = e.parentNode.parentNode;
    let postId = post.id;
    let postTitle = post_list[postId-1].title;
    let postUrl = post.querySelector("img").src;

    // Create a URL with query parameters to pass the post data
    let editUrl = "./edit.html?id=" + postId + "&title=" + encodeURIComponent(postTitle) + "&url=" + encodeURIComponent(postUrl);
    
    // Redirect to the edit.html page
    window.location.href = editUrl;
}



// change ui after editing
function checkForEdits() {
    let urlParams = new URLSearchParams(window.location.search);
    let post_title = decodeURIComponent(urlParams.get("title"));
    let post_album = decodeURIComponent(urlParams.get("album"));
    let postId = urlParams.get("id");

    if(post_title!='null'&&post_album!='null'){
        post_list[postId-1].title = post_title;
        post_list[postId-1].albumId = post_album
    }
}




