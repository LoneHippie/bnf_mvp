//script loader
function loadScript(url) {    
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
};

//dir finder/ID

let curFile = location.href.split("/").slice(-1);

if (curFile == '' || curFile == 'index.html#about' || curFile == 'index.html#reviews' || curFile == 'index.html#payment' || curFile == 'index.html#contact') { //curFile corection
    curFile = "index.html"
};

//tests for curFile
if (curFile == 'index.html') {

    console.log('positive ID: index');

    loadScript('js/home.js');

}
if (curFile == 'survey.html') {

    console.log('positive ID: survey');

    loadScript('js/survey.js');
    
}