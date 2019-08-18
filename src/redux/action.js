export const ACTION_RECOVER_DATA = "RECOVER_DATA"

export function recoverState(data){
    return (disapth)=>{
          if(data){
              disapth({
                  type:ACTION_RECOVER_DATA,
                  payload:data
              })
          }else{
              return Promise.resolve();
          }
    }
}