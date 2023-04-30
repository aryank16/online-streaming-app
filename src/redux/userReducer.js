import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name:'',
    email:'',
    photo:''
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signIn:(state,action) =>{
            state.name=action.payload.name;
            state.email = action.payload.email;
            state.photo = action.payload.photo;
        },
        signOut:(state)=>{
            state.name = null;
            state.email=  null;
            state.photo = null;
        }
    }
})

export const {signIn,signOut } = userSlice.actions;
export default userSlice.reducer;
