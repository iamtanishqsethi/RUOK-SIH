import {createSlice} from "@reduxjs/toolkit";
export enum UserType {
    Student = "student",
    Therapist = "therapist",
    Admin = "admin"
}

const configSlice = createSlice({
    name:'config',
    initialState: {
        isBlocked:false,
        userType:UserType.Student,
    },
    reducers: {
        setIsBlocked: (state, action) => {
            state.isBlocked = action.payload;
        },
        setUserType: (state, action) => {
            state.userType = action.payload;
        }
    }
})
export const {setIsBlocked,setUserType} = configSlice.actions;
export default configSlice.reducer;