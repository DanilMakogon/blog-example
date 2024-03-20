class Post {
    id
    title
    body
    userId

    constructor(postData = {id: 0, title: '', body: '', userId: 0}) {
        this.#bootstrapSelf(postData)
    }

    #bootstrapSelf(postData) {
        this.id = postData.id
        this.title = postData.title
        this.body = postData.body
        this.userId = postData.userId
    }
}