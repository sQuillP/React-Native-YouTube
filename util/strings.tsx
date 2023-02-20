export function chopString(stringVal:string, len:number):string {
    if(stringVal.length < len)
        return stringVal;
    return stringVal.substring(0,len) + "...";
}