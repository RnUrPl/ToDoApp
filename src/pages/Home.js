import React, { Fragment, useContext, useEffect } from 'react';
import Form from '../components/Form/Form';
import Loader from '../components/Loader/Loader';
import Notes from '../components/Notes/Notes';
import { FirebaseContext } from '../context/firebase/FirebaseContext';
import { AlertContext } from '../context/alert/alertContext';

const Home = () => {

    const {loading, notes, fetchNotes,removeNote, completeNote} = useContext(FirebaseContext)
    const alert = useContext(AlertContext)

    useEffect(() => {
        fetchNotes()
    },[])

    const activeNotes = notes.filter(note => !note.completed)

    const handleComplete = (id) => {
        completeNote(id)
        alert.show('Заметка выполнена!', 'success')
    }

    const handleRemove = (id) => {
        removeNote(id)
        alert.show('Заметка удалена!', 'success')
    }

    return (
        <div className='container'>
            <Form/> 
            <hr/>

            {loading
                ?<Loader/>
                :<Notes notes={activeNotes} onRemove={handleRemove} onComplete={handleComplete}/>
            }
        </div>
    );
};

export default Home;