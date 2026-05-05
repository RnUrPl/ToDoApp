import React, { useCallback } from "react";
import { useReducer } from "react";
import axios from 'axios'
import { FirebaseContext } from "./FirebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import { ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER, COMPLETE_NOTE } from "../types";

const url  = process.env.REACT_APP_DB_URL

export const FirebaseState =({children}) => {

    const initialState = {
        notes: [],
        loading: false
    }

    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    const showLoader = () => dispatch({type: SHOW_LOADER})

   const fetchNotes = useCallback(async () => {
        showLoader()
        const res = await axios.get(`${url}/notes.json`)

        const  payload= Object.keys(res.data || {}).map(key =>{
            return{
                ...res.data[key],
                id:key
            }
        })

        dispatch({
            type: FETCH_NOTES, 
            payload
        })
  }, []) 

    const addNote = async title =>{
        const note ={
            title, date: new Date().toLocaleString('ru-RU'),completed: false
        }
        try{
            const res = await axios.post( `${url}/notes.json`,note)

            const payload = {
                ...note, 
                id: res.data.name
            }

            dispatch({
                type: ADD_NOTE,
                payload
            })
        }catch(e){
            throw new Error(e.message)
        }        
    }

    const removeNote = async id => {
        await axios.delete(`${url}/notes/${id}/.json`)

        dispatch({
            type: REMOVE_NOTE,
            payload: id
        })
    }

     const completeNote = async id => {
        const completedDate = new Date().toJSON()
        await axios.patch(`${url}/notes/${id}.json`, { completed: true, completedDate })
        dispatch({ type: COMPLETE_NOTE, payload: { id, completedDate } })
    }
    
    return (
        <FirebaseContext.Provider value={{
            showLoader, addNote, removeNote, fetchNotes, completeNote,
            loading: state.loading,
            notes: state.notes
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}