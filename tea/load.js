/*
    var http_request = false;
	var currentPos = null;
	function send_request(url){
		http_request = false;
		if(window.XMLHttpRequest){
			http_request = new XMLHttpRequest();
			if (http_request.overrideMimeType) {
				http_request.overrideMimeType('text/xml');
			}
		}
		else if (window.ActiveXObject){
			try {
				http_request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					http_request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (!http_request) {
			window.alert("NOT-XMLHttpRequest-NEW.");
			return false;
		}
		http_request.onreadystatechange = processRequest;
		http_request.open("GET", url+"&t="+new Date().getTime(), true);
		http_request.send(null);
	}

    function processRequest(){
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
				document.getElementById(currentPos).innerHTML = http_request.responseText;
            } else {
                alert("Exception");
            }
        }
    }
    function onKeyDown() {
		if ((event.keyCode==116)||(window.event.ctrlKey)||(window.event.shiftKey)||(event.keyCode==122)) {
			event.keyCode=0;
			event.returnValue=false;
		}
	}
*/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('i 1=7;i c=d;9 y(g){1=7;2(5.8){1=6 8();2(1.h){1.h(\'z/w\')}}n 2(5.b){j{1=6 b("x.l")}k(e){j{1=6 b("A.l")}k(e){}}};2(!1){5.m("o-8-u.");s 7};1.v=f;1.E("P",g+"&t="+6 N().Q(),R);1.M(d)};9 f(){2(1.G==4){2(1.F==I){L.K(c).J=1.H}n{m("O")}}};9 r(){2((3.a==p)||(5.3.q)||(5.3.D)||(3.a==C)){3.a=0;3.B=7}}',54,54,'|http_request|if|event||window|new|false|XMLHttpRequest|function|keyCode|ActiveXObject|currentPos|null||processRequest|url|overrideMimeType|var|try|catch|XMLHTTP|alert|else|NOT|116|ctrlKey|onKeyDown|return||NEW|onreadystatechange|xml|Msxml2|send_request|text|Microsoft|returnValue|122|shiftKey|open|status|readyState|responseText|200|innerHTML|getElementById|document|send|Date|Exception|GET|getTime|true'.split('|'),0,{}))

