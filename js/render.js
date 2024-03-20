class Render {
    showLoader(targetElementId) {
        const loaderElement = document.createElement('div')
        loaderElement.classList.add('loader')
        loaderElement.innerText = 'Loading...'

        const targetElement = document.getElementById(targetElementId)
        targetElement.innerHTML = ''
        targetElement.append(loaderElement)
    }

    renderPosts(posts, targetElementId) {
        const targetElement = document.getElementById(targetElementId)
        targetElement.innerHTML = ''


        posts.forEach((post) => {
            const postElement = this.createPostElement(post)
            targetElement.append(postElement)
        })
    }

    createPostElement(post) {
        const postElement = document.createElement('div')
        postElement.classList.add('post')

        const postTitleElement = document.createElement('h2')
        postTitleElement.innerText = post.title

        const postBodyElement = document.createElement('p')
        postBodyElement.innerText = post.body

        postElement.appendChild(postTitleElement)
        postElement.appendChild(postBodyElement)

        return postElement
    }

}