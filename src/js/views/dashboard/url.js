//url解析，返回对象{sp, dm, dz}
export default function url(param){
    let obj = {};
    let url = decodeURIComponent(param).slice(1);
    let urlArray = url.split("&&");
    for(var i = 0; i < urlArray.length; i++){
      let temp = urlArray[i].split('=');
      obj[temp[0]] = temp[1];
    }
    return obj;
}
