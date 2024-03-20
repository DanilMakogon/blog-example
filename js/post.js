class Post {
    id
    title
    body
    userId

    constructor(postData) {
        this.#bootstrapSelf(postData)
    }

    #bootstrapSelf(postData) {
        this.id = postData.id
        this.title = postData.title
        this.body = postData.body
        this.userId = postData.userId
    }
}