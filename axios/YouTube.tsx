import axios, { AxiosInstance } from "axios";
import { VideoFeedItem } from "../models/Video";
import { YOUTUBE_API_KEY} from "../youtubeConfig";


//configuration for using the youtube api.
const YouTube:AxiosInstance = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    timeout: 3000,
    params: {key: YOUTUBE_API_KEY,}
});


export async function getFeed(maxResults: number = 25):Promise<VideoFeedItem[]|null> {
    console.log('grabbing video feed')
    try {
        const response:any = await YouTube.get("/videos",{
            params: {
                part:"contentDetails,snippet,statistics",
                chart: 'mostPopular',
                maxResults
            }
        });
        return response.data.items;
    } catch(error:any) {
        console.log(error)
        return null;
    }
}


export async function searchVideo(term:string, maxResults:number = 25):Promise<any> {
    try {
        const response = await YouTube.get('/search',{
            params:{
                part:"snippet",
                q:term,
                maxResults
            }
        });

        return response.data.items;
    } catch(error) {
        //Unable to search videos
        return null;
    }
}




