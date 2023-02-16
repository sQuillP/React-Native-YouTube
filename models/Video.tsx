export interface VideoFeedItem {
  "kind": string,
  "etag": string,
  "id": string,
  "snippet":{
    "publishedAt": Date,
    "channelId": string,
    "title": string,
    "thumbnails": {
      "default": {
        "url": string
        "width": number
        "height": number
      },
      "medium": {
        "url": string,
        "width": 320,
        "height": 180
      },
      "high": {
        "url": string,
        "width": number,
        "height": number
      },
      "standard": {
        "url": string
        "width": number
        "height": number
      },
      "maxres": {
        "url": string,
        "width": number,
        "height": number
      }
    },
    "channelTitle": string,
    "tags": string[],
    "categoryId": string,
    "liveBroadcastContent": string,
    "localized": {
      "title":string,
      "description":string
    }
  },
  "contentDetails": {
    "duration": string,
    "dimension": string,
    "definition": string,
    "caption": string,
    "licensedContent": boolean,
    "regionRestriction": {
      "allowed": string[],
      "blocked": string[]
    },
  },
  "statistics": {
    "viewCount": string,
    "likeCount": string,
    "favoriteCount": string,
    "commentCount": string
  }
};




export interface SearchResult {
  "kind": "youtube#searchResult",
  "etag": any,
  "id": {
    "kind": string,
    "videoId": string,
    "channelId": string,
    "playlistId": string
  },
  "snippet": {
    "publishedAt": Date,
    "channelId": string,
    "title": string,
    "description": string,
    "thumbnails": {
      [key:string]: {
        "url": string,
        "width": number,
        "height": number
      }
    },
    "channelTitle": string,
    "liveBroadcastContent": string
  }
};

