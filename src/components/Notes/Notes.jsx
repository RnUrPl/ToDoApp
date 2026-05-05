import React from 'react';
import './Notes.scss'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import checkImg from './1687.png'



const Notes = ({notes,onRemove, onComplete}) => (
          <TransitionGroup component='ul' class="list-group">
            {notes.map(note =>
            <CSSTransition
            key = {note.id}
            classNames={'note'}
            timeout={700}
            >
                <li 
                className="list-group-item"
                key = {note.id}
                >
                <div>
                  <strong>{note.title}</strong>
                  <small className='span'>{note.date}</small>
                </div>
                <div className="button-fr">
                    <button 
                type="button" 
                 className="btn-open"
                onClick={() => onComplete(note.id)}
                ><img src={checkImg} alt='complete' style={{width: '18px', height: '18px', border: 'none'}}/></button>
                <button 
                type="button" 
                className="btn-close" 
                aria-label="Close"
                onClick={() => onRemove(note.id)}
                ></button>
                </div>
                </li>
              </CSSTransition>
            )}
          </TransitionGroup>

);

export default Notes;