export function getBase64(file){
    let image= ""
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve,reject)=>{
      reader.onload=function(res){
          const {target} = res;
          resolve(target.result)
      }
      reader.onerror=function(error){
          reject(error);
      }
    })
    
}