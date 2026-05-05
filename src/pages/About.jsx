import { useContext } from 'react'
import { FirebaseContext } from '../context/firebase/FirebaseContext';
import Loader from '../components/Loader/Loader';


const CompletedPage = () => {
    const { loading, notes } = useContext(FirebaseContext)

    const completedNotes = notes.filter(note => note.completed)

    return (
        <div>
            <h2>Выполненные задачи</h2>
            {loading
                ? <Loader/>
                : completedNotes.length === 0
                    ? <p>Нет выполненных задач</p>
                    : completedNotes.map(note => (
                        <div key={note.id}>
                            <span style={{ textDecoration: 'line-through' }}>{note.title}</span>
                            <small> — выполнено: {new Date(note.completedDate).toLocaleString('ru-RU')}</small>
                        </div>
                    ))
            }
        </div>
    )
}

export default CompletedPage;