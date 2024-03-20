class Content {
    targetElement
    mode = 'allPosts'

    constructor(targetElementId) {
        this.targetElement = document.getElementById(targetElementId)
        this.#loader()
        window.body.addEventListener('renderLoader', () => this.#loader())
        window.body.addEventListener('renderPost', () => this.#renderPost())
        window.body.addEventListener('renderPosts', ({detail}) => {
            this.#renderPosts(detail.from, detail.to)
        })
    }

    #loader() {
        this.targetElement.innerHTML = ''
        const loaderElement = document.createElement('div')
        loaderElement.classList.add('loader')
        loaderElement.innerText = 'Loading...'
        this.targetElement.append(loaderElement)
    }

    #renderPosts(from, to) {
        this.mode = 'allPosts'
        document.title = 'Blog'
        this.targetElement.innerHTML = ''
        window.posts.slice(from, to).forEach((post) => {
            this.targetElement.append(this.#createPostElement(post))
        })

    }

    #renderPost() {
        this.mode = 'singlePost'
        this.targetElement.innerHTML = ''
        this.targetElement.append(this.#createPostElement(window.post))
        document.title = window.post.title
    }

    #createPostElement(post) {
        const postElement = document.createElement('div')
        postElement.classList.add('post')
        postElement.addEventListener('click', () => {
            this.#dispatchLoadPostEvent(post.id)
        })

        const postTitleElement = document.createElement('h2')
        postTitleElement.innerText = post.title

        const postBodyElement = document.createElement('p')
        if (this.mode === 'allPosts') {
            postBodyElement.innerHTML = this.#trimText(post.body, 10, '... <br><br>[Click To Read More]')
        } else {
            postBodyElement.innerText = post.body
        }

        postElement.appendChild(postTitleElement)
        postElement.appendChild(postBodyElement)

        if (this.mode === 'singlePost') {
            postElement.appendChild(this.#createPostFooter(post))
        }

        return postElement
    }

    #createPostFooter(post) {
        const footerElement = document.createElement('div')
        footerElement.classList.add('post-footer')
        footerElement.innerHTML = `<p>UserID: ${post.userId}</p><p>PostID: ${post.id}</p>`

        return footerElement
    }

    #dispatchLoadPostEvent(id) {
        const loadPostEvent = new CustomEvent('loadPost', {
            bubbles: true,
            detail: {id: id},
        });
        window.body.dispatchEvent(loadPostEvent)
    }

    #trimText(text, maxLength, appendText) {
        const words = text.split(" ");
        const trimmedWords = words.slice(0, maxLength);
        let trimmedText = trimmedWords.join(" ");
        trimmedText += appendText;

        return trimmedText;
    }
}