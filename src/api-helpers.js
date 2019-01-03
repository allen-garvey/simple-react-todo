export function fetchJson(url){
    return fetch(url).then((res)=>{
        return res.json();
      });
}