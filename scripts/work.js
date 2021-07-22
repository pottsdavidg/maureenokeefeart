import * as art from './app.js';

const all = [
    ...art.nudesAndFigures, 
    ...art.mirroredWorks,
    ...art.trinitiesAndSpirits,
    ...art.stillLife
];

const title = [
    'home-page', 
    'mirw-page', 
    'nude-page', 
    'trin-page', 
    'blin-page', 
    'stil-page', 
    'idol-page'
];

const returnTemplate = (link) => {
    return `
    <div id="${link}" class="image-container">
        <img class="list-image" src="${link}" width="auto">
    </div>`;
}

const fetchArtTemplate = (key) => {

    let result = '';

    if (key == 'nude' || key == 'all') {
        art.nudesAndFigures.forEach(item => {
            result += returnTemplate(item.link);
        });
    }

    if (key == 'mirw' || key == 'all') {
        art.mirroredWorks.forEach(item => {
            result += returnTemplate(item.link);
        });
    }

    if (key == 'trin' || key == 'all') {
        art.trinitiesAndSpirits.forEach(item => {
            result += returnTemplate(item.link);
        });
    }

    if (key == 'stil' || key == 'all') {
        art.stillLife.forEach(item => {
            result += returnTemplate(item.link);
        });
    }

    return result;

}

const updateDisplay = (page) => {

    let content = '';
    const display = document.getElementById('display');

    if (page == 'home-page') content += fetchArtTemplate('all');
    if (page == 'stil-page') content += fetchArtTemplate('stil');
    if (page == 'mirw-page') content += fetchArtTemplate('mirw');
    if (page == 'nude-page') content += fetchArtTemplate('nude');
    if (page == 'trin-page') content += fetchArtTemplate('trin');
    if (page == 'blin-page') content += fetchArtTemplate('all');
    if (page == 'idol-page') content += fetchArtTemplate('all');

    display.innerHTML = `
    <div id="large-display" class="selected-display hide-display"></div>
    <div id="cover" class="hide-display"></div>
    ${content}`;

}

const updatePage = () => {

    let elementClasses = [
        document.getElementById(title[0]).className.split(' '),
        document.getElementById(title[1]).className.split(' '),
        document.getElementById(title[2]).className.split(' '),
        document.getElementById(title[3]).className.split(' '),
        document.getElementById(title[4]).className.split(' '),
        document.getElementById(title[5]).className.split(' '),
        document.getElementById(title[6]).className.split(' ')
    ];

    for (let i = 0; i < 7; i++) {
        if (elementClasses[i].includes('selected-link')) {
            updateDisplay(title[i]);
        }
    }

    [...document.querySelectorAll('div.image-container')].forEach(item => {
    
        item.addEventListener('click', () => {
    
            let result = '';
            const displayImage = all.filter(image => image.link == item.id)[0];
            
            result += `<img class="large-image" src="${displayImage.link}">`;
            result += `<div class="large-image-description">`;
            result += `<div>${displayImage.title}</div>`;
        
            if (displayImage.hasOwnProperty('style')) result += `<div>${displayImage.style}</div>`;
            if (displayImage.hasOwnProperty('size')) result += `<div>${displayImage.size}</div>`;
            if (displayImage.hasOwnProperty('year')) result += `<div>${displayImage.year}</div>`;
            if (displayImage.hasOwnProperty('sold')) result += `<div class="error-text">SOLD</div>`;
        
            result += `</div><div id="cancel">BACK</div>`;
            document.getElementById('large-display').innerHTML = result;
            document.getElementById('large-display').style.display = 'block';
            document.getElementById('cancel').style.display = 'block';
    
        });
    
    });

    let cancelButton = document.getElementById('cancel');
    if (cancelButton) {
    cancelButton.addEventListener('click', () => {
        document.getElementById('large-display').style.display = 'none';
        document.getElementById('cancel').style.display = 'none';
    });
}

}

[...document.querySelectorAll('div.work-link')].forEach(item => {
    
    item.addEventListener('click', () => {
    
        let tagless = title.filter(name => name != item.id);
        tagless.forEach(tag => {
            document.getElementById(tag).classList.remove('selected-link');
        });
        document.getElementById(item.id).classList.add('selected-link');
        updatePage();
    
    });

});

let toggleNumber = 0;
if (toggleNumber == 0) {
    updateDisplay('home-page');
    toggleNumber++;
}
