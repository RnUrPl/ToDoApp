import React from 'react';
import { useContext } from 'react';
import {CSSTransition} from 'react-transition-group'
import { AlertContext } from '../../context/alert/alertContext';
import './Alert.scss'


const Alert = () => {
    const {alert} = useContext(AlertContext)

    return (
        <CSSTransition
        in={alert.visible}
        timeout={750}
        classNames={'alert'}
        mountOnEnter
        unmountOnExit>
        <div className= {`alert alert-${alert.type || 'warning'} alert-dismissible `} >
            {alert.text}
          
        </div>
        </CSSTransition>
    );
};

export default Alert;