
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
	template: [ '<div>共{{ data.total }}条 每页{{ data.pageSize }}条' ,
			'第{{ data.pageNo }}页/共{{ data.pageCnt }}页' ,
			'<button>首页</button>',
			'<button>首页</button>',
			'<button>首页</button>',
			'<button>末页</button></div>'].join('\r\n')
});

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