import * as art from './app.js';

const all = [
    ...art.nudesAndFigures, 
    ...art.mirroredWorks,
    ...art.trinitiesAndSpirits,
    ...art.stillLife
];

console.log(all);

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
    <div class="image-container" onclick="setHiddenDisplay('${link}')">
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

const setHiddenDisplay = (aLink) => {

    let result = '';
    const displayImage = all.filter(image => image.link === aLink)[0];
    
    result += `<img class="large-image" src="${displayImage.link}">`;
    result += `<div class="large-image-description">`;
    result += `<div>${displayImage.title}</div>`;

    if (displayImage.hasOwnProperty('style')) result += `<div>${displayImage.style}</div>`;
    if (displayImage.hasOwnProperty('size')) result += `<div>${displayImage.size}</div>`;
    if (displayImage.hasOwnProperty('year')) result += `<div>${displayImage.year}</div>`;
    if (displayImage.hasOwnProperty('sold')) result += `<div class="error-text">SOLD</div>`;

    result += `</div><a href="#" id="cancel">BACK</a>`;
    document.getElementById('large-display').innerHTML = result;

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
    tagless.forEach(tag => {
        document.getElementById(tag).classList.remove('selected-link');
    });
    document.getElementById(ID).classList.add('selected-link');
    updatePage();

}

const checkClass = (classList, className) => {
    if (classList.every(item => item != className)) return false;
    return true;
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
        if (checkClass(elementClasses[i], 'selected-link')) {
            updateDisplay(title[i]);
        }
    }
}

const onclickFunctionality = () => {
    document.getElementById(title[0]).addEventListener('click', selectPage(title[0]));
    document.getElementById(title[1]).addEventListener('click', selectPage(title[1]));
    document.getElementById(title[2]).addEventListener('click', selectPage(title[2]));
    document.getElementById(title[3]).addEventListener('click', selectPage(title[3]));
    document.getElementById(title[4]).addEventListener('click', selectPage(title[4]));
    document.getElementById(title[5]).addEventListener('click', selectPage(title[5]));
    document.getElementById(title[6]).addEventListener('click', selectPage(title[6]));
}

onclickFunctionality();
