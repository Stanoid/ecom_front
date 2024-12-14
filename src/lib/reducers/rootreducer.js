import { combineReducers } from 'redux'
import * as types from '../types'


const initialAuthState = {
  data: null,
}
const authReducer = (state = initialAuthState, { type, payload }) => {
  switch (type) {
    case types.LOGIN:
      return {
        data: payload,
      }
      break;

      case types.LOGOUT:
        return {
          data: null,
        }
        break;

      
    default:
      return state
  }
}
const initialCartState = {
  data: [],
}
const cartReducer = (state = initialCartState, { type, payload }) => {
  switch (type) {
    case types.ADDTOCART:

    

      return {
        data: payload,
      }
      break;

      case types.REMOVEFROMCART:
        return {
          data: payload,
        }
        break;

        case types.CLEARCART:
          return {
            data: payload,
          }
          break;

          case types.INCREMENT:
            return {
              data: payload,
            }
            break;


            case types.DECREMENT:
              return {
                data: payload,
              }
              break;

      
    default:
      return state
  }
}

const removerFunc = (sts,id)=>{
  const oldcart = sts.data; //????
  let arr = oldcart
  //  arr  = arr.slice(id+1)
  return arr = arr.slice(0, id).concat(arr.slice(id+1)) 
  
  }

const adderFunc = (sts,pld)=>{

//console.log(typeof(sts));

let carr = sts.data;
let nnccr = carr
console.log([...sts.data])
return sts.data
}


// COMBINED REDUCERS
const reducers = {
auth:authReducer,
cart:cartReducer
}

export default combineReducers(reducers)
