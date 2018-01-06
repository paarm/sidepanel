console.debug('Hallo Script');
var model;
window.onload=function(ev) {
    console.debug('Site is loaded');

    model=Bind({
        name: '',
        password: ''
    }, {
        name: 'input[name="name"]',
        password: 'input[name="password"]'
    })
     
    var form=document.getElementById('form');
    form.addEventListener('submit', (ev)=> {
        console.debug('Form submit clicked');
        console.debug('mode.name='+model.name);
        ev.preventDefault();
        onLogin();
        //for(var i=0;i<form.elements.length;i++) {
        //    console.debug("type: "+form.elements[i].type+", name: "+form.elements[i].name+", value: "+form.elements[i].value);
        //}
    });
    /*for (var i=0;i<10;i++) {
        var div=document.createElement('div');
        div.appendChild(document.createTextNode("Nummer "+i));
        document.getElementById('main').appendChild(div);
    }*/
}

function onLogin() {
    console.debug('Login clicked');
    var xhttp = new XMLHttpRequest();
    //var loginName=document.getElementById('loginName');
    //var loginPassword=document.getElementById('loginPassword');
    var loginName=model.name;
    var loginPassword=model.password;
    xhttp.open("GET", '/login?name='+loginName+'&password='+loginPassword, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange=function(ev) {
        if (this.readyState == 4 && this.status == 200) {
            console.debug('response: '+xhttp.responseText);
            var response = JSON.parse(xhttp.responseText);    
            var text="";
            if (response.error!==undefined) {
                text='Login failed';
            } else {
                text='Login for '+response.name+' successful. Your session id is: '+response.sessionid;
                model.name='';
                model.password='';
            }
            var div=document.getElementById('loginData');
            if (div==null || div===undefined) {
                div=document.createElement('div');
                div.id='loginData';
                div.appendChild(document.createTextNode(' '));
                document.getElementById('main').appendChild(div);
            }
            div.childNodes.item(0).textContent=text;
        }
    }
    xhttp.send();
}

function onLogout() {
    console.debug('Logout clicked');
}

var myobject=(
    function(param) {
        var konstr=function(nachname) {
            this.name='Martin'+ " "+nachname;
        }  
        console.debug("huhu");
        return konstr;
    }   
)('Mein Parameter');
var konstr=function(nachname) {
    this.name='Martin'+ " "+nachname;
} 
console.log(new konstr('huhuuu'));
console.log(new myobject('Paar'));
