const postFetch = document.getElementById('post-fetch');
postFetch.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event.target)
  // debugger;
  createComment(event.target);
})

function createComment(comment) {
  const body = comment['body'].value
  fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      body: body,
      likes: 0
    })
  })
  .then(res => res.json())
  .then(displaySingleComment)
}

function main() {
  getFetch();

}

function getFetch() {
  fetch('http://localhost:3000/comments')
  .then(res => res.json())
  .then(displayAllComments)
}

function displayAllComments(comments) {
  for (comment of comments) {
    displaySingleComment(comment)
  }
}

function displaySingleComment(comment) {
  const ul = document.getElementById('comment-list');
  const li = document.createElement('li');
  const body = document.createElement('p')
  body.textContent = comment.body

  const numLikes = document.createElement('p')
  numLikes.textContent = comment.likes

  const like = document.createElement('button');
  like.textContent = 'Like!'
  like.addEventListener('click', () => {
    patchLike(comment)
    numLikes.textContent = parseInt(numLikes.textContent) + 1
  })

  const del = document.createElement('button');
  del.textContent = "Delete"
  del.addEventListener('click', (event) => {
    deleteComment(comment.id)
    event.target.parentNode.remove();
  })

  li.append(body, numLikes, like, del)
  ul.append(li)
}

function deleteComment(id) {
  fetch(`http://localhost:3000/comments/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(console.log)
}

function patchLike(comment) {
  console.log(comment)
  comment.likes += 1;
  fetch(`http://localhost:3000/comments/${comment.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      likes: comment.likes
    })
  })
}

main();