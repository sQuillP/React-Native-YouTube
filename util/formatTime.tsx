import {parse} from 'iso8601-duration'


export function formatDuration(time:string):string {
    const format = parse(time);
    let appender = '';
    if(format.hours && format.hours !== 0)
        appender += format.hours + ":"
    else if(format.minutes && format.minutes < 10)
        appender += '0' + format.minutes + ":";
    else if(format.minutes && format.minutes >=10)
        appender += format.minutes + ':';
    if(format.seconds && format.seconds < 10 )
        appender += '0'+ format.seconds
    else if(format.seconds && format.seconds >=10) 
        appender += format.seconds;
    return appender;
}