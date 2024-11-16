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
type EventName = 'mousemove' | 'click'

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
    return (name: EventName, callback: EventCallback) => {
        switch (name) {
            case 'mousemove':
                onMove(wrapper, callback)
            case 'click':
                onClick(wrapper, callback)
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