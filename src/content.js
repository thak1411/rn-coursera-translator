var rnTrans = function() {
    var video = document.querySelector('video');
    var texts = document.querySelectorAll('#rn-trans font font');
    var spt = ['WEBVTT'];
    for (var i = 0; i < texts.length; ++i) {
        if (isNaN(texts[i].textContent.split(' ')[0])) {
            spt[spt.length - 1] += '\n' + texts[i].textContent;
        } else {
            sp = texts[i].textContent.replace(/\ :\ /g, ':').split(' ');
            ps = ''
            for (var j = 4; j < sp.length; ++j) {
                ps += sp[j] + ' ';
            }
            txt = sp[0] + '\n' + sp[1] + ' --> ' + sp[3] + '\n' + ps;
            spt.push(txt);
        }
    }
    console.log(spt.join('\n\n'));
    addTrack(video, 'data:text/vtt;base64,' + Base64.encode(spt.join('\n\n')));
}

var addTrack = function(video, trackData) {
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
            var spt = vtt.slice(8).split('\n\n');
            document.getElementById('rn-trans').innerHTML = '';
            for (var i = 0; i < spt.length; ++i) {
                var line = document.createElement('span');
                line.innerHTML = spt[i];
                document.getElementById('rn-trans').appendChild(line);
            }
        });
    } else alert('no track for translator');
};

var main = function() {
    getTrack();
};

// Inject Base64 Lib //
var sc = document.createElement('script');
sc.src = 'https://cdn.jsdelivr.net/npm/js-base64@3.6.1/base64.min.js';
document.body.appendChild(sc);

setTimeout(() => {
    var tbox = document.createElement('div');
    tbox.id = 'rn-trans';
    tbox.style.fontSize = '1px';
    tbox.style.zIndex = -1;
    document.body.appendChild(tbox);

    console.log('run!');
    main();
}, 5000);