var rnTrans = function() {
    var video = document.querySelector('video');
    var vscript = document.querySelectorAll('.rc-Transcript .rc-Paragraph .phrases div[role=button]');
    var spt = ['WEBVTT'];
    
    for (var i = 0; i < vscript.length; ++i) {
        var value = vscript[i].textContent;
        var vs = window.rnvtt[i].split(/[\n\ ]+/);
        spt.push(vs[0] + '\n' + vs[1] + ' --> ' + vs[3] + '\n' + value);
    }
    // console.log(spt.join('\n\n'));
    addTrack(video, 'data:text/vtt;base64,' + Base64.encode(spt.join('\n\n')));
}

var addTrack = function(video, trackData) {
    var pvTrack = document.querySelector('track[label=영어싫어]');
    if (pvTrack) pvTrack.remove();
    var track = document.createElement('track');
    track.src = trackData;
    track.srclang = 'ko';
    track.kind = 'captions';
    track.label = '영어싫어';
    video.appendChild(track);
};

var getTrack = function() {
    var tracks = document.querySelectorAll('track');
    var selectedLang = document.querySelector('#select-language option[selected]').value;
    var track = null;
    for (var i = 0; i < tracks.length; ++i) {
        if (tracks[i].srclang == selectedLang) {
            track = tracks[i];
        }
    }
    if (track) {
        fetch(track.src)
        .then(res => res.text())
        .then(vtt => {
            window.rnvtt = vtt.slice(8).split('\n\n');
        });
    } else console.log('no track for translator');
};

var main = function() {
    getTrack();
};

// Inject Base64 Lib //
var sc = document.createElement('script');
sc.src = 'https://cdn.jsdelivr.net/npm/js-base64@3.6.1/base64.min.js';
document.body.appendChild(sc);

setTimeout(() => {
    var itarget = document.querySelector('.rc-VideoTranscriptToolbar > div');
    var rnTransBtn = document.createElement('button');
    rnTransBtn.id = 'rn-trans';
    rnTransBtn.onclick = rnTrans;
    rnTransBtn.innerHTML = '번역좀요 ㅋㅋ';
    rnTransBtn.style.width = '100px';
    rnTransBtn.style.textAlign = 'center';
    rnTransBtn.classList.add('_xcrq5m');
    rnTransBtn.classList.add('_r3zeoj');
    itarget.appendChild(rnTransBtn);

    console.log('run!');
    main();
}, 6000);