"use strict";!function(e){e.weui={version:"0.3.0"},e.noop=e.noop||function(){}}($),function(e){var i=null;e.weui.dialog=function(n){n=e.extend({title:"标题",content:"内容",className:"",buttons:[{label:"确定",type:"primary",onClick:e.noop}]},n);var a=n.buttons.map(function(e){return'<a href="javascript:;" class="weui_btn_dialog '+e.type+'">'+e.label+"</a>"}).join("\n"),t='<div class="'+n.className+'">\n                <div class="weui_mask"></div>\n                <div class="weui_dialog">\n                    <div class="weui_dialog_hd">\n                        <strong class="weui_dialog_title">\n                            '+n.title+'\n                        </strong>\n                    </div>\n                    <div class="weui_dialog_bd">\n                        '+n.content+'\n                    </div>\n                    <div class="weui_dialog_ft">\n                        '+a+"\n                    </div>\n                </div>\n            </div>";i=e(t),e("body").append(i),i.on("click",".weui_btn_dialog",function(){var i=n.buttons[e(this).index()],a=i.onClick||e.noop;a.call(),e.weui.closeDialog()})},e.weui.closeDialog=function(){i&&(i.off("click"),"function"==typeof i.fadeOut?i.fadeOut("fast",function(){i.remove(),i=null}):(i.remove(),i=null))}}($),function(e){e.weui.alert=function(i,n,a){var t="function"==typeof n;t&&(a=n),n=e.extend({title:"警告",content:i||"警告内容",className:"",buttons:[{label:"确定",type:"primary",onClick:a}]},t?{}:n),n.className="weui_dialog_alert "+n.className,e.weui.dialog(n)}}($),function(e){var i=null,n=null;e.weui.topTips=function(){var a=arguments.length<=0||void 0===arguments[0]?"topTips":arguments[0],t=arguments[1];i&&(i.remove(),n&&clearTimeout(n),i=null),"number"==typeof t&&(t={duration:t}),"function"==typeof t&&(t={callback:t}),t=e.extend({duration:3e3,callback:e.noop},t);var o='<div class="weui_toptips weui_warn">'+a+"</div>";i=e(o),i.appendTo(e("body")),"function"==typeof i.slideDown?i.slideDown(20):i.show(),n=setTimeout(function(){i&&("function"==typeof i.slideUp?i.slideUp(120,function(){i.remove(),i=null,t.callback()}):(i.remove(),i=null,t.callback()))},t.duration)}}($),function(e){var i=null;e.weui.actionSheet=function(){var n=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],a=arguments.length<=1||void 0===arguments[1]?[{label:"取消"}]:arguments[1],t=n.map(function(e,i){return'<div class="weui_actionsheet_cell">'+e.label+"</div>"}).join(""),o=a.map(function(e,i){return'<div class="weui_actionsheet_cell">'+e.label+"</div>"}).join(""),l='<div>\n            <div class="weui_mask_transition"></div>\n            <div class="weui_actionsheet">\n                <div class="weui_actionsheet_menu">\n                    '+t+'\n                </div>\n                <div class="weui_actionsheet_action">\n                    '+o+"\n                </div>\n            </div>\n        </div>";i=e(l),e("body").append(i),i.find(".weui_mask_transition").show().addClass("weui_fade_toggle"),i.find(".weui_actionsheet").addClass("weui_actionsheet_toggle"),i.on("click",".weui_actionsheet_menu .weui_actionsheet_cell",function(){var i=n[e(this).index()],a=i.onClick||e.noop;a.call(),e.weui.hideActionSheet()}).on("click",".weui_mask_transition",function(){e.weui.hideActionSheet()}).on("click",".weui_actionsheet_action .weui_actionsheet_cell",function(){var i=a[e(this).index()],n=i.onClick||e.noop;n.call(),e.weui.hideActionSheet()})},e.weui.hideActionSheet=function(){if(i){var e=i.find(".weui_mask_transition"),n=i.find(".weui_actionsheet");e.removeClass("weui_fade_toggle"),n.removeClass("weui_actionsheet_toggle"),n.on("transitionend",function(){i.remove(),i=null}).on("webkitTransitionEnd",function(){i.remove(),i=null})}}}($),function(e){e.weui.confirm=function(i,n,a,t){var o="function"==typeof n;o&&(t=a,a=n),n=e.extend({title:"确认",content:i||"确认内容",className:"",buttons:[{label:"取消",type:"default",onClick:t||e.noop},{label:"确定",type:"primary",onClick:a||e.noop}]},o?{}:n),n.className="weui_dialog_confirm "+n.className,e.weui.dialog(n)}}($),function(){function e(e){var i=e[0],n=e.val();if("INPUT"==i.tagName||"TEXTAREA"==i.tagName){var a=i.getAttribute("required")||i.getAttribute("pattern")||"";return e.val().length?a?new RegExp(a).test(n)?null:"notMatch":null:"empty"}return"checkbox"==i.getAttribute("type")||"radio"==i.getAttribute("type")?i.checked?null:"empty":n.length?null:"empty"}function i(e){if(e){var i=e.$dom,n=e.msg,a=i.attr(n+"Tips")||i.attr("tips")||i.attr("placeholder");a&&$.weui.topTips(a),i.parents(".weui_cell").addClass("weui_cell_warn")}}var n=$.fn.form;$.fn.form=function(){return this.each(function(n,a){var t=$(a);t.find("[required]").on("blur",function(){var n,a=$(this);a.val().length<1||(n=e(a),n&&i({$dom:a,msg:n}))}).on("focus",function(){var e=$(this);e.parents(".weui_cell").removeClass("weui_cell_warn")})})},$.fn.form.noConflict=function(){return n};var a=$.fn.validate;$.fn.validate=function(n){return this.each(function(){var a=$(this).find("[required]");"function"!=typeof n&&(n=i);for(var t=0,o=a.length;t<o;++t){var l=a.eq(t),u=e(l),s={$dom:l,msg:u};if(u)return void(n(s)||i(s))}n(null)})},$.fn.validate.noConflict=function(){return a}}(),function(e){var i=null;e.weui.loading=function(){var n=arguments.length<=0||void 0===arguments[0]?"loading...":arguments[0],a='<div class="weui_loading_toast">\n        <div class="weui_mask_transparent"></div>\n        <div class="weui_toast">\n            <div class="weui_loading">\n                <div class="weui_loading_leaf weui_loading_leaf_0"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_1"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_2"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_3"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_4"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_5"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_6"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_7"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_8"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_9"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_10"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_11"></div>\n            </div>\n            <p class="weui_toast_content">'+n+"</p>\n        </div>\n    </div>";i=e(a),e("body").append(i)},e.weui.hideLoading=function(){i&&i.remove(),i=null}}($),function(e){e.fn.progress=function(i){var n=this;i=e.extend({value:0},i),i.value<0&&(i.value=0),i.value>100&&(i.value=100);var a=this.find(".weui_progress_inner_bar");if(0===a.length){var t="function"==typeof i.onClick?'<a href="javascript:;" class="weui_progress_opr">\n                    <i class="weui_icon_cancel"></i>\n                </a>':"",o='<div class="weui_progress">\n                <div class="weui_progress_bar">\n                    <div class="weui_progress_inner_bar" style="width: '+i.value+'%;"></div>\n                </div>\n                '+t+"\n            </div>";return"function"==typeof i.onClick&&this.on("click",".weui_progress_opr",function(){i.onClick.call(n)}),this.html(o)}return a.width(i.value+"%")}}($),function(e){e.fn.searchBar=function(i){function n(i,n,a){if("function"==typeof a[n]){var t=e(i).val();a[n].call(i,t)}}i=e.extend({focusingClass:"weui_search_focusing",searchText:"搜索",cancelText:"取消"},i);var a='<div class="weui_search_bar">\n                    <form class="weui_search_outer">\n                        <div class="weui_search_inner">\n                            <i class="weui_icon_search"></i>\n                            <input type="search" class="weui_search_input" id="weui_search_input" placeholder="'+i.searchText+'" required/>\n                            <a href="javascript:" class="weui_icon_clear"></a>\n                        </div>\n                        <label for="weui_search_input" class="weui_search_text">\n                            <i class="weui_icon_search"></i>\n                            <span>'+i.searchText+'</span>\n                        </label>\n                    </form>\n                    <a href="javascript:" class="weui_search_cancel">'+i.cancelText+"</a>\n                </div>",t=e(a);this.append(t);var o=this.find(".weui_search_bar"),l=this.find(".weui_search_text"),u=this.find(".weui_search_input");this.on("focus","#weui_search_input",function(){l.hide(),o.addClass(i.focusingClass),n(u,"onfocus",i)}).on("blur","#weui_search_input",function(){o.removeClass(i.focusingClass),e(this).val()?l.hide():l.show(),n(u,"onblur",i)}).on("touchend",".weui_search_cancel",function(){u.val(""),n(u,"oncancel",i)}).on("touchend",".weui_icon_clear",function(e){e.preventDefault(),u.val(""),"search_input"!=document.activeElement.id&&u.trigger("focus"),n(u,"onclear",i)}).on("input",".weui_search_input",function(){n(u,"input",i)}).on("submit",".weui_search_outer",function(){if("function"==typeof i.onsubmit)return n(u,"onsubmit",i),!1})}}($),function(e){var i=e.fn.tab;e.fn.tab=function(i){i=e.extend({defaultIndex:0,activeClass:"weui_bar_item_on",onToggle:e.noop},i);var n=this.find(".weui_tabbar_item, .weui_navbar_item"),a=this.find(".weui_tab_bd_item");this.toggle=function(e){var t=n.eq(e);t.addClass(i.activeClass).siblings().removeClass(i.activeClass);var o=a.eq(e);o.show().siblings().hide(),i.onToggle(e)};var t=this;return this.on("click",".weui_tabbar_item, .weui_navbar_item",function(i){var n=e(this).index();t.toggle(n)}),this.toggle(i.defaultIndex),this},e.fn.tab.noConflict=function(){return i}}($),function(e){e.weui.toast=function(){var i=arguments.length<=0||void 0===arguments[0]?"toast":arguments[0],n=arguments[1];"number"==typeof n&&(n={duration:n}),"function"==typeof n&&(n={callback:n}),n=e.extend({duration:3e3,callback:e.noop},n);var a='<div>\n            <div class="weui_mask_transparent"></div>\n            <div class="weui_toast">\n                <i class="weui_icon_toast"></i>\n                <p class="weui_toast_content">'+i+"</p>\n            </div>\n        </div>",t=e(a);e("body").append(t),setTimeout(function(){t.remove(),t=null,n.callback()},n.duration)}}($),function(e){var i=e.fn.uploader;e.fn.uploader=function(i){function n(e){for(var i=atob(e.split(",")[1]),n=e.split(",")[0].split(":")[1].split(";")[0],a=new ArrayBuffer(i.length),t=new Uint8Array(a),o=0;o<i.length;o++)t[o]=i.charCodeAt(o);return new Blob([a],{type:n})}function a(e){var i=c.find(".weui_uploader_file").eq(e);i.addClass("weui_uploader_status"),i.html('<div class="weui_uploader_status_content"><i class="weui_icon_warn"></i></div>')}function t(e){var i=c.find(".weui_uploader_file").eq(e);i.removeClass("weui_uploader_status"),i.html("")}function o(n,o){var l=new FormData;l.append(i.field,n.blob,n.name),e.ajax({type:i.method,url:i.url,data:l,processData:!1,contentType:!1}).success(function(e){t(o),i.onSuccess(e)}).error(function(e){a(o),i.onError(e)}).always(function(){i.onComplete()})}var l=this;i=e.extend({title:"图片上传",maxCount:4,compress:!0,maxWidth:500,auto:!0,field:"file",url:"/upload.php",method:"POST",accept:["image/jpg","image/jpeg","image/png","image/gif"],headers:{},onChange:e.noop,onAddedFile:e.noop,onRemovedfile:e.noop,onError:e.noop,onSuccess:e.noop,onComplete:e.noop},i);var u='<div class="weui_uploader">\n                        <div class="weui_uploader_hd weui_cell">\n                            <div class="weui_cell_bd weui_cell_primary">'+i.title+'</div>\n                            <div class="weui_cell_ft">0/'+i.maxCount+'</div>\n                        </div>\n                        <div class="weui_uploader_bd">\n                            <ul class="weui_uploader_files">\n                            </ul>\n                            <div class="weui_uploader_input_wrp">\n                                <input class="weui_uploader_input" type="file" accept="'+i.accept.join(",")+'">\n                            </div>\n                        </div>\n                    </div>';this.html(u);var s=this,c=this.find(".weui_uploader_files"),d=this.find(".weui_uploader_input"),r=[];return d.on("change",function(a){var t=a.target.files;0!==t.length&&(r.length>=i.maxCount||e.each(t,function(e,a){var t=new FileReader;t.onload=function(e){var t=new Image;t.onload=function(){var e=i.compress?Math.min(i.maxWidth,t.width):t.width,l=t.height*(e/t.width),u=document.createElement("canvas"),d=u.getContext("2d");u.width=e,u.height=l;var _=navigator.userAgent.match(/iPhone OS ([^\s]*)/);_&&7==_[1].substr(0,1)&&3264==t.width&&2448==t.height?d.drawImage(t,0,0,e,2*l):d.drawImage(t,0,0,e,l);var f=u.toDataURL(),v=n(f);r.push({name:a.name,blob:v});var w=URL.createObjectURL(v);c.append('<li class="weui_uploader_file " style="background-image:url('+w+')"></li>'),s.find(".weui_uploader_hd .weui_cell_ft").text(r.length+"/"+i.maxCount),i.onAddedFile({lastModified:a.lastModified,lastModifiedDate:a.lastModifiedDate,name:a.name,size:a.size,type:a.type,data:f,dataURL:f}),i.auto&&o({name:a.name,blob:v},r.length-1),r.length>=i.maxCount&&s.find(".weui_uploader_input_wrp").hide()},t.src=e.target.result},t.readAsDataURL(a)}))}),this.on("click",".weui_uploader_file",function(){e.weui.confirm("确定删除该图片?",function(){var i=e(l).index();l.remove(i)})}),this.upload=function(){r.map(o)},this.remove=function(e){var n=c.find(".weui_uploader_file").eq(e);n.remove(),r.splice(e,1),i.onRemovedfile(e),r.length<i.maxCount&&s.find(".weui_uploader_input_wrp").show()},this},e.fn.uploader.noConflict=function(){return i}}($);