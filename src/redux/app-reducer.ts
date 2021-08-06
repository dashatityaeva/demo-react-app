import { getAuthUserData } from "./auth-reducer";
import { InferActionsTypes } from "./redux-store";

let initialState = {
    initialized: false,
};

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'app/INITIALIZED_SUCCESS': 
            return {...state, 
                initialized: true
            };
        default:
            return state;;
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'app/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
    let dispatchResult =  dispatch(getAuthUserData());
    dispatchResult.then(()=> {
        dispatch(actions.initializedSuccess())
    })
}

export default appReducer;