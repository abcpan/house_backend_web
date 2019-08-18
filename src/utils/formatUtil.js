export function queryParser(search){
    let query ={}
    let str = search.replace("?","");
    let key_values = str.split("&");
    for(const kv_item of key_values){
          let  kv_arr = kv_item.split("=")
          query[kv_arr[0]] = kv_arr[1];
    }
    return query;
}

export const findLabel=(value,options)=>{
  let option = options.find(_=>_.value===value);
  return option?option.label:""
}

export function findLabelList(values,options,pattern){
    let list = values.map(value=>{
        let option = options.find(item=>item.value===value);
        return option?option.label:""
    })
    if(pattern !==undefined){
        return list.join(pattern)
    }
    return list;
}