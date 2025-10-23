const APIkey = 'AIzaSyBA_sOlDPdyGxl8k0rSemjPn3-vfb5G6Ts';

document.getElementById('btn-search').addEventListener('click', searchBooks);

async function searchBooks(){
    const query = document.getElementById('library-search').value;
    const container = document.getElementById('main-library-booklist');
    // container.textContent = 'Searching...';

    const APIURL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10&key=${APIkey}`;

    try{
        const res = await fetch(APIURL);
        const data = await res.json();
        container.textContent = 'Searching...';

        if(!data.items || data.items.length === 0){
            container.innerHTML = '<p>Not found</p>'
            return;
        }

        container.innerHTML = '';

        data.items.forEach(item => {
            const info = item.volumeInfo;

            const title = info.title || 'No title';
            const authors = info.authors ? info.authors.join(', ') : 'Unknown author';
            const year = info.publishedDate ? info.publishedDate.slice(0, 4) : 'No info';
            const thumbnail = info.imageLinks?.thumbnail || '';

            const bookItem = document.createElement('div');
            bookItem.classList.add('main-library-booklist');

            bookItem.innerHTML = `
                <div class="library-left-img">
                    ${thumbnail ? `<img src="${thumbnail}" alt="Book title">` : '<div style="width:100px;height:150px;background:#eee;">No image</div>'}
                </div>
                <div class="library-right-bookinfo">
                    <p><strong>Title:</strong> ${title}</p>
                    <p><strong>Author:</strong> ${authors}</p>
                    <p><strong>Year:</strong> ${year}</p>
                </div>
            `;

            container.appendChild(bookItem);
        });
    } catch(err) {
        container.innerHTML = 'Data upload error';
        console.error(err);
    }
}