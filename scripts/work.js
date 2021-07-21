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
        <a href="#large-display">
            <img class="list-image" src="${link}" width="auto">
        </a>
    </div>
    `;
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
    <div id="large-display" class="selected-display"></div>
    <div id="cover"></div>
    ${content}`;

}

const selectPage = (ID) => {
    
    let tagless = title.filter(name => name != ID);
    console.log(tagless);
    tagless.forEach(tag => {
        document.getElementById(tag).classList.remove('selected-link');
    });
    document.getElementById(ID).classList.add('selected-link');
    updatePage();

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
}

[...document.querySelectorAll('div.work-link')].forEach(item => {
    
    item.addEventListener('click', (ID) => {
        
        let tagless = title.filter(name => name != ID);
        console.log(tagless);
        
        tagless.forEach(tag => {
            document.getElementById(tag).classList.remove('selected-link');
        });
        
        document.getElementById(ID).classList.add('selected-link');
        updatePage();
        
    });
    
    console.log(item.id);
    
});

[...document.querySelectorAll('div.image-container')].forEach(item => {
    
    item.addEventListener('click', (aLink) => {
        
        let result = '';
        const displayImage = all.filter(image => image.link === aLink)[0];
        console.log(displayImage);
        
        result += `<img class="large-image" src="${displayImage.link}">`;
        result += `<div class="large-image-description">`;
        result += `<div>${displayImage.title}</div>`;
        
        if (displayImage.hasOwnProperty('style')) result += `<div>${displayImage.style}</div>`;
        if (displayImage.hasOwnProperty('size')) result += `<div>${displayImage.size}</div>`;
        if (displayImage.hasOwnProperty('year')) result += `<div>${displayImage.year}</div>`;
        if (displayImage.hasOwnProperty('sold')) result += `<div class="error-text">SOLD</div>`;
        
        result += `</div><a href="#" id="cancel">BACK</a>`;
        document.getElementById('large-display').innerHTML = result;
        
    });
    
    console.log(item.id);
    
});
