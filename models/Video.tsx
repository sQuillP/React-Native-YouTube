export interface VideoResult {
  "id":string,
  "channelTitle":string,
  "snippet": {
    "publishedAt": Date,
    "channelId": string,
    "title": string,
    "description": string,
    "thumbnails": {
      'default': {
        "url": string,
        "width": number,
        "height": number
      },
      'medium': {
        "url": string,
        "width": number,
        "height": number
      },
      'high': {
        "url": string,
        "width": number,
        "height": number
      },
      'standard': {
        "url": string,
        "width": number,
        "height": number
      },
      'maxRes': {
        "url": string,
        "width": number,
        "height": number
      }
    }
  }
}
