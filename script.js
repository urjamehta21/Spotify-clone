console.log("Welcome to Spotify");

// variable initialization
let songIndex=0;
let audioElement= new Audio("songs/Believer.mp3");

let masterPlay= document.getElementById('masterplay');
let myProgressbar= document.getElementById('myProgressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName: "Believer", filePath: "songs/Believer.mp3", coverPath:"imgdrgns.jpeg"},
    {songName: "Whatever it takes", filePath: "songs/Whatever_It_Takes.mp3", coverPath:"wtit.jpeg"},
    {songName: "Bones", filePath:"songs/Bones.mp3", coverPath:"Bones.jpeg"},
    {songName: "Next to me", filePath: "songs/Next_to_me.mp3", coverPath:"nxt.jpeg"},
    {songName: "Demons", filePath: "songs/Demons.mp3", coverPath:"nxt.jpeg"},
    {songName: "Enemy", filePath: "songs/Enemy.mp3", coverPath:"enemy.jpeg"}
];


//audioElement.play();

//play.pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
});

//listen to events
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressbar.value = progress;
});

myProgressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressbar.value * audioElement.duration/100;
});

    

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
};
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    console.log("Playing song index:", songIndex);

});

document.getElementById('previous').addEventListener('click', ()=>{
    document.getElementById('previous').addEventListener('click', () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        console.log("Playing song index:", songIndex); // Debugging line
    });
});



