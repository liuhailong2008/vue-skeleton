
function loadList(selector, url, callback){
	fetch(url).then(function(res) {
	  if (res.ok) {
	    res.json().then(function(data) {
	      var vueObj = bind(selector,data);
	      if(callback){
	      	callback(vueObj);
	      }
	    });
	  } else {
	    alert('Something wrong , response status : ' + res.status);
	  }
	}, function(e) {
	  alert('Something wrong , response status : ' + e);
	});
}

/**
 * 分页组件。
 */
Vue.component('paging', {
	props: ['data'],
	template: [ 
		"<div>",
			"共{{ data.total }}条 每页{{ data.pageSize }}条" ,
			"第{{ data.pageNo }}页/共{{ data.pageCnt }}页" ,

			"<button onclick='goPage(1)'>首页</button>",
			"<a :href=\"'?pageNo='+(data.pageNo-1)\">上一页</a>",
			"<a :href=\"'?pageNo='+(data.pageNo+1)\">下一页</a>",
			"<a :href=\"'?pageNo='+data.pageCnt\">末页</a>",
		"</div>"
	].join('\r\n')
});

function goPage(){
	
}

function bind(selector, data){
	var ret = getVueObj(selector, data);
	return ret;
}

function getVueObj(selector, data){
	var ret = new Vue(getWrapper(selector, data));
	return ret;
}

function getWrapper(selector, data){
	var ret = {
		el : selector,
		data : data
	};
	return ret;
}

function log(msg){
	if(console.log){
		console.log(msg);
	}else{
		alert(msg);
	};
}