export interface Comment {
    kind:string,
    etag:string,
    id:string,
    snippet: {
        "authorDisplayName": string,
        "authorProfileImageUrl": string,
        "authorChannelUrl": string,
        "authorChannelId": {
        "value": string
        },
        "channelId": string,
        "videoId": string,
        "textDisplay": string,
        "textOriginal": string,
        "parentId": string,
        "canRate": boolean,
        "viewerRating": string,
        "likeCount": number
        "moderationStatus": string,
        "publishedAt": string | Date,
        "updatedAt": string | Date
    }
}