class ApiService {
    static HOST = "https://jsonplaceholder.typicode.com"

    constructor() {
        window.body.addEventListener('loadPost', async ({detail}) => {
            window.post = await this.getPost(detail.id)
            window.body.dispatchEvent(new CustomEvent('renderPost'))
        })
    }

    async getPosts() {
        window.body.dispatchEvent(new CustomEvent('renderLoader'))
        return new Promise((resolve, reject) => {
            fetch(ApiService.HOST + '/posts')
                .then(async (response) => {
                    const posts = [], postsResponse = await response.json()
                    if (Array.isArray(postsResponse)) {
                        postsResponse.forEach((postData) => {
                            posts.push(new Post(postData))
                        })
                    }
                    resolve(posts)
                })
                .then(json => reject(json))
        })
    }

    async getPost(id) {
        window.body.dispatchEvent(new CustomEvent('renderLoader'))
        return new Promise((resolve, reject) => {
            fetch(ApiService.HOST + '/posts/' + id)
                .then(async (response) => {
                    const postsResponse = await response.json()
                    resolve(new Post(postsResponse))
                })
                .then(json => reject(json))
        })
    }
}