interface TokenResponse {
  access_token: string,
  token_type: string,
  expires_in: number
}
interface ArtistAlbumsResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: {
    album_type: "compilation";
    total_tracks: number;
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    name: string;
    release_date: string;
    release_date_precision: "year";
    restrictions: {
      reason: "market";
    };
    type: "album";
    uri: string;
    copyrights: {
      text: string;
      type: string;
    }[];
    external_ids: {
      isrc: string;
      ean: string;
      upc: string;
    };
    genres: string[];
    label: string;
    popularity: number;
    album_group: "compilation";
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: "artist";
      uri: string;
    }[];
  }[];
}

interface DiscogsResponse {
  name: string;
  id: number;
  resource_url: string;
  uri: string;
  releases_url: string;
  images: {
    type: string;
    uri: string;
    resource_url: string;
    uri150: string;
    width: number;
    height: number;
  }[];
  profile: string;
  urls: string[];
  namevariations: string[];
  members: {
    id: number;
    name: string;
    resource_url: string;
    active: boolean;
  }[];
  data_quality: string;
}


interface ArtistResponse {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
}


type AlbumInfo = {
  name: string,
  label: string,
  artwork: string,
  year: number
}

interface AlbumResponse {
  album_type: "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  release_date: string;
  release_date_precision: "year";
  restrictions: {
    reason: "market";
  };
  type: "album";
  uri: string;
  copyrights: {
    text: string;
    type: string;
  }[];
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  genres: string[];
  label: string;
  popularity: number;
  artists: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    name: string;
    popularity: number;
    type: "artist";
    uri: string;
  }[];
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: {
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: "artist";
        uri: string;
      }[];
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      is_playable: boolean;
      linked_from: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
      };
      restrictions: {
        reason: string;
      };
      name: string;
      preview_url: string;
      track_number: number;
      type: string;
      uri: string;
      is_local: boolean;
    }[];
  };
}

const getAccessToken = async (): Promise<TokenResponse | undefined>  => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (clientId && clientSecret) {

    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);
  
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': '__Host-device_id=AQA-ceUsgq1DXsAKxnUfJcBFGoCFAQ38-J4ROOpbOG7uCmzKFkjThZM09R7bcjGB4eHFMu48veRd8RsWeOso8KobTRvDoZNcM7o; sp_tr=false'
        },
        body: formData
      });
      const res = await response.json() as TokenResponse
      return res;
    } catch (e) {
      console.log(e);
    }
  }

};

const getArtistAlbums = async (accessToken: string, id: string) => {
  const url = 'https://api.spotify.com/v1/artists/' + id + '/albums?include_groups=album';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json() as ArtistAlbumsResponse;
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

const getArtist = async (accessToken: string, id: string) => {
  const url = 'https://api.spotify.com/v1/artists/' + id;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json() as ArtistResponse;
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

const getAlbum = async (accessToken: string, id: string) => {
  const url = 'https://api.spotify.com/v1/albums/' + id;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json() as AlbumResponse;
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

const getArtistDesc = async (id: string) => {
  const url = 'https://api.discogs.com/artists/' + id;
  try {
    const response = await fetch(url)
    const data = await response.json() as DiscogsResponse;
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getArtistInfo = async (spotifyId: string, discogsId: string) => {
  const tokenResponse = await getAccessToken();
  const access_token = tokenResponse?.access_token;

  if (access_token) {
    const artistInfo = await getArtist(access_token, spotifyId);
    const albumsInfo = await getArtistAlbums(access_token, spotifyId);
    const albums: AlbumInfo[] = [];

    if(albumsInfo && artistInfo) {
      for (const album of albumsInfo.items) {
        const info = await getAlbum(access_token, album.id);
        if (info) {
          albums.push({
            name: info.name,
            label: info.label,
            artwork: info.images[0]!.url,
            year: Number(info?.release_date.slice(0, 4))
          });
        }
      }
      const discogsResponse = await getArtistDesc(discogsId);
      if( discogsResponse){
        const profile =  discogsResponse.profile
        const artist = { name: artistInfo?.name, bio: profile, artwork: artistInfo.images[0]!.url };
    
        return { artist, albums };
      }
    }
  }
};


// (async () => {
//   await getArtistInfo('3PP6ghmOlDl2jaKaH0avUN', '6959133');
// })();


