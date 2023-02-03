

let initialState = {bool:false,id:""}

const reducer = (state = initialState,action) =>{
   if(action.type === "changeOptionsState"){
       return action.payload
   }

   else{
       return state
   }
}

export default reducer