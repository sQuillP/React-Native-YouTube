import {useState, useEffect} from 'react';



/* return the debounced term after a set duration. */

function useDebounce(term:string, duration:number = 1000) {

    const [debouncedTerm, updateDebouncedTerm] = useState(term);
    useEffect(()=> {
        const timeout = setTimeout(()=> {
            updateDebouncedTerm(term);
        }, duration);
        return ()=> clearTimeout(timeout);
    },[term]);

    return debouncedTerm;
}


export default useDebounce;