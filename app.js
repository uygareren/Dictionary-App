const input = document.getElementById("input-word");
const searchBtn = document.querySelector(".search-button");
const word = document.getElementById("word");
const description = document.getElementById("description");
const volumeBtn = document.getElementById("volume-btn");

const audio = new Audio();

const fetchApi = async (word) => {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  const data = await response.json();
  return data;
};

searchBtn.addEventListener("click", async () => {
  const inputWord = input.value.toLowerCase();
  word.innerHTML = inputWord.charAt(0).toUpperCase() + inputWord.slice(1);

  try {
    const data = await fetchApi(inputWord);
    description.textContent = data[0].meanings[0].definitions[0].definition;
  } catch (error) {
    console.log(error);
  }
});

volumeBtn.addEventListener("click", async () => {
  const inputWord = input.value.toLowerCase();
  volumeBtn.appendChild(audio);


  try {
    const data = await fetchApi(inputWord);
    audio.src = data[0].phonetics[0].audio;
    audio.autoplay = true;
  } catch (error) {
    console.log(error);
  }
});
