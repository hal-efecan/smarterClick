// Part 1 - Adding CSS and HTML to the page dynamically
function addCssToStyleTag() {
    // Create style elementTag
    const style = document.createElement('style')
    // + set attr 
    style.setAttribute('id', 'smc-hover-css')
    // + css Styling
    style.textContent = "smc-path-box {" +
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
        // Part 2 - Element Hover
        "[data-smc-hover='true']{" +
        "border: 1px solid red;" +
        "};"
    // & append to head
    document.head.appendChild(style)
}

// appends pathBoxElement to body
function addPathBoxToBody() {
    const pathBoxElement = document.createElement('smc-path-box')
    pathBoxElement.textContent = `Selector Path:`
    document.body.appendChild(pathBoxElement)
}

// Part 2 - Element Hover
function addBorderOnHover() {
    // select all elements in the DOM object and return the Node List array
    const elementList = document.body.querySelectorAll('*')
    // Loop over each element and add/remove mouseEvent listener to set/remove attribute on hover
    elementList.forEach(element => {
            element.addEventListener('mouseover', (e) => {
                e.target.setAttribute('data-smc-hover', 'true')
            })
            element.addEventListener('mouseout', (e) => {
                e.target.removeAttribute('data-smc-hover')
            })
    })
}

/*  
    Part 3 - Getting the elements path
    This section is made up of three composable functions
    1. addClickListener => listens for the click then passes the event to the next function
    2. getSelectorPath  => checks possible selector combination paths and passes to next function
    3. addSelectorpath  => adds the path to the pathBoxBody
*/

// takes in the selector path & displays it on the PathBox
function addSelectorPath(path) {
    const smcPathBox = document.getElementsByTagName('smc-path-box')[0] // returns an HTML collection with single result
    smcPathBox.textContent = `Selector Path: ${path}` // returns the selector path to display in the element
}

// takes in the event & finds the css selector path
function getSelectorPath(event) {
    // e = element & p = parent
    const pTag   = event.target.parentElement.nodeName.toLowerCase()
    const eTag   = event.target.tagName.toString().toLowerCase()
    const eId    = event.target.id
    const eClass = event.target.className
        // checking all selector combinations
        if(pTag && eTag && eId && eClass)   {addSelectorPath(`${pTag}>${eTag}#${eId}.${eClass}`)}
        if(pTag && eTag && !eId && eClass)  {addSelectorPath(`${pTag}>${eTag}.${eClass}`)}
        if(pTag && eTag && eId && !eClass)  {addSelectorPath(`${pTag}>${eTag}#${eId}`)}
        if(pTag && eTag && !eId && !eClass) {addSelectorPath(`${pTag}>${eTag}`) }
}

function addClickListener() {
    // select all elements in the body and return a Node List array
    const elementList = document.body.querySelectorAll('*')
    // loops thru elements in the node list & attaches a click listener
        elementList.forEach(element => {
            element.addEventListener('click', (ev) => {
                ev.stopPropagation() // prevent propagation to parent on hover
                getSelectorPath(ev) // passes the event to fn responsible for mapping selector path 
            })
        })
}

// on window load execute functions
window.onload = () => {
    addCssToStyleTag()
    addPathBoxToBody()
    addBorderOnHover()
    addClickListener()
}