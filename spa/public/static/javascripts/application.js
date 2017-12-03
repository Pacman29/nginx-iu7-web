class CheckLabel {
    constructor(element) {
        this.__element = element;
        this.__state = false;
        let obj = this;
        this.__element.addEventListener('click',((obj) => {
            obj.__state = !obj.__state ;
            console.log("gzip state: "+obj.__state );
        }).bind(null,obj));
    }

    get state() {
        return this.__state;
    }

    get element() {
        return this.__element;
    }
}

function requestSender(request,gzip_state) {
    if(gzip_state)
        request = '/gzip/'+request;

    return fetch(request, {method: 'GET'}).then((response) => {
        return response.json();
    })
}

(function main(argument) {
    var reloadbtn = document.getElementById("api_controlls-reloadbtn");
    var api_content = document.getElementById("api_content");
    var input = document.getElementById("api_controlls-input");
    var gzip_button = new CheckLabel(document.getElementById("gzip_button"));

    document.getElementById("button_api_system").addEventListener('click', ()=> {
        requestSender('api/system',gzip_button.state).then(request => {
            $('#json-renderer').jsonViewer(request);
        })
    });

    document.getElementById("button_api_system_cpu").addEventListener('click', ()=> {
        requestSender('api/system/cpu',gzip_button.state).then(request => {
            $('#json-renderer').jsonViewer(request);
        })
    });

    document.getElementById("button_api_system_processes").addEventListener('click', ()=> {
        requestSender('api/system/processes',gzip_button.state).then(request => {
            $('#json-renderer').jsonViewer(request);
        })
    });

    document.getElementById("button_api_system_currentLoad").addEventListener('click', ()=> {
        requestSender('api/system/currentLoad',gzip_button.state).then(request => {
            $('#json-renderer').jsonViewer(request);
        })
    });

    document.getElementById("button_api_system_osInfo").addEventListener('click', ()=> {
        requestSender('api/system/osInfo',gzip_button.state).then(request => {
            $('#json-renderer').jsonViewer(request);
        })
    });

    document.getElementById("button_api_app_port").addEventListener('click', ()=> {
        requestSender('api/app/port',gzip_button.state).then(request => {
            $('#json-renderer').jsonViewer(request);
        })
    });
}());