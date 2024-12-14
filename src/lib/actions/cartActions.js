import { store } from '../store';
import * as types from '../types'
const state = store.getState();


export const login =  (pld) => async (dispatch) =>{

dispatch({ type: types.LOGIN, payload: pld })

}



export const addToCart =  (pld) => async (dispatch,getState) =>{
const state = getState();
//console.log(state.root.cart.data)
//return



  let carr = state.root.cart.data;
var nnccr = JSON.parse(JSON.stringify(carr));
//return [] //hard reset

// console.log("nccr",nnccr);
// console.log("pld",pld)

const i = carr.findIndex(e => e.selvar==pld.selvar);
if (i > -1  ) {


  if(nnccr[i].selvar==pld.selvar){
    console.log("matched, increasing qty")
    nnccr[i].qty = nnccr[i].qty + pld.qty;
    dispatch({ type: types.ADDTOCART, payload: nnccr })
  }else{
    console.log("mismatched, adding new")
    const ncarr =  carr.concat(pld);
    dispatch({ type: types.ADDTOCART, payload: ncarr })
  }
}else{
  const ncarr =  carr.concat(pld);
  dispatch({ type: types.ADDTOCART, payload: ncarr })
}}

export const removeFromCart =  (pld) => async (dispatch,getState) =>{
const state = getState();


let carr = state.root.cart.data;
var nnccr = JSON.parse(JSON.stringify(carr));

for (let i = 0; i < nnccr.length; i++) {
 
  if(nnccr[i].selvar==pld.id ){
    nnccr.splice(i, 1);
  }
  
}
//console.log(nnccr)


  dispatch({ type: types.CLEARCART, payload: nnccr })


}

export const increment =  (pld) => async (dispatch,getState) =>{
  const state = getState();

    let carr = state.root.cart.data;
var nnccr = JSON.parse(JSON.stringify(carr));

const i = carr.findIndex(e => e.selvar==pld.id);
if (i > -1  ) {
 // console.log(nnccr[i]);

 if(nnccr[i].qty + 1 <= pld.stock ){
  nnccr[i].qty +=1;
  console.log(nnccr[i])
 }

}

    // console.log(state.root.cart.data);
    // console.log(pld);




      dispatch({ type: types.INCREMENT, payload: nnccr })
  
  
  
  } 


  export const decrement =  (pld) => async (dispatch,getState) =>{
    const state = getState();

    let carr = state.root.cart.data;
var nnccr = JSON.parse(JSON.stringify(carr));

const i = carr.findIndex(e => e.selvar==pld.id);
if (i > -1  ) {
 // console.log(nnccr[i]);

 if(nnccr[i].qty - 1 > 0 ){
  nnccr[i].qty -=1;
  console.log(nnccr[i])
 }

}

    // console.log(state.root.cart.data);
    // console.log(pld);




      dispatch({ type: types.DECREMENT, payload: nnccr })
    
    
    } 


export const clearCart =  (pld) => async (dispatch,getState) =>{
  const state = getState();
  
    dispatch({ type: types.REMOVEFROMCART, payload: [] })
  
  
  } 
// INCREMENT COUNTER BY 1
// export const incrementCount = () => ({ type: types.INCREMENT })

// // DECREMENT COUNTER BY 1
// export const decrementCount = () => ({ type: types.DECREMENT })

// RESET COUNTER
// export const logout = () => ({ type: types.LOGOUT })



export const logout =  () => async (dispatch) =>{
  //console.log(pld);
//revalidateTag("user")
 dispatch({ type: types.LOGOUT })




 
}