//#region  Dom Objects
const addMovieModal = document.getElementById("add-modal");
const StartaddMovieBtn = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelMovieBtn = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieBtn = cancelMovieBtn.nextElementSibling;
const userInput = addMovieModal.querySelectorAll("input");
const entryTextBox = document.getElementById("entry-text");
const deleteBox = document.getElementById("delete-modal");
//#endregion

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextBox.style.display = "block";
  } else {
    entryTextBox.style.display = "none";
  }
};

const toggleBackground = () => {
  backdrop.classList.toggle("visible");
};

const closeMovieDeletion = () => {
  toggleBackground();
  deleteBox.classList.remove("visible");
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  closeMovieDeletion();
};

//#region  delete Movie confirm or not
const deleteEventHandler = (movieId) => {
  deleteBox.classList.add("visible");
  toggleBackground();

  const cancleMovieDeletion = deleteBox.querySelector(".btn--passive");
  let confirmMovieDeletion = deleteBox.querySelector(".btn--danger");

  confirmMovieDeletion.replaceWith(confirmMovieDeletion.cloneNode(true));

  confirmMovieDeletion = deleteBox.querySelector(".btn--danger");

  cancelMovieBtn.removeEventListener("click", closeMovieDeletion);

  cancleMovieDeletion.addEventListener("click", closeMovieDeletion);
  confirmMovieDeletion.addEventListener(
    "click",
    deleteMovie.bind(null, movieId)
  );
};
//#endregion

//#region  render the movie show modal
const renderMovieElements = (id, imageUrl, title, rating) => {
  const movieElement = document.createElement("li");
  movieElement.className = "movie-element";
  movieElement.innerHTML = `
        <div class="movie-element__image">
            <img src=${imageUrl} alt=${title} />
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating} / 5 stars</p>
        </div>
    `;
  movieElement.addEventListener("click", deleteEventHandler.bind(null, id));
  const listRoot = document.getElementById("movie-list");
  listRoot.append(movieElement);
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};
//#endregion

const toggleMovieFunc = () => {
  addMovieModal.classList.add("visible");
  toggleBackground();
};

// clear Movie input ....
const clearMoviesInputs = () => {
  for (const user of userInput) {
    user.value = "";
  }
};

//#region check userInput ...
const userInputValid = () => {
  const titleValue = userInput[0].value;
  const imageUrl = userInput[1].value;
  const ratingValue = userInput[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrl.trim() === "" ||
    ratingValue.trim() === "" ||
    parseInt(ratingValue) < 1 ||
    parseInt(ratingValue) > 5
  ) {
    alert(`You should type a valid inputs. (rating between 1 and 5)`);
    return;
  }

  const newMovieObj = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrl,
    rating: ratingValue,
  };
  movies.push(newMovieObj);
  // console.log(movies);
  closeMovieModal();
  toggleBackground();
  clearMoviesInputs();
  renderMovieElements(
    newMovieObj.id,
    newMovieObj.image,
    newMovieObj.title,
    newMovieObj.rating
  );
  updateUI();
};
//#endregion

const CancelMovieHandler = () => {
  closeMovieModal();
  toggleBackdropHandler();
  clearMoviesInputs();
};

const toggleBackdropHandler = () => {
  closeMovieModal();
  closeMovieDeletion();
  clearMoviesInputs();
};

//#region  Event Listener ...
StartaddMovieBtn.addEventListener("click", toggleMovieFunc);
backdrop.addEventListener("click", toggleBackdropHandler);
cancelMovieBtn.addEventListener("click", CancelMovieHandler);
confirmAddMovieBtn.addEventListener("click", userInputValid);
//#endregion
