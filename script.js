document.getElementById("search-btn").addEventListener("click", async () => {
    const word = document.getElementById("word-input").value.trim();
    const resultContainer = document.getElementById("result");
  
    if (word === "") {
      resultContainer.innerHTML = "<p>Please enter a word to search.</p>";
      resultContainer.style.transform = "scale(1)";
      return;
    }
  
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) throw new Error("Word not found");
  
      const data = await response.json();
      const definition = data[0].meanings[0].definitions[0].definition;
  
      resultContainer.innerHTML = `
        <h2>${word}</h2>
        <p>${definition}</p>
      `;
      resultContainer.style.opacity = "1";
      resultContainer.style.transform = "scale(1)";
    } catch (error) {
      resultContainer.innerHTML = `<p>${error.message}</p>`;
      resultContainer.style.opacity = "1";
      resultContainer.style.transform = "scale(1)";
    }
  });
  