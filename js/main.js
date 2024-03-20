document.addEventListener('DOMContentLoaded', async () => {
    if (window.hasOwnProperty('render') === false) {
        window.render = new Render()
    }

    if (window.hasOwnProperty('apiService') === false) {
        window.apiService = new ApiService()
    }

    // Await posts
    window.render.showLoader('posts')

    // First render
    const posts = await window.apiService.getPosts()

    // Pagination logic
    if (window.hasOwnProperty('pagination') === false) {
        window.pagination = new Pagination('pagination', 5, (posts) => {
            window.render.renderPosts(posts, 'posts')
        })
    }

    window.pagination.loadPosts(posts)
    window.pagination.render()
    window.pagination.renderPagePosts()
})