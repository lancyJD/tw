;(function(win){
	
 	function $(el) {
 		return document.getElementById(el);
 	}

 	function createEl(id, tpl){
 		var divEl = document.createElement('div');
		divEl.setAttribute('id', id);
		divEl.innerHTML = tpl
		return divEl;
 	}
 	if(!!!win && typeof win != 'object') {
			win = window
	}
 	// let document = win.document
	install = function(Vue) {
		
		let toast = "<div id='loadingToast'> <div class='weui-mask_transparent'></div> <div class='weui-toast'> <i class='weui-loading weui-icon_toast'></i> <p class='weui-toast__content'>数据加载中</p></div></div>"
		let info = '<div class="js_dialog" id="iosDialog2"><div class="weui-mask"></div><div class="weui-dialog"><div id="weui-dialog_info" class="weui-dialog__bd"></div> <div class="weui-dialog__ft"><a href="javascript:;" id="info_sure" class="weui-dialog__btn weui-dialog__btn_primary">确定</a> </div> </div></div>'
		let tip = "<div id='toastTip' style='opacity: 1; display: block;'><div class='weui-mask_transparent'></div><div class='weui-toast'><i class='weui-icon-success-no-circle weui-icon_toast'></i><p id='toastValueInfo' class='weui-toast__content'>操作成功</p></div></div>"
		let dialog = "<div class='js_dialog' id='iosDialog1' style='opacity: 1;'><div class='weui-mask'></div><div class='weui-dialog'><div class='weui-dialog__hd'><strong id='weuiDialogTitleDialog' class='weui-dialog__title'>信息</strong></div><div id='weuiDialogdescDialog' class='weui-dialog__bd'></div><div class='weui-dialog__ft'><a href='javascript:;' id='dialogEsc' class='weui-dialog__btn weui-dialog__btn_default'>取消</a><a href='javascript:;' id='dialogSure' class='weui-dialog__btn weui-dialog__btn_primary'>确定</a></div></div></div>"
		Vue.toast = function (tpl) {
			if(!!!tpl) {
				tpl = toast
			}
			if($('toast')) {
				$('toast').style.display = 'block';
			} else {
				win.document.body.appendChild(createEl('toast', toast));
			}
		},
		Vue.closeToast = function() {
			if($('toast'))
				$('toast').remove();
		},
		Vue.info = function(desc, fn) {
			if($('info')) {
				$('info').remove();
			}
			win.document.body.appendChild(createEl('info', info));
			$('weui-dialog_info').innerHTML = desc;
			$('info_sure').onclick = function(){
				$('info').remove();
				if(fn) {
					fn();
				}
			}
		},
		Vue.tip = function(msg){
			if($('tipToast')) {
				$('tipToast').remove();
			} 
			win.document.body.appendChild(createEl('tipToast', tip));
			if(msg) {
				$('toastValueInfo').innerHTML = msg
			}
			var s = 100;
			let tt = setInterval(function(){
				// console.log($('toastTip').style)
				// $('toastTip').style = 'opacity:' + (s/10) +'; z-index:999';
				// if(s <= 0) {
				// 	$('tipToast').remove();
				// 	clearInterval(tt);
				// }
				// s--;
				$('tipToast').remove();
				clearInterval(tt);
			}, 1500)
			
		},
		Vue.dialog = function(title, desc, fn, fn2) {
			if($('dialog')) {
				$('dialog').remove();
			} 
			win.document.body.appendChild(createEl('dialog', dialog));
			$('weuiDialogTitleDialog').innerHTML = title
			$('weuiDialogdescDialog').innerHTML = desc
			
			$('dialogEsc').onclick = function(){
				$('dialog').remove();
				if(fn) {
					fn();
				}
			}
			//取消按钮
			$('dialogSure').onclick = function(){
				$('dialog').remove();
				if(fn2) {
					fn2();
				}
			}
		}
	}

	if (typeof exports == 'object') {
	    module.exports = install
	} else if (typeof define == 'function' && define.amd) {
	    define([], function(){ return install })
	} else if (window.Vue) {
	    Vue.use(install)
	}
})(window)