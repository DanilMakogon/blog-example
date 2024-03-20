class Pagination {
    perPage
    currentPage = 1
    targetElement

    constructor(targetElementId, perPage = 5) {
        this.targetElement = document.getElementById(targetElementId)
        this.perPage = perPage
        this.#render()
    }

    #render() {
        this.targetElement.innerHTML = ''
        const pagesCount = Math.ceil(window.posts.length / this.perPage)
        for (let i = 1; i <= pagesCount; i++) {
            const button = this.#createButton(i)
            this.targetElement.appendChild(button)
        }
    }

    #createButton(pageNumber) {
        const changePageButtonElement = document.createElement('button')
        changePageButtonElement.innerText = pageNumber
        if (pageNumber === 1)
            changePageButtonElement.classList.add('active')
        changePageButtonElement.addEventListener('click', (e) => {
            this.#clearActiveClasses()
            e.target.classList.add('active')
            this.currentPage = pageNumber
            this.#dispatchRenderPostsEvent()
        })

        return changePageButtonElement
    }

    #dispatchRenderPostsEvent() {
        const renderPosts = new CustomEvent('renderPosts', {
            bubbles: true,
            detail: {from: this.#getPostIdFrom(), to: this.#getPostIdTo()},
        });
        window.body.dispatchEvent(renderPosts)
    }

    #clearActiveClasses() {
        for (const button of this.targetElement.childNodes) {
            button.classList.remove('active')
        }
    }

    #getPostIdFrom() {
        return this.perPage * this.currentPage - this.perPage
    }

    #getPostIdTo() {
        return this.perPage * this.currentPage
    }
}