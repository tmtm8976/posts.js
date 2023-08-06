let _title = "";
let _album = 0 ;


// Retrieve post data from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
const postTitle = decodeURIComponent(urlParams.get("title"));
const postUrl = decodeURIComponent(urlParams.get("url"));

// Populate the input fields with existing values
const titleInput = document.querySelector('input[name="title"]');
const albumInput = document.querySelector('input[name="album"]');
titleInput.placeholder = postTitle;
albumInput.placeholder = postId;


// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Update the post data with input field values
  _title = titleInput.value;
  _album = albumInput.value;

  // Construct the updated post object
  const updatedPost = {
    albumId: _album,
    id: postId,
    title: _title,
    url: postUrl,
    thumbnailUrl: ""
  };
  

  // Send the updated post data to the API
  let post = JSON.stringify(updatedPost)
   
  const url = "https://jsonplaceholder.typicode.com/photos/"+postId ;
  let xhr = new XMLHttpRequest()
   
  xhr.open('PUT', url)
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
  xhr.send(post);
   
  xhr.onload = function () {
      if(xhr.status === 200) {
          console.log("Post successfully edited!")

          // Navigate back to index and send the new data to update the UI
          let indexUrl = "./index.html?id=" + postId + "&title=" + encodeURIComponent(_title) + "&album=" + encodeURIComponent(_album);
          window.location.href = indexUrl;
      }
      else
      {
        console.log('error happened ')
      }
  }
});