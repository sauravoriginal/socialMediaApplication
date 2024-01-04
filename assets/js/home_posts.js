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
                console.log(data);

            },
            error:(error)=>{
              console.log(error.responseText);
            },

        })
    });
  }
  // method to create a form in DOM
  

  createPost();
}