console.log('client-side js loaded')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From js'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    const location = searchElement.value
    
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = ''
            messageTwo.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast            
        }
    })
})

})