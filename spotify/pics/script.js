console.log("Welcome to Spotify");

//initialize the variables
let songIndex=0;
let audioElement= new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar')
let gif=document.getElementById('gif')
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName:'Koi Mil Gaya - Kuch Kuch Hota Hai',      filePath:'/songs/1.mp3',coverPath:'/covers/kuch kuch hota hai.jpg'},
    {songName:'Kaho Naa Pyaar hai - Kaho Naa Pyaar hai',filePath:'/songs/2.mp3',coverPath:'/covers/knph1.jpg'},
    {songName:'London thumakda - Queen',                filePath:'/songs/3.mp3',coverPath:'/covers/queen.jpg'},
    {songName:'Main Rang Sharbaton Ka - Phata Poster Nikla Hero ',filePath:'/songs/4.mp3',coverPath:'/covers/ppnh1.jpg'},
    {songName:'Maahi ve - Kal Ho Na Ho',                filePath:'/songs/5.mp3',coverPath:'/covers/khnh.jpg'},
    {songName:'Tum Se Hi - Jab We Met',                 filePath:'/songs/6.mp3',coverPath:'/covers/jab we met.jpg'},
    {songName:'Tera Hone Laga Hoon - Ajab prem ki Gajab Kahani',filePath:'/songs/7.mp3',coverPath:'/covers/apgk.jpg'},

]

songItems.forEach((element,i)=>{
    //  console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

// audioElement.play();


//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    //update seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})


const makeAllPlays = ()=>{
    Array.from (document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from (document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        if(audioElement.paused==true){
        e.target.classList.add('fa-pause-circle');
        e.target.classList.remove('fa-play-circle');
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.src = `/songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        }
        else{
            e.target.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
           audioElement.pause();
        }
        
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})



document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
    songIndex=0;
    }
    else{
    songIndex=songIndex+1;
    }
    audioElement.src = `/songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
    songIndex=0;
    }
    else{
    songIndex=songIndex-1;
    }
    audioElement.src = `/songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})