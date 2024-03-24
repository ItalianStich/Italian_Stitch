import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase"

const initialState = {
    isLoading: false,
    reviews: [],
    erroe: null
}

export const addReview = createAsyncThunk(
    'reviews/add',
    async (data) => {
        console.log(data);
        try {
            const docRef = await addDoc(collection(db, "reviews"), data);
            console.log("add review", docRef.id)

            return ({ ...data, id: docRef.id })
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const getReview = createAsyncThunk(
    'reviews/get',
    async (data) => {
        try {
            const querySnapshot = await getDocs(collection(db, "reviews"));
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });

            return data
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const updateReview = createAsyncThunk(
    'reviews/update',
    async (data) => {
        try {
            console.log('update data', data);

            const washingtonRef = doc(db, 'reviews', data.id)

            const reviewData = { ...data, id: data.id }
            delete reviewData.id

            await updateDoc(washingtonRef, reviewData)
            return data
        } catch (error) {
            console.log(error.message);
        }
    }
)

export const deleteReview = createAsyncThunk(
    'reviews/delete',
    async (id) => {
        await deleteDoc(doc(db, 'reviews', id))
        return id
    }
)

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addReview.fulfilled, (state, action) => {
            state.reviews = state.reviews.concat(action.payload)
        })

        builder.addCase(getReview.fulfilled, (state, action) => {
            state.reviews = action.payload
        })

        builder.addCase(updateReview.fulfilled, (state, action) => {
            state.reviews = state.reviews.map((review) => review.id === action.payload.id ? action.payload : review)
        })

        builder.addCase(deleteReview.fulfilled, (state, action) => {
            state.reviews = state.reviews.filter((review) => review.id !== action.payload)
        })
    }
})

export default reviewsSlice;