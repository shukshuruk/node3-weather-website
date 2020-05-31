const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.innerHTML = '<p>Loading...</p>'
    messageTwo.textContent = ''
    
    const location = searchElement.value
    
    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.innerHTML = '<p></p>'
            messageTwo.textContent = data.error
        } else {
            messageOne.innerHTML = '<p><img src=' + data.icon +'></p>'
            messageTwo.textContent = data.forecast            
        }
    })
})

})