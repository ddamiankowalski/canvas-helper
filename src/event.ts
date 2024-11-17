import { createSubject } from "./subject.js";

/**
 * Event object
 */
type ExtendedEvent = Event;

/**
 * Callback for the event
 */
type EventCallback = (event: ExtendedEvent) => void

/**
 * Name of the event
 */
type EventName = 'mousemove' | 'click' | 'keydown'

/**
 * Create event object that is used to listen 
 */
export const createEvent = (wrapper: HTMLElement) => {
    return { on: registerListener(wrapper) };
}

/**
 * Registers a listener for an event
 * 
 * @param name 
 * @param callback 
 */
const registerListener = (wrapper: HTMLElement) => {
    const subject = createSubject('initial value');
    
    subject.subscribe(s => {
        console.log(s);
    })

    setTimeout(() => {
        subject.notify('test value')
    }, 3000)

    return (name: EventName, callback: EventCallback) => {
        switch (name) {
            case 'mousemove':
                onMove(wrapper, callback)
            case 'click':
                onClick(wrapper, callback)
            case 'keydown':
                onKeydown(callback);
        }
    }
}

/**
 * On move callback
 * 
 * @param wrapper 
 * @param callback 
 */
const onMove = (wrapper: HTMLElement, callback: EventCallback) => {
    wrapper.addEventListener('mousemove', callback)
}

/**
 * On click callback
 * 
 * @param wrapper 
 * @param callback 
 */
const onClick = (wrapper: HTMLElement, callback: EventCallback) => {
    wrapper.addEventListener('click', callback)
}

/**
 * On key down callback
 */
const onKeydown = (callback: EventCallback) => {
    const pressed = new Set();

    document.addEventListener('keydown', ev => {
        ev.preventDefault();
        callback(ev);
    });

    document
}