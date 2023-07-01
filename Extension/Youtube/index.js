const youtubeid = document.querySelector(".youtubeid");
const loading = document.querySelector(".loading");
const title = document.querySelector(".title");

const download_btn = document.querySelector(".download_btn");
let a_check = 0;

loading.style.display = "block";
loading.textContent = "Loading...";
download_btn.style.display = "none";




 
chrome.tabs.query({active: true, lastFocusedWindow: true}, async tabs => {
    let url = tabs[0].url;
    

    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    const youtube_id = youtube_parser(url);
    

        if(youtube_id === false)
        {
           loading.textContent = "Invalid page"
        }
        else
        {

        let brk = 0;
        let i=0;
        for(i =0;i<10;i++)
        {

        const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${youtube_id}` , {
            method : "GET",
            headers:{
		        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com',
                'X-RapidAPI-Key': 'ea993b0b0fmsh698a9e73073e960p16177djsna12de1074927'
            }
        });
 

         const fetchResponse =  await fetchAPI.json();
        if(fetchResponse.status === 'ok')
        {
           brk = 1;
           loading.style.display = "none";

            title.style.display = "block";
            
            title.textContent = fetchResponse.title;
 
            download_btn.style.display ="block";
    
            download_btn.href  = fetchResponse.link ;
            break;
        }
        
       }
       if(brk == 0)
       {   
            loading.style.display = "none";
            title.textContent ="Sorry,Try again";
       }
    }
});