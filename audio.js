const songs = [
    {
        author: 'Leprous',
        name: 'Contaminate Me',
        duration: 9.04,
        year: 2013,
        audio: 'Leprous.mp3'
    },
    {
        author: 'Batushka',
        name: 'Yektenya 2',
        duration: 4.22,
        year: 2015,
        audio: 'yektenya2.mp3'
    },
    {
        author: 'Genesis',
        name: 'Squonk',
        duration: 6.30,
        year: 1976,
        audio: 'squonk.mp3'
    },
    {
        author: 'Animals as Leaders',
        name: 'Song of Solomon',
        duration: 4.16,
        year: 2009,
        audio: 'songOfSolomon.mp3'
    },
    {
        author: 'King Crimson',
        name: 'Three of a Perfect Pair',
        duration: 4.09,
        year: 1984,
        audio: 'kingCrimson.mp3'
    },
    {
        author: 'Jethro Tull',
        name: 'Aqualung',
        duration: 6.39,
        year: 1971,
        audio: 'aqualung.mp3'
    },
    {
        author: 'Van Halen',
        name: 'Hot for Teacher',
        duration: 4.44,
        year: 1984,
        audio: 'vanHalen.mp3'
    },
    {
        author: 'Samsas Traum',
        name: 'Durch springende Lippen',
        duration: 3.09,
        year: 2007,
        audio: 'samsasTraum.mp3'
    },
    {
        author: 'Judas Priest',
        name: 'Painkiller',
        duration: 6.05,
        year: 1990,
        audio: 'painkiller.mp3'
    },
    {
        author: 'Dream Theater',
        name: 'S2N',
        duration: 6.21,
        year: 2019,
        audio: 's2n.mp3'
    },
    {
        author: 'Van Der Graaf Generator',
        name: 'Scorched Earth',
        duration: 9.48,
        year: 1975,
        audio: 'scorchedEarth.mp3'
    },
    {
        author: 'Rush',
        name: 'Tom Sawyer',
        duration: 4.32,
        year: 1981,
        audio: 'rush.mp3'
    },

];

const currSong = new Audio();
//player and its elements
const playerContainer = document.getElementById('player-container');

const time = document.getElementById('time');
const playButton = document.getElementById('play');
const range = document.getElementById('range');
const volumeSlider = document.getElementById('mute')
const favs = document.getElementById('favs');
const tracks = document.getElementById('tracks');
const volume = document.getElementById('volume');

let j = -1; // helps to avoid for loop and index elements of favorites[]

const renderTrackList = function (songs) {
    const songName = document.getElementById('songname');
    let favorites = [];
    tracks.innerHTML = '';

    songs.forEach((song, i) => {

        tracks.insertAdjacentHTML('beforeend', `<tr><td>${song.author}</td><td>${song.name}</td><td>${song.duration.toFixed(2)}</td><td>${song.year}</td><td><button class="play"><span data-cart="" data-index="${i}" class="material-icons">play_arrow</span></button ></td><td><input type='checkbox' id='${i}'/></td></tr>`);
        let cb = document.getElementById(`${i}`);

        cb.addEventListener('click', function () {
            if (this.checked) {
                j++;
                favorites.push(song);
                favs.insertAdjacentHTML('beforeend', `<tr><td>${favorites[j].author}</td><td>${favorites[j].name}</td><td>${favorites[j].duration.toFixed(2)}</td><td>${favorites[j].year}</td><td><button class="play"><span data-cart="" data-index="${i}" class="material-icons">play_arrow</span></button ></td></tr>`);


            }


        });

    });

    function render(evt) {
        const listName = this.getAttribute('id');
        time.innerHTML = '';
        if (evt.target.hasAttribute('data-cart')) {
            playerContainer.style.visibility = 'visible';

            const index = Number(evt.target.getAttribute("data-index"));

            songName.innerText = `${songs[index].author} — ${songs[index].name}`;
            currSong.src = `audio/${songs[index].audio}`;
            currSong.play();

            range.addEventListener('change', function () {
                range.setAttribute('max', `${currSong.duration}`);
                currSong.currentTime = this.value;

            });

            currSong.addEventListener('timeupdate', function () {
                currSong.volume = volumeSlider.value;
                let val = Math.round(currSong.currentTime);
                range.value = val;
                let mins = Math.floor((this.currentTime / 60));
                let secs = Math.ceil(this.currentTime % 60);
                mins < 10 ? mins = '0' + mins : secs = secs;
                secs < 10 ? secs = '0' + secs : secs = secs;
                time.innerHTML = mins + ":" + secs;

            });

            let songNum = 0;

            currSong.addEventListener('ended', function () {
                if (listName === 'favs') {
                    playerContainer.style.visibility = 'visible';
                    currSong.src = `audio/${favorites[songNum + 1].audio}`; console.log(currSong.src);
                    songName.innerText = `${favorites[songNum + 1].author} — ${favorites[songNum + 1].author}`;
                    currSong.play();
                    songNum++;

                }

                else {
                    playerContainer.style.visibility = 'hidden';
                }

            });
        }
    };

    tracks.addEventListener('click', render);
    favs.addEventListener('click', render);

};


volume.addEventListener('click', function () {
    volumeSlider.style.visibility = (volumeSlider.style.visibility == 'hidden') ? 'visible' : 'hidden';
});

playButton.addEventListener('click', function () {
    if (currSong.paused) {
        currSong.play();
        this.innerHTML = '<span class="material-icons">pause</span>';
    }

    else {
        currSong.pause();
        this.innerHTML = '<span class="material-icons">play_arrow</span>';
    }

});

renderTrackList(songs);

//filtration 

const byAuthor = document.getElementById('author');
const byName = document.getElementById('name');
const search = document.getElementById('search');

byName.addEventListener('click', filteredByName);
byAuthor.addEventListener('click', filteredByAuthor);
search.addEventListener('keyup', filteredByText);

function filteredByAuthor() {
    const text = search.value.toLowerCase().trim();
    console.log(text);
    const filteredByAuthor = songs.filter(song => song.author.toLowerCase().includes(text));
    renderTrackList(filteredByAuthor);
};

function filteredByName() {
    const text = search.value.toLowerCase().trim();
    console.log(text);
    const filteredByName = songs.filter(song => song.name.toLowerCase().includes(text));
    renderTrackList(filteredByName);
};

function filteredByText() {
    const text = search.value.toLowerCase().trim();
    console.log(text);
    const filteredSongs = songs.filter(song => song.name.toLowerCase().includes(text) || song.author.toLowerCase().includes(text));
    renderTrackList(filteredSongs);
};


