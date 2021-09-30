const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

if (Object.keys(params).includes('pod')) {
    localStorage.setItem('pod', params.pod);
    root.style.setProperty('--pod', `${params.pod}`);
} else {
    let root = document.documentElement;
    if (localStorage.getItem('pod') === null) {
        root.style.setProperty('--showUserWarnings', 'block');
    }
    pod_objects = document.querySelectorAll(".pod");
    pod_objects.forEach(element => {
        let pod = localStorage.getItem('pod');
        let text = document.createTextNode(pod ? pod : 'X');
        element.appendChild(text);
    });
}

let key_input = document.getElementById('api_key');
if (key_input) {
    if (localStorage.getItem('api_key') !== null ) {
        let placeholder = document.getElementById('api_key_placeholder')
        placeholder.innerText = localStorage.getItem('api_key');
        placeholder.parentElement.parentElement.classList.remove("hidden");
        document.getElementById('api_key').parentElement.classList.add("hidden");
    }
}
function set_api_key(val) {
    let trimmed_value = document.getElementById(val).value.trim();
    console.log(trimmed_value);
    if (trimmed_value == null || trimmed_value === "") {
        return
    }
    localStorage.setItem('api_key', trimmed_value);
    let placeholder = document.getElementById('api_key_placeholder')
    placeholder.innerText = trimmed_value;
    placeholder.parentElement.parentElement.classList.remove("hidden");
    document.getElementById(val).parentElement.classList.add("hidden");
    location.reload();
}

function change_api_key(val) {
    let key_input = document.getElementById(val);
    key_input.value = "";
    let placeholder = document.getElementById('api_key_placeholder')
    placeholder.innerText = '';
    placeholder.parentElement.parentElement.classList.add("hidden");
    document.getElementById(val).parentElement.classList.remove("hidden");
}