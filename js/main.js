/* The callback is asynchronous to ensure that the code is executed strictly sequentially with the right expectations */

document.addEventListener('DOMContentLoaded', async () => {
    /* Step 1 | Set body element as global window property to access it everywhere */
    window.body = document.querySelector('body')

    /* Step 2 | Load posts and set to window property to access it everywhere */
    window.apiService = new ApiService()
    window.posts = await window.apiService.getPosts()

    /* Step 3 | Create post mock */
    window.post = new Post()

    /* Step 4 | Create content renderer and pagination */
    window.content = new Content('content')
    window.pagination = new Pagination('pagination')

    /* Step 5 | Dispatch custom event to render first page of loaded posts */
    const renderPostsEvent = new CustomEvent('renderPosts', {
        bubbles: true,
        detail: {from: 0, to: 5}
    });
    window.body.dispatchEvent(renderPostsEvent);
})