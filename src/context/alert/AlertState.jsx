import React from "react";
import { useReducer } from "react";
import { HIDE_ALERT, SHOW_ALERT } from "../types";
import { AlertContext } from "./alertContext";
import { AlertRedicer } from "./alertReducer";

export const AlertState = ({children}) =>{
    const [state, disptach] = useReducer(AlertRedicer, {visible: false})

    const show = (text, type  = "warning") =>{
        disptach({
            type: SHOW_ALERT,
            payload: {text, type}
        })

        setTimeout(() => {
            disptach({ type: HIDE_ALERT })
        }, 3050)
    }

    const hide = () => disptach({
        type: HIDE_ALERT
    })

    return(
        <AlertContext.Provider value ={{
            show, hide, alert: state
        }}>
            {children}
        </AlertContext.Provider>
    )
}