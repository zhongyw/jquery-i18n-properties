(function(m){function u(b){b.async&&(b.filesLoaded+=1,b.filesLoaded===b.totalFiles&&b.callback&&b.callback())}function q(b,a){m.ajax({url:b,async:a.async,cache:a.cache,dataType:"text",success:function(b,c){v(b,a.mode);u(a)},error:function(e,c,d){console.log("Failed to download or parse "+b);u(a)}})}function v(b,a){for(var e="",c=b.split(/\n/),d=/(\{\d+})/g,f=/\{(\d+)}/g,h=/(\\u.{4})/ig,g=0;g<c.length;g++)if(c[g]=c[g].replace(/^\s\s*/,"").replace(/\s\s*$/,""),0<c[g].length&&"#"!=c[g].match("^#")){var k=
c[g].split("=");if(0<k.length){for(var r=decodeURI(k[0]).replace(/^\s\s*/,"").replace(/\s\s*$/,""),l=1==k.length?"":k[1];"\\"==l.match(/\\$/);)l=l.substring(0,l.length-1),l+=c[++g].replace(/\s\s*$/,"");for(var p=2;p<k.length;p++)l+="="+k[p];l=l.replace(/^\s\s*/,"").replace(/\s\s*$/,"");if("map"==a||"both"==a){if(k=l.match(h))for(p=0;p<k.length;p++)l=l.replace(k[p],w(k[p]));m.i18n.map[r]=l}if("vars"==a||"both"==a)if(l=l.replace(/"/g,'\\"'),x(r),d.test(l)){for(var k=l.split(d),p=!0,n="",q=[],t=0;t<
k.length;t++)!d.test(k[t])||0!=q.length&&-1!=q.indexOf(k[t])||(p||(n+=","),n+=k[t].replace(f,"v$1"),q.push(k[t]),p=!1);e+=r+"=function("+n+"){";r='"'+l.replace(f,'"+v$1+"')+'"';e+="return "+r+";};"}else e+=r+'="'+l+'";'}}eval(e)}function x(b){if(/\./.test(b)){var a="";b=b.split(/\./);for(var e=0;e<b.length;e++)0<e&&(a+="."),a+=b[e],eval("typeof "+a+' == "undefined"')&&eval(a+"={};")}}function w(b){var a=[];b=parseInt(b.substr(2),16);0<=b&&b<Math.pow(2,16)&&a.push(b);b="";for(var e=0;e<a.length;++e)b+=
String.fromCharCode(a[e]);return b}m.i18n={};m.i18n.map={};m.i18n.properties=function(b){b=m.extend({map:null,name:"Messages",language:"",path:"",mode:"vars",cache:!1,encoding:"UTF-8",async:!1,checkAvailableLanguages:!1,callback:null},b);if(b.map)m.i18n.map=b.map;else{b.language=this.normaliseLanguageCode(b.language);var a=function(a){b.totalFiles=0;b.filesLoaded=0;var c;c=(c=b.name)&&c.constructor==Array?c:[c];if(b.async)for(var d=0,f=c.length;d<f;d++){b.totalFiles+=1;var h=b.language.substring(0,
2);if(0==a.length||-1!=m.inArray(h,a))b.totalFiles+=1;5<=b.language.length&&(h=b.language.substring(0,5),0==a.length||-1!=m.inArray(h,a))&&(b.totalFiles+=1)}d=0;for(f=c.length;d<f;d++)q(b.path+c[d]+".properties",b),h=b.language.substring(0,2),0!=a.length&&-1==m.inArray(h,a)||q(b.path+c[d]+"_"+h+".properties",b),5<=b.language.length&&(h=b.language.substring(0,5),0!=a.length&&-1==m.inArray(h,a)||q(b.path+c[d]+"_"+h+".properties",b));b.callback&&!b.async&&b.callback()};b.checkAvailableLanguages?m.ajax({url:b.path+
"languages.json",async:b.async,cache:!1,success:function(b,c,d){a(b.languages||[])}}):a([])}};m.i18n.prop=function(b){var a=m.i18n.map[b];if(null==a)return"["+b+"]";var e;2==arguments.length&&m.isArray(arguments[1])&&(e=arguments[1]);var c;if("string"==typeof a){for(c=0;-1!=(c=a.indexOf("\\",c));)a="t"==a.charAt(c+1)?a.substring(0,c)+"\t"+a.substring(c++ +2):"r"==a.charAt(c+1)?a.substring(0,c)+"\r"+a.substring(c++ +2):"n"==a.charAt(c+1)?a.substring(0,c)+"\n"+a.substring(c++ +2):"f"==a.charAt(c+1)?
a.substring(0,c)+"\f"+a.substring(c++ +2):"\\"==a.charAt(c+1)?a.substring(0,c)+"\\"+a.substring(c++ +2):a.substring(0,c)+a.substring(c+1);var d=[],f,h;for(c=0;c<a.length;)if("'"==a.charAt(c))if(c==a.length-1)a=a.substring(0,c);else if("'"==a.charAt(c+1))a=a.substring(0,c)+a.substring(++c);else{for(f=c+2;-1!=(f=a.indexOf("'",f));)if(f==a.length-1||"'"!=a.charAt(f+1)){a=a.substring(0,c)+a.substring(c+1,f)+a.substring(f+1);c=f-1;break}else a=a.substring(0,f)+a.substring(++f);-1==f&&(a=a.substring(0,
c)+a.substring(c+1))}else"{"==a.charAt(c)?(f=a.indexOf("}",c+1),-1==f?c++:(h=parseInt(a.substring(c+1,f)),!isNaN(h)&&0<=h?(c=a.substring(0,c),""!=c&&d.push(c),d.push(h),c=0,a=a.substring(f+1)):c=f+1)):c++;""!=a&&d.push(a);a=d;m.i18n.map[b]=d}if(0==a.length)return"";if(1==a.length&&"string"==typeof a[0])return a[0];d="";for(c=0;c<a.length;c++)d="string"==typeof a[c]?d+a[c]:e&&a[c]<e.length?d+e[a[c]]:!e&&a[c]+1<arguments.length?d+arguments[a[c]+1]:d+("{"+a[c]+"}");return d};m.i18n.normaliseLanguageCode=
function(b){if(!b||2>b.length)b=navigator.languages?navigator.languages[0]:navigator.language||navigator.userLanguage||"en";b=b.toLowerCase();b=b.replace(/-/,"_");3<b.length&&(b=b.substring(0,3)+b.substring(3).toUpperCase());return b};var n;n||(n=function(b,a,e){if("[object RegExp]"!==Object.prototype.toString.call(a))return"undefined"==typeof n._nativeSplit?b.split(a,e):n._nativeSplit.call(b,a,e);var c=[],d=0,f=(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.sticky?"y":"");a=new RegExp(a.source,f+
"g");var h,g,k;b+="";n._compliantExecNpcg||(h=new RegExp("^"+a.source+"$(?!\\s)",f));if(void 0===e||0>+e)e=Infinity;else if(e=Math.floor(+e),!e)return[];for(;g=a.exec(b);){f=g.index+g[0].length;if(f>d&&(c.push(b.slice(d,g.index)),!n._compliantExecNpcg&&1<g.length&&g[0].replace(h,function(){for(var a=1;a<arguments.length-2;a++)void 0===arguments[a]&&(g[a]=void 0)}),1<g.length&&g.index<b.length&&Array.prototype.push.apply(c,g.slice(1)),k=g[0].length,d=f,c.length>=e))break;a.lastIndex===g.index&&a.lastIndex++}d===
b.length?!k&&a.test("")||c.push(""):c.push(b.slice(d));return c.length>e?c.slice(0,e):c},n._compliantExecNpcg=void 0===/()??/.exec("")[1],n._nativeSplit=String.prototype.split);String.prototype.split=function(b,a){return n(this,b,a)}})(jQuery);
