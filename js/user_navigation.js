const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

if (Object.keys(params).includes('pod')) {
    localStorage.setItem('pod', params.pod);
    root.style.setProperty('--pod', `${params.pod}`);
} else {
    let root = document.documentElement;
    if (localStorage.getItem('pod') === null) {
        root.style.setProperty('--showUserWarnings', 'block');
    } else {
        pod_objects = document.querySelectorAll(".pod");
        pod_objects.forEach(element => {
            let text = document.createTextNode(localStorage.getItem('pod'));
            element.appendChild(text);
        });
    }
}