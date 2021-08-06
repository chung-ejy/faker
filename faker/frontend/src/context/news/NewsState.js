import { GET_CLASSIFICATION, SET_TITLE, SET_TEXT, SET_LOADING, STOP_LOADING, SET_ERROR, CLEAR_ERROR } from "./types";
import React, { useReducer } from "react";
import NewsContext from "./newsContext"
import newsReducer from "./newsReducer"
import axios from "axios"

const NewsState = props => {
    const initialState = {
        title: "News Classification",
        text: "Classifying Dat Dank News",
        classification: {},
        error:null,
        loading:false
    }

    const [state,dispatch] = useReducer(newsReducer,initialState)

    const setError = (msg,type) => {
        dispatch({
            type:SET_ERROR,
            payload: {msg,type}
        })
        setTimeout(()=> {
            clearError()
        },5000);
    }
    const clearError = () => {
        dispatch({
            type:CLEAR_ERROR
        });
    }

    const setLoading = () => {
        dispatch({
            type:SET_LOADING
        });
    }
    
    const stopLoading = () => {
        dispatch({
            type:STOP_LOADING
        });
    }

    const setTitle = (title) => {
        dispatch({
            type:SET_TITLE,
            payload: title
        });
    }

    const setText = (text) => {
        dispatch({
            type:SET_TEXT,
            payload: text
        });
    }

    const getClassification = (data) => {
        setLoading()
        axios.post(`/api/`,data).then(res=>{
            dispatch({
                type:GET_CLASSIFICATION,
                payload:res.data
            })
        }).catch(err => {
            stopLoading()
            setError(err.message,"danger")
        });
    }

    return (
        <NewsContext.Provider value={{
            classification:state.classification,
            loading:state.loading,
            error:state.error,
            title:state.title,
            text:state.text,
            setError,
            setTitle,
            setText,
            getClassification
        }}>
            {props.children}
        </NewsContext.Provider>
    )
}
export default NewsState;