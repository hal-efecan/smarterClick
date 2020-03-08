function addCssToStyleTag() {
    // Create style elementTag
    const styleTag = document.createElement('style')
    // + set attr 
    styleTag.setAttribute('id', 'smc-hover-css')
    // + css Styling
    styleTag.textContent = "smc-path-box {" +
    "position: fixed;" +
    "bottom: 20px;" +
    "left: 10px;" +
    "right: 10px;" +
    "padding: 3px;" +
    "font-size: 16px;" +
    "background-color: rgba(87, 12, 12, 0.8);" +
    "color: white;" +
    "z-index: 999999999;" +
    "text-align: center;" +
    "}" +
    // + on Hover styling
    "[data-smc-hover='true']{" +
    "border: 1px solid red;" +
    "};"
    // & append to Head elementTag
    document.head.appendChild(styleTag)
}

function addPathBoxToBody() {
    // Add pathBoxElement to document body
    const pathBoxElement = document.createElement('smc-path-box')
    pathBoxElement.textContent = `Selector Path:`
    document.body.appendChild(pathBoxElement)
}

function addBorderOnHover() {
    // select all elements in the DOM object and return HTML collection
    const elements = document.body.querySelectorAll('*')
    // convert HTML collection into an array
    const myArray = Array.from(elements)
    // Loop over each element and add/remove mouseEvent listener to set/remove attribute on hover
    myArray.forEach(item => {
        item.addEventListener('mouseover', (e) => {
            e.target.setAttribute('data-smc-hover', 'true')
        })
        item.addEventListener('mouseout', (e) => {
            e.target.removeAttribute('data-smc-hover')
        })
    })
}

function addSelectorPath(path) {
    const clickedElement = document.getElementsByTagName('smc-path-box')
    clickedElement[0].textContent = `Selector Path: ${path}`
}

function getSelectorPath() {
    // select all dom elements in the document object and return HTML collection
    const elements = document.body.querySelectorAll('*')
    // convert HTML collection into an array
    const elementsArray = Array.from(elements)

    // on click show css selector path
        elementsArray.forEach(element => {
            element.addEventListener('click', (ev) => {

                ev.stopPropagation()
                // assign variables to tags/class/ids
                const parentTag = ev.target.parentElement.nodeName.toLowerCase()
                const elementTag = ev.target.tagName.toString().toLowerCase()
                const elementId = ev.target.id
                const elementClassName = ev.target.className

                // checking all possible combinations for selectors
                if(parentTag && elementTag && elementId && elementClassName) {
                    addSelectorPath(`${parentTag}
                    >${elementTag}
                    #${elementId}
                    .${elementClassName}`)
                }
                if(parentTag && elementTag && !elementId && elementClassName) {
                    addSelectorPath(`${parentTag}
                    >${elementTag}
                    .${elementClassName}`)
                }
                if(parentTag && elementTag && elementId && !elementClassName) {
                    addSelectorPath(`${parentTag}
                    >${elementTag}
                    #${elementId}`)
                }
                if(parentTag && elementTag && !elementId && !elementClassName) {
                    addSelectorPath(`${parentTag}
                    >${elementTag}`)
                }
            })  
        })
}

// on window load execute functions
window.onload = function initialiseCode() {
    addCssToStyleTag()
    addPathBoxToBody()
    addBorderOnHover()
    getSelectorPath()
}
