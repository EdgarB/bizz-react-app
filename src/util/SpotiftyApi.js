const clientId = process.env.REACT_APP_SPOTIFY_API_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_API_REDIRECT_URI;

// STEP 0: CHECK IF AUTHORIZATION CODE AVAILABLE. IF IT IS SKIP TO STEP 3

// STEP 1 GET AUTHORIZATION CODE IF NOT AVAILABLE IN URL AFTER CLICKING LOGIN
async function requestAuthorizationCode(){
  function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  
  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
  
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
  
    return base64encode(digest);
  }

  

  let codeVerifier = generateRandomString(128);

  generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

    localStorage.setItem('code_verifier', codeVerifier);

    let args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });

    window.location = 'https://accounts.spotify.com/authorize?' + args;
  });
  
}

// STEP 2: GET AUTHORIZATION CODE FROM URL.
function getAuthCodeFromUrl(){
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  return code;
} 


// STEP 3 : GET ACCESS TOKEN FOR API REQUESTS
async function requestAccessToken(){
  const code = getAuthCodeFromUrl();
  if(code == null){
    requestAuthorizationCode()
    return;
  }
  let codeVerifier = localStorage.getItem('code_verifier');

  let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier
  });

  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      
      return response.json();
    })
    .then(data => {
      console.log('access token received!', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.setItem('access_token', data.access_token);
    })
    .catch(error => {
      console.error('Error:', error);
    });

}

function getAccessToken(){
  return localStorage.getItem('access_token');
}


// STEP 4: MAKE API REQUESTS WITH ACCESS TOKEN


// export async function getProfile(accessToken) {
  

//   const response = await fetch('https://api.spotify.com/v1/me', {
//     headers: {
//       Authorization: 'Bearer ' + accessToken
//     }
//   });

//   const data = await response.json();
//   return data;
// }


//******************************************************* */
export async function authorize(){
  const authCode = await getAuthCodeFromUrl();
  if(authCode == null){
    requestAuthorizationCode();
  }else{
    await requestAccessToken();
  }
}

export async function isAuthorized(){
  const accessToken = getAccessToken()
  if(accessToken == null){
    return false;
  }

  try{
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });

    if(response.ok){
      return true
    }
    return false
  }catch{
    return false
  }
}

//From: https://masteringjs.io/tutorials/fundamentals/wait-1-second-then
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export async function searchOnSpotify(term){
  try{
    const isAuth = await isAuthorized();
    if(!isAuth){
      await authorize();
    }

    //Takes a small amount of time for the API to respond correctly to the access token
    await delay(2000);

    //Make search
    const accToken = await getAccessToken();

    const baseUrl = 'https://api.spotify.com/v1/search';
    const reqParams = `?q=${term}&type=track`;
    console.log('querying...', baseUrl + reqParams)
    const response = await fetch(baseUrl + reqParams,{
      headers: {
        Authorization: 'Bearer ' + accToken
      }
    });

    if(response.ok){
      const jsonResponse = await response.json();
      console.log(jsonResponse) 
      return jsonResponse
    }

    throw new Error('Something went wrong')

  }catch(error){
    console.log(error)
  }
}



export async function createPlaylistOnSpotify(playlistName, tracksUris){
  try{
    const isAuth = await isAuthorized();
    if(!isAuth){
      await authorize();
    }

    //Takes a small amount of time for the API to respond correctly to the access token
    await delay(2000);

    //Get access token required for requests
    const accToken = await getAccessToken();

    const baseUrl = ' https://api.spotify.com/v1';
    const baseOptions = {
      headers: {
        Authorization: 'Bearer ' + accToken
      }
    };
    //1) Get users id
    const getUserURL = `${baseUrl}/me`;
    const getUserResponse = await fetch(getUserURL, baseOptions);
    const jsonUserResponse = await getUserResponse.json();
    if(!getUserResponse.ok){
      throw new Error('Something went wrong ', jsonUserResponse);
    }
    const userID = jsonUserResponse.id;
    console.log('User id -> ', userID);

    //Takes a small amount of time for the API to respond correctly to the access token
    await delay(2000);

    //2) Create playlist for user
    const createPlaylistURL = `${baseUrl}/users/${userID}/playlists`
    const createPlaylistResponse = await fetch(createPlaylistURL, {
      method: "POST",
      body: JSON.stringify({
        name: playlistName
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: 'Bearer ' + accToken
      }
    });

    const createPlaylistResponseJSON = await createPlaylistResponse.json();
    console.log('json response', createPlaylistResponseJSON)
    if(!createPlaylistResponse.ok){
      throw new Error('Something went wrong ', createPlaylistResponseJSON);
    }
    const playlistID = createPlaylistResponseJSON.id;
    console.log('Playlist created successfuly. ID -> ', playlistID);

    //Takes a small amount of time for the API to respond correctly to the access token
    await delay(2000);

    //3) Add tracks to playlist created
    const addTracksPlaylistURL = `${baseUrl}/playlists/${playlistID}/tracks`;
    const addTracksPlaylistResponse = await fetch(addTracksPlaylistURL, {
      method: "POST",
      body: JSON.stringify({
        uris: tracksUris
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: 'Bearer ' + accToken
      }
    });
    const addTracksPlaylistResponseJSON = await addTracksPlaylistResponse.json();
    if(!addTracksPlaylistResponse.ok){
      throw new Error('Something went wrong ', addTracksPlaylistResponseJSON);
    }
    console.log('Songs added to playlist successfully');

   
  }catch(error){
    console.log(error)
  }
}