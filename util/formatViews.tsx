

export default function formatViews(viewCount:string|number):string {
    viewCount = Number(viewCount);
    if(viewCount > 999 && viewCount < 1_000_000)
        return Math.floor(viewCount/1_000) + "k";
    else if(viewCount >= 1_000_000)
        return Math.floor(viewCount/1_000_000) + "m";
    else if(viewCount > 999_999_999)
        return Math.floor(viewCount/1_000_000_000)+"b";
    return viewCount.toString();
}