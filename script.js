const audioElement = document.getElementById('audio')
const button = document.getElementById('button')

const toggleButtonState = () => {
    button.disabled = !button.disabled
}

const tellMe = (joke) => {
    joke = joke.trim().replace(/ /g, '%20')

    VoiceRSS.speech({
        key: '4cf35202c29a4a24928e011bf96b4079',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
        target: audioElement
    })
}

const getJokesFromApi = async () => {
    try {
        const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming'
        const response = await fetch(apiUrl)
        const data = await response.json()
        const joke = data.type === 'twopart' ? `${data.setup} ... ${data.delivery}` : data.joke

        tellMe(joke)
        toggleButtonState()
    } catch (error) {
        tellMe('This is not a joke... something went wrong')
        toggleButtonState()

        console.error('Joke fetch error:', error)
    }
}

button.addEventListener('click', getJokesFromApi)
audioElement.addEventListener('ended', toggleButtonState)
