
var result = new Object();
result.requestUrl = "http://cache.neea.edu.cn";
result.zRule = ["","CET4-D","CET6-D","CJT4-D","CJT6-D","PHS4-D","PHS6-D","CRT4-D","CRT6-D","TFU4-D"];
result.verifyFlag = false;

window.onload = function() {
	if(!navigator.cookieEnabled){
		alert("开启Cookie之后才能查询成绩！");
	}
	var inputs =document.getElementsByTagName("input");
	for(var i=0;i<inputs.length;i++){
		var inputId = inputs[i].id;
		if(inputs[i].type=="text"){
			inputs[i].onclick = (function(inputId){
				return function(){
					var checkTimeErr = util.checkTime(dq.qt);
					if(checkTimeErr){
						util.get(inputId).blur();
						util.get(inputId).value = "";
						alert(checkTimeErr);
						return;
					}
				};
				
			})(inputId);
		}
	}

    var tfuKsxmObj = util.findObjByKey(dq.rdsub, "code", "TFU4-D");
	if(tfuKsxmObj){
        util.get("onlyCet46Remark").style.display = "none";
        util.get("allRemark").style.display = "block";
    }else{
        util.get("onlyCet46Remark").style.display = "block";
        util.get("allRemark").style.display = "none";
    }

	var c,e,sn,z,n,ksxmObj;

	util.get("parm_sn").innerHTML = dq.sn;
	if(dq.subn)
		util.get("parm_subn").innerHTML = dq.subn;

	if(result.verifyFlag){
		util.get("zkzh").onchange=function(){
			result.changeZ();
		};
		util.get("verifyLi").style.display = "block";
		util.get("verifyTipLi").style.display = "block";
	}

	util.get("submitButton").onclick=function(){
		var checkTimeErr = util.checkTime(dq.qt);
		if(checkTimeErr){
			alert(checkTimeErr);
			return;
		}
		
		z = util.get("zkzh").value.toUpperCase();
		
		n = util.get("name").value;
		if(n.length>10){
			n = n.substring(0,10);
		}
		var v = "";
		if(result.verifyFlag){
			v = util.get("verify").value.toLowerCase();
		}
		var obj = util.get("verifyerror");
		if(obj.hasChildNodes()){
			obj.removeChild(obj.childNodes[0]);
		}
		if(result.checkParm(util.get("zkzh"),true)&&result.checkParm(util.get("name"),false)){
			if(result.verifyFlag && (!v||util.trim(v).length!=4)){
				var va = document.createTextNode("请输入四位有效验证码！");
				obj.appendChild(va);
				util.get("verify").focus();
				return;
			}
		}else{
			return;
		}
		ksxmObj = getKsxm(z);
		if(ksxmObj==null){
			alert("“准考证号”输入格式不正确！");
			return;
		}
		c = ksxmObj.code;
		e = ksxmObj.tab;
		
		_hmt.push(['_setAccount', 'dc1d69ab90346d48ee02f18510292577']);
		_hmt.push(['_trackEvent', 'query', 'click', c+'-q', 1]);
		
		util.nec("q",e);

		util.get("shadeDiv").style.display = "block";
		
		util.get("submitButton").disabled = true;
		util.get("submitButton").className = "disabled";
		
		var data = (e+","+z+","+n);//getCzn(c,z,n);
		util.urlLoad(result.requestUrl + "/cet/query?data=" + encodeURIComponent(data) + (result.verifyFlag ? "&v=" + v : ""), function (errorFlag) {
			if (errorFlag) {
				alert("网络超时，请稍后再试！");
				util.get("shadeDiv").style.display = "none";
			}
			util.get("submitButton").disabled = false;
			util.get("submitButton").className = "";
		});
    };

    result.callback = function(data){
		//eval("data="+data);
		if(data){
			if(data.s||data.s==0){
				util.get("sn").innerHTML = dq.sn.substring(0, dq.sn.indexOf("全国"))+ksxmObj.name;//ksxmObj.en;
				if(("CET4-D,CET6-D").indexOf(ksxmObj.code)!=-1){
					util.get("z").innerHTML = data.z;
					util.get("x").innerHTML = data.x;
					util.get("n").innerHTML = data.n;
					util.get("s").innerHTML = data.s;
					if(data.t&&data.t=="1"){
						util.get("tipss").style.display = "block";
					}
					util.get("l").innerHTML = data.l;
					util.get("r").innerHTML = data.r;
					util.get("w").innerHTML = data.w;
					util.get("kyz").innerHTML = data.kyz;
					util.get("kys").innerHTML = data.kys;

					util.get("cet46_t").style.display = "block";
				}else{
					util.get("m_z").innerHTML = data.z;
					util.get("m_x").innerHTML = data.x;
					util.get("m_n").innerHTML = data.n;
					util.get("m_s").innerHTML = data.s;
					if(data.t&&data.t=="1"){
						util.get("m_tipss").style.display = "block";
					}
					util.get("cet46_f").style.display = "block";
				}
				util.get("query_param").style.display = "none";
				util.get("query_result").style.display = "block";
				_hmt.push(['_trackEvent', 'querySuccess', 'result', c+'-qs', 1]);

				util.nec("qs",e);
				util.nec("qsg",e,data.z,data.x,data.s);
			}else{
				if(data.error){
					alert(data.error);
					/*if(data.error.indexOf("验证码")>0){
                        result.verifys();
                    }*/
				}else{
					alert("您查询的结果为空！");
				}
				if(result.verifyFlag){
					result.verifys();
				}
			}
		}else{
			alert("网络超时，请稍后再试！");
		}
		util.get("shadeDiv").style.display = "none";
		util.get("submitButton").disabled = false;
		util.get("submitButton").className = "";
	};
	
	result.changeZ=function(){
		if(util.get("verifysDiv").style.display!="none"){
			result.verifys();
		}
	};

	result.verifyShow=function()
	{
		if(util.get("verifysDiv").style.display=="none"){
			result.verifys();
		}
	};

	//更换验证码
	result.verifys=function()
	{
		var checkTimeErr = util.checkTime(dq.qt);
		if(checkTimeErr){
			return;
		}
		if(!util.get("zkzh").value || !util.get("name").value){
			alert("请先输入正确的准考证号及姓名，再点击获取验证码！");
			util.get("verify").blur();
			return;
		}
		if(!result.checkParm(util.get("zkzh"),true)||!result.checkParm(util.get("name"),false)){
			return;
		}
		
		z = util.get("zkzh").value.toUpperCase();
		ksxmObj = getKsxm(z);
		if(ksxmObj==null){
			alert("“准考证号”输入格式不正确！");
			return;
		}
		
		util.get("verifysLoading").style.display = "block";

		util.urlLoad(result.requestUrl + "/Imgs.do?c=CET&ik=" + encodeURIComponent(util.get("zkzh").value.trim().toUpperCase()) + "&t=" + Math.random(), function (errorFlag) {
			if (errorFlag) {
				util.get("verifysLoading").style.display = "none";
				util.get("verify").blur();
				alert("网络超时，验证码获取失败，请稍后再试！");
			}
		});
	};

	result.imgs=function(data){
		if(data){
			var imgs=util.get('img_verifys');
			var imgsSrc = "http://cet.neea.edu.cn/imgs/"+data+".png";//window.location.origin+"/imgs/"+data+".png";
			imgs.src=imgsSrc;
			imgs.style.visibility = "visible";
			util.get("verifysLoading").style.display = "none";
			util.get("verifysDiv").style.display = "block";
			util.get("verify").value='';
			util.get("verify").focus();
		}
	};
	
	result.err = function(err){
		if(result.verifyFlag){
			util.get("verify").blur();
		}
        alert(err);
        if(util.get("shadeDiv").style.display == "block"){
			util.get("shadeDiv").style.display = "none";
		}
    };

    /**
     * 验证查询条件
     * t    this
     * f 是否验证 “中间是否有空格”
     */
	result.checkParm=function(t,f){
		var checkTimeErr = util.checkTime(dq.qt);
		if(checkTimeErr){
			return;
		}
		var alt = t.alt;
		var name = t.name;
		var val = t.value;
		//alert(name+":"+val);
		val = util.trim(val);
		var errorName = name+"error";
		var errorObj = util.get(errorName);
		if(errorObj){
			if(errorObj.hasChildNodes())errorObj.removeChild(errorObj.childNodes[0]);
		}else{
			return false;
		}
		var err = "";
		if(val){
			if(util.checkString(val))err = "“"+alt+"”格式错误";
		}else err = "“"+alt+"”不能为空";
		if(!err){
			if(f==true){
				t.value = val;
				val = val.toUpperCase();
				if(util.checkSpace(val))err = "“"+alt+"”中间不能有空格";
				else if(val.length!=15)err = "请输入15位“"+alt+"”";
				else if(util.checkCetZkzh(val))err = "“"+alt+"”输入格式不正确！";
			}
		}
		if(err){
			errorObj.appendChild(document.createTextNode(err));
			return false;
		}
		return true;
	};
	
	util.get("button").onclick=function(){
		goon();
	};
	
	document.onkeydown = function()
	{
        if(event.keyCode == 13) {
        	util.get("submitButton").click();
        	return false;
        }
	};
};


function getKsxm(z){
	var idx = -1;
	var t = z.charAt(0);
	if(t=="F"){
		idx = 1;
	}else if(t=="S"){
		idx = 2;
	}else{
		t = z.charAt(9);
		if(!isNaN(t))
			idx = t;
	}
	if(idx!=-1){
		var code = result.zRule[idx];
		return util.findObjByKey(dq.rdsub,"code",code);
	}
	return null;
}

function getCzn(c,z,n){
	//var crypt = new JSEncrypt();
	//crypt.setPublicKey(result.publicKey);
	//return encodeURIComponent(crypt.encrypt((c+","+z+","+n)));
	return (c+","+z+","+n);
}

function goon(){
	util.get("zkzh").value = "";
	util.get("name").value = "";
	if(result.verifyFlag){
		util.get("verify").value = "";
		util.get("verifysDiv").style.display = "none";
	}
    util.get("query_result").style.display = "none";
    util.get("cet46_t").style.display = "none";
    util.get("cet46_f").style.display = "none";
    util.get("query_param").style.display = "block";
    var divs = document.getElementsByTagName("div");
    for (var i=0; i< divs.length; i++ )
    {
        if (divs[i].className == "tipss") {
            divs[i].style.display = "none";
        }
    }
}
