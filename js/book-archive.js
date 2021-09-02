const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // Clear Data
    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs));
}

const displaySearchResult = docs => {
    const searchResult = document.getElementById('search-result');
    // Clear Text
    searchResult.innerHTML = '';
    // No result found message
    if(docs.length === 0){
        const div = document.createElement('div');
        div.innerHTML = `
        <h4>Your search did not match any documents.</h4>
        <p>Suggestions:</p>
        <ul>
        <li>Make sure that all words are spelled correctly.</li>
        <li>Try different keywords.</li>
        <li>Try more general keywords.</li>
        </ul>
        `;
        searchResult.appendChild(div);
    }
    // using forEach loop
    docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${book.cover_i}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text"> Author: ${book.author_name}</p>
              <p class="card-text">Publisher: ${book.publisher.slice(0, 10)}</p>
              <p class="card-text">First Publish: ${book.first_publish_year}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
}