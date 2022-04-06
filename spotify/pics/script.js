console.log("Welcome to Spotify");

//initialize the variables
let songIndex=0;
let audioElement= new Audio('/songs/Tera Hone Laga Hoon.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar')
let gif=document.getElementById('gif')
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName:'Koi Mil Gaya - Kuch Kuch Hota Hai',filePath:'/songs/Koi Mil Gaya.mp3',coverPath:'/covers/kuch kuch hota hai.jpg'},
    {songName:'Kaho Naa Pyaar hai - Kaho Naa Pyaar hai',filePath:'/songs/Kaho Naa Pyar Hai.mp3',coverPath:'/covers/knph1.jpg'},
    {songName:'London thumakda - Queen',filePath:'/songs/London Thumakda.mp3',coverPath:'/covers/queen.jpg'},
    {songName:'Main Rang Sharbaton Ka - Phata Poster Nikla Hero ',filePath:'/songs/Main Rang Sharbaton.mp3',coverPath:'/covers/ppnh1.jpg'},
    {songName:'Maahi ve - Kal Ho Na Ho',filePath:'/songs/Maahi ve.mp3',coverPath:'/covers/khnh.jpg'},
    {songName:'Tum Se Hi - Jab We Met',filePath:'/songs/Tum Se Hi.mp3',coverPath:'/covers/jab we met.jpg'},
    {songName:'Tera Hone Laga Hoon - Ajab prem ki Gajab Kahani',filePath:'/songs/Tera Hone Laga Hoon.mp3',coverPath:'/covers/apgk.jpg'},

]

songItems.forEach((element,i)=>{
    console.log(element,i);
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
    console.log('timeupdate');
    //update seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})
