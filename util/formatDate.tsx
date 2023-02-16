



function pluralize(val:number, ending:string):string {
    if(val===1)
        return val + ' ' +ending;
    else
        return val + ' '+ending + 's';
}

export function formatTimeAgo(dateString:string):string {
    const postedDate:Date = new Date(dateString);
    const today:Date = new Date();
    const daysAgo = Math.floor((today.getTime()-postedDate.getTime())/(1000*60*60*24))
    if(daysAgo < 1)
        return 'today';
    if(daysAgo <7)
        return pluralize(daysAgo,'day');
    if(daysAgo > 7 && daysAgo < 30)
            return pluralize(Math.floor(daysAgo/7),'week');
    if(daysAgo < 365)
        return pluralize(
            Math.max(postedDate.getMonth(),today.getMonth()) - Math.min(postedDate.getMonth(),today.getMonth()),
            'month'
        );
    else
        return pluralize(today.getFullYear()-postedDate.getFullYear(),'year');
}