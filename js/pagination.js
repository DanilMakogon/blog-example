class Pagination {
    posts
    perPage
    currentPage = 1
    targetElement
    onPageChangeCallback

    constructor(targetElementId, perPage, onPageChangeCallback) {
        this.targetElement = document.getElementById(targetElementId)
        this.perPage = perPage
        this.onPageChangeCallback = onPageChangeCallback
    }

    loadPosts(posts) {
        this.posts = posts
    }

    render() {
        this.targetElement.innerHTML = ''
        const pagesCount = Math.ceil(this.posts.length / this.perPage)
        for (let i = 1; i <= pagesCount; i++) {
            const button = this.createButton(i)
            this.targetElement.appendChild(button)
        }
    }

    createButton(pageNumber) {
        const changePageButtonElement = document.createElement('button')
        changePageButtonElement.innerText = pageNumber
        changePageButtonElement.addEventListener('click', (e) => {
            this.#clearActiveClasses()
            const button = e.target
            button.classList.add('active')
            this.currentPage = pageNumber
            this.renderPagePosts(pageNumber);
        })

        return changePageButtonElement
    }

    renderPagePosts() {
        const posts = this.#getCurrentPagePosts()
        this.onPageChangeCallback(posts)
    }

    #getCurrentPagePosts() {
        const from =  this.perPage * this.currentPage - this.perPage
        const to = this.perPage * this.currentPage
        console.log(`from ${from} to ${to-1}`)
        return this.posts.slice(from,to)
    }

    #clearActiveClasses() {
        for(const button of this.targetElement.childNodes) {
            button.classList.remove('active')
        }
    }

}