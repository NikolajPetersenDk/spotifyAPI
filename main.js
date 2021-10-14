// The main function 
// main() is an async function in order to receive an access token from Spotify
// before doing anything else
async function main() {
    
    // gets access token
    await postTokenRequest()
    .then(data => {
        token = data;
    });

    
    // Elements
    const artistSearch = document.getElementById('artistSearch');
    const dropdownResults = document.getElementById('dropdownResults');
    const infoBackground = document.getElementById('infoBackground');
    const infoBox = document.getElementById('infoBox');
    const closeBtn = document.getElementById('close');
    let artName = document.getElementById('artistName');
    let artImg = document.getElementById('artistImg');
    const topSongs = document.getElementById('topSongs');
    const footer = document.getElementById('footer');
    let artistArray = [];
    const spotify = new Spotify;
    
    

    // Eventlisteners
    // When pressing the red X button in the infobox
    closeBtn.addEventListener('click', () => {
        infoBox.style.display = 'none'
        infoBackground.style.display = 'none'
        topSongs.innerHTML = '';
        if (window.innerWidth < 450) {
            footer.style.display = 'block';
        }
    });
    
    // If viewed on a mobile device, hide the footer
    artistSearch.addEventListener('click', () => {
        if (window.innerWidth < 450) {
            footer.style.display = 'none';
        }
    });

    // Type to search for an artist
    artistSearch.addEventListener('keyup', () => {

        // Reset the dropdown list
        dropdownResults.innerHTML = '';

        // If the inputfield is not empty
        if (artistSearch.value !== '') { 
            
            // Change the border of the input field, to match the dropdoen list
            artistSearch.style.borderTopLeftRadius = '18px';
            artistSearch.style.borderBottomLeftRadius = '0px';
            
            // Use the inputted text, to receive a list of search results from the Spotify API
            spotify.searchArtist(artistSearch.value)
            .then(data1 => {
                artistArray = data1.artistData.artists.items;
            });
            
            // For each artist in artistArray, create an <a> tag 
            artistArray.forEach(artist => {
                // Create new element in the dropdown
                const node = document.createElement('a');
                const textnode = document.createTextNode(artist.name);
                node.appendChild(textnode);
                dropdownResults.appendChild(node);

                // Show infobox
                // an Event listener is added to each artist <a> tag
                node.addEventListener('click', () => {
                    artName.innerText = artist.name;
                    artImg.src = artist.images[0].url;

                    // Get the selected artist's top track, using the artist id
                    spotify.getTopTracks(artist.id)
                        .then(data => {
                            data.topTracks.tracks.forEach(track => {
                                // Insert each individual top track in topSongs ol, as a list item
                                const listItem = document.createElement('li');
                                const songName = document.createTextNode(track.name);
                                listItem.appendChild(songName);
                                topSongs.appendChild(listItem);
                            });
                        });

                    infoBox.style.display = 'block';
                    infoBackground.style.display = 'block';
                    artistSearch.value = '';
                    dropdownResults.classList.add('hidden');
                    dropdownResults.innerHTML = '';
                    artistSearch.style.borderTopLeftRadius = '50px';
                    artistSearch.style.borderBottomLeftRadius = '50px';
                })
            });
            
            dropdownResults.classList.remove('hidden');   
             
        // End of 'if (artistSearch.value !== '')'    
        }

    // End of artistSearch.addEventListener
    });

// End of main()
};

main();