let token;

// credentials is a variables that contains 'userId:userSecret' converted to a Base64-encoded string
const credentials = btoa('d9df4a06570a4fe6807797f77b232c88:69100cba8190429fa47a6f6d0587c752');



// This function fetches an access token from the Spotify API
async function postTokenRequest() {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // One string containing userid and user secret
            'Authorization': `Basic ${credentials}` 
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token
}



class Spotify {
    constructor() {
        this.config = {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        }
    }

    // Creating an async function
    async searchArtist(search) {
        const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=artist&limit=5`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const artistData = await artistResponse.json();
        return {
            artistData
        }
    }

    // Get toptracks from artist
    async getTopTracks(id) {
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=DK`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const topTracks = await response.json();

        return {
            topTracks
        }
    }
}