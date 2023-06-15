export interface AutocompleteResult {
  hints: {
    term: string;
  }[];
}

export interface Track {
  layout: string;
  type: string;
  key: string;
  title: string;
  subtitle: string;
  share: {
    subject: string;
    text: string;
    herf: string;
    image: string;
    twitter: string;
    html: string;
    avatar: string;
    snapchat: string;
  };
  images: {
    background: string;
    coverart: string;
    coverarthq: string;
    joecolor: string;
  };
  artists: {
    id: string;
    adamid: string;
  }[];
}

export interface SearchResult {
  tracks: {
    hits: {
      snippet?: string;
      track: Track;
    }[];
  };
  artists: {
    hits: {
      artist: {
        avatar: string;
        id: string;
        name: string;
        verified: boolean;
        weburl: string;
        adamid: string;
      };
    }[];
  };
}

export interface SongDetailResult extends Track {
  genres: {
    primary: string;
  };
}

export interface PopularTracksInChartsResult {
  properties: {};
  tracks: Track[];
}
