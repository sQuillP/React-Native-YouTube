import axios, { AxiosInstance } from "axios";
import { VideoResult } from "../models/Video";
import { YOUTUBE_API_KEY} from "../youtubeConfig";
import { Comment } from "../models/Comment";



function transformData(items:any[], responseType:string):VideoResult[]{

    if(responseType === 'list')
        return items.map((item)=> {
            return {
                snippet: item.snippet,
                id: item.id,
                channelTitle:item.channelTitle
            };
        }) as VideoResult[];

    else (responseType === 'search')
        return items.map((item)=> {
                return { 
                    snippet:item.snippet,
                    id: item.id.videoId,
                    channelTitle: item.channelTitle
                }
        }) as VideoResult[];
}


function transformComments(comments:any[]):Comment[] {
    return comments.map((commentRes:any)=> {
        return commentRes.snippet.topLevelComment;
    });
}



//configuration for using the youtube api.
const YouTube:AxiosInstance = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    timeout: 3000,
    params: {key: YOUTUBE_API_KEY,}
});



export async function getFeed(maxResults: number = 25):Promise<VideoResult[]|null> {
    try {
        const response:any = await YouTube.get("/videos",{
            params: {
                part:"contentDetails,snippet,statistics",
                chart: 'mostPopular',
                maxResults
            }
        });
        return transformData(response.data.items,'list');
    } catch(error:any) {
        return null;
    }
}


export async function searchVideo(term:string, maxResults:number = 25):Promise<VideoResult[]|null> {
    try {
        const response = await YouTube.get('/search',{
            params:{
                part:"snippet",
                q:term,
                maxResults,
                type:'video'
            }
        });
        return transformData(response.data.items,'search');
    } catch(error) {
        return null;
    }
}


export async function getVideo(id:string):Promise<any> {
    try {
        const response:any = await YouTube.get('/videos', {
            params: {
                part:"contentDetails,snippet,statistics",
                id
            }
        });
        return response.data.items[0]
    } catch(error) {
        console.log('error', error);
        return null;
    }
}


export async function getComments(videoId:string):Promise<Comment[]|null> {
    console.log('getting comments with video id '+videoId)
    try {
        const response = await YouTube.get('/commentThreads', {
            params: {
                part:'snippet,id',
                videoId,
                maxResults: 20,
                order:'relevance'
            }
        });
        const transformedData = transformComments(response.data.items);
        return transformedData;
    } catch(error){
        console.log("ERROR",error)
        return null;
    }
}




