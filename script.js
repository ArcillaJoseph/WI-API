async function fetchWordDefinition(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Word not found');
        }
        
        const data = await response.json();
        displayDefinition(data);
    } catch (error) {
        console.error(error);
        alert('Error: ' + error.message);
    }
}

function displayDefinition(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    const word = data[0].word;
    const meanings = data[0].meanings;

    meanings.forEach((meaning) => {
        const partOfSpeech = meaning.partOfSpeech;

        meaning.definitions.forEach((definition, index) => {
            const definitionDiv = document.createElement('div');
            definitionDiv.classList.add('definition');
            definitionDiv.innerText = `${index + 1}. (${partOfSpeech}) ${definition.definition}`;

            // Example sentence placeholder
            const exampleSentence = document.createElement('div');
            exampleSentence.classList.add('example');
            exampleSentence.innerText = `Example: "${definition.example || 'No example available'}"`;
            definitionDiv.appendChild(exampleSentence);

            resultsDiv.appendChild(definitionDiv);
        });
    });
}

document.getElementById('searchButton').addEventListener('click', () => {
    const wordInput = document.getElementById('wordInput').value.trim();
    if (wordInput) {
        fetchWordDefinition(wordInput);
    } else {
        alert('Please enter a word');
    }
});
