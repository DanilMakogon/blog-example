class ApiService {
    static HOST = "https://jsonplaceholder.typicode.com"

    async getPosts() {
        return new Promise((resolve, reject)=> {
            fetch(ApiService.HOST + '/posts')
                .then(async (response) => {
                    const posts = []
                    const postsResponse = await response.json()
                    if(Array.isArray(postsResponse)) {
                        postsResponse.forEach((postData)=> {
                            posts.push(new Post(postData))
                        })
                    }
                    resolve(posts)
                })
                .then(json => reject(json))
        })
    }
}