{
    // method for submit the form data for new post using AJAX
  let createPost = function(){
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function(e){
        e.preventDefault();// no auto submit occurs
        // to manually submit 
        $.ajax({
            type:'post',
            url:'/posts/create',
            data:newPostForm.serialize(),  //converts the post data intoo json
            success:(data)=>{
                let newPost = newPostDom(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
   
                deletePost($(' .delete-post-button', newPost));
                
            },
            error:(error)=>{
              console.log(error.responseText);
            },

        })
    });
  }
  // method to create a form in DOM
  let newPostDom = (post)=>{
    return $(`<li id="post-${post._id}">
    <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>
        ${post.content}
        <br>
        <small>By  ${post.user.name}</small>
    </p>
    <div class="post-comments">
       
            <form action="/comments/create" method="post">
                <input type="text" name="content" required="true" placeholder="Type your comment...">
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
            </form>
        
        <div class="post-comment-list">
            <ul id="post-comments-${post._id}">
                
            </ul>
        </div>
    </div>
</li>
`)
  }
  // method to delete a post fro DOM
  let deletePost = (deleteLink)=>{
    $(deleteLink).click((e)=>{
        e.preventDefault();

        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:(data)=>{
                $(`#post-${data.data.post_id}`).remove(); 

            },
            error:(error)=>{
                console.log(error.responseText);
            }
        })
    })
  }

  //method to create comment in DOM todo later

  
  //method to delete comment in DOM todo later
 

  createPost();
}