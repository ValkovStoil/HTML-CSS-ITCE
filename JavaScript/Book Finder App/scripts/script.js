{
  const loader = document.getElementsByClassName("loader")[0];
  const searchButton = document.getElementById("search-btn");
  const books = document.getElementById("books");
  const searchedElement = document.getElementsByTagName("input")[0];
  const clearButton = document.getElementsByClassName("clear")[0];
  const nothingToShow = document.getElementsByClassName("flash-info")[0];

  function init() {
    searchedElement.value = "";
    nothingToShow.style.display = "block";
  }
  window.onload = init;

  searchedElement.addEventListener("focus", showClearButton);
  searchButton.addEventListener("click", findBooks);
  clearButton.addEventListener("click", clearVisibleBooks);

  function show() {
    if (searchedElement.value !== "") {
      clearButton.style.display = "block";
    } else {
      clearButton.style.display = "none";
    }
  }

  searchedElement.onkeyup = function () {
    var key = event.keyCode || event.charCode;

    if (key === 8 || key === 46) {
      if (searchedElement.value === "") {
        clearButton.style.display = "none";
      }
    } else if (key === 13) {
      findBooks();
    }
  };

  function showClearButton() {
    searchedElement.addEventListener("keypress", show);
  }

  function findBooks() {
    clearBooks();
    if (searchedElement.value !== "") {
      loader.style.display = "block";
      setTimeout(showBooks, 2000);
    }
  }

  async function getBooks(bookElement) {
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${bookElement}`
    );
    let booksCollection = await result.json();
    nothingToShow.style.display = "none";

    if (booksCollection.totalItems !== 0) {
      booksCollection.items.forEach((book) => {
        books.append(createBookForm(book));
      });
    } else {
      let message = "That book dosn't exist.";
      const errorDiv = document.createElement("div");
      const errorH1 = document.createElement("h1");

      errorH1.innerHTML = message;
      errorDiv.append(errorH1);

      books.append(errorDiv);

      // setTimeout(() => {
      //   books.removeChild(books.lastChild);
      //   nothingToShow.style.display = "block";
      // }, 2000);
    }
  }

  function showBooks() {
    document.getElementsByClassName("loader")[0].style.display = "none";
    getBooks(searchedElement.value);
  }

  function clearBooks() {
    while (books.length !== 0) {
      if (books.lastChild.className !== "flash-info") {
        books.removeChild(books.lastChild);
      } else {
        nothingToShow.style.display = "block";
        break;
      }
    }
  }

  function clearVisibleBooks() {
    clearBooks();
    clearButton.style.display = "none";
    searchedElement.value = "";
  }

  function createBookForm(bookObject) {
    const book = document.createElement("div");

    const bookTitle = document.createElement("div");
    const h2 = document.createElement("h2");
    const bookTitleAnchor = document.createElement("a");

    const bookImageBlock = document.createElement("div");
    const bookImage = document.createElement("img");

    const bookDescription = document.createElement("div");
    const bookAuthor = document.createElement("div");
    const author = (document.createElement("span").innerHTML = "Author:");
    const bookPublisher = document.createElement("div");
    const publisher = (document.createElement("span").innerHTML = "Publisher:");
    const bookPublished = document.createElement("div");
    const published = (document.createElement("span").innerHTML = "Published:");
    const lastDiv = document.createElement("div");

    let imgData = !bookObject.volumeInfo.imageLinks
      ? "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/2000px-Placeholder_book.svg.png"
      : bookObject.volumeInfo.imageLinks.smallThumbnail;

    let authrosData = !bookObject.volumeInfo.authors
      ? ["Not Labeled"]
      : bookObject.volumeInfo.authors;

    let moreInfoData = !bookObject.volumeInfo.infoLink
      ? ""
      : bookObject.volumeInfo.infoLink;

    let titleData = !bookObject.volumeInfo.title
      ? "Untitled"
      : bookObject.volumeInfo.title;

    let publisherData = !bookObject.volumeInfo.publisher
      ? ""
      : bookObject.volumeInfo.publisher;

    let publishedData = !bookObject.volumeInfo.publishedDate
      ? "n/a"
      : bookObject.volumeInfo.publishedDate;

    let subtitlesData = !bookObject.volumeInfo.subtitle
      ? ""
      : bookObject.volumeInfo.subtitle;

    book.setAttribute("class", "book");
    bookTitle.setAttribute("class", "book__title");
    bookTitleAnchor.setAttribute("href", `${moreInfoData}`);
    bookTitleAnchor.setAttribute("target", "_blank");
    bookImageBlock.setAttribute("class", "book__img-block");
    bookImage.setAttribute("src", `${imgData}`);
    bookImage.setAttribute("alt", `${titleData}`);
    bookDescription.setAttribute("class", "book__desc");
    bookAuthor.setAttribute("class", "book__field");
    bookAuthor.setAttribute("title", "author");
    bookPublisher.setAttribute("class", "book__field");
    bookPublished.setAttribute("class", "book__field");
    lastDiv.setAttribute("class", "book__field");

    bookTitle.append(h2);
    h2.append(bookTitleAnchor);
    bookImageBlock.append(bookImage);
    bookDescription.append(bookAuthor);
    bookDescription.append(bookPublisher);
    bookDescription.append(bookPublished);
    bookDescription.append(lastDiv);

    bookAuthor.innerHTML = `${author} ${authrosData.join(" ")}`;
    bookPublisher.innerHTML = `${publisher} ${publisherData}`;
    bookPublished.innerHTML = `${published} ${publishedData}`;
    bookTitleAnchor.innerHTML = titleData;
    lastDiv.innerHTML = subtitlesData;

    book.append(bookTitle);
    book.append(bookImageBlock);
    book.append(bookDescription);

    return book;
  }
}
