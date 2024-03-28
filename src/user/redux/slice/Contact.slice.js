import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

let initState = {
    contact: [],
    loading: false,
    error: null
}

const onLoading = (state, action) => {
    state.loading = false;
    state.error = null;
}

const onError = (state, action) => {
    state.loading = false;
    state.error = action.error.message;
}

export const getContact = createAsyncThunk(
    'contact/get',
    async () => {
        try {
            const data = []
            const querySnapshot = await getDocs(collection(db, "contact"));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.log(error);
        }
    }
);

export const addNewContact = createAsyncThunk(
    'contact/add',
    async (data) => {
        console.log(data)
        try {
            const newContactRef = doc(collection(db, 'contact'));

            await setDoc(newContactRef, {
                name: data.name,
                email: data.email,
                subject: data.subject,
                number: data.number,
                message: data.message
            });

            return {
                id: newContactRef.id,
                ...data
            };
        } catch (e) {
            console.error("Error adding document: ", e);
            throw e;
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contact/delete',
    async (id) => {
        try {
            await deleteDoc(doc(db, "contact", id));
            return id;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
)

export const contactSlice = createSlice({
    name: 'contact',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getContact.pending, (state, action) => {  // Change here
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getContact.fulfilled, (state, action) => {
            state.contact = action.payload;
            state.loading = false;  // Change here
            state.error = null;
        });
        builder.addCase(getContact.rejected, onError);
        builder.addCase(addNewContact.pending, onLoading);
        builder.addCase(addNewContact.fulfilled, (state, action) => {
            state.contact.push(action.payload);
        });
        builder.addCase(addNewContact.rejected, onError);

        builder.addCase(deleteContact.pending, onLoading);
        builder.addCase(deleteContact.fulfilled, (state, action) => {
            state.contact = state.contact.filter((v) => v.id !== action.payload);
        });
    }
});

export default contactSlice.reducer;