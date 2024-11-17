import { createSubject, SubjectInstance } from "./subject.js";

/**
 * Event object
 */
type ExtendedEvent = any;

/**
 * Name of the event
 */
type EventName = 'mousemove' | 'click' | 'key';

/**
 * Alias type for all subjects
 */
type AllSubjects = Map<EventName, SubjectInstance<ExtendedEvent>>;

/**
 * Create event object that is used to listen 
 */
export const createEvent = (wrapper: HTMLElement) => {
    const subjects = createSubjects(wrapper);

    return { 
        on: (
            name: EventName, 
            callback: (event: ExtendedEvent) => void
        ) => registerListener(name, callback, subjects)
    };
}

/**
 * Create all subjects for all possible events
 */
const createSubjects = (wrapper: HTMLElement) => {
    const subjects: AllSubjects = new Map();

    const events: EventName[] = ['mousemove', 'click', 'key'];
    events.forEach(name => createEventSubject(name, wrapper, subjects))

    return subjects;
}

/**
 * Creates a single subject and adds it to all subjects
 * 
 * @param name 
 * @param subjects 
 */
const createEventSubject = (name: EventName, wrapper: HTMLElement, subjects: AllSubjects) => {
    switch(name) {
        case 'click':
            subjects.set(name, addClickSubject(wrapper));
            break;
        case 'mousemove':
            subjects.set(name, addMoveSubject(wrapper));
            break;
        case 'key':
            subjects.set(name, addKeySubject())
    }
}

/**
 * Registers an "on" callback
 * 
 * @param subjects 
 * @returns 
 */
const registerListener = (name: EventName, callback: (event: ExtendedEvent) => void, subjects: AllSubjects) => {
    const subject = subjects.get(name);

    if(!subject) {
        throw new Error(`EVENT_ERROR: Could not get subject for event: ${name}`);
    }

    subject.subscribe((event: ExtendedEvent) => callback(event));
}

/**
 * Creates a click subject
 * 
 * @param wrapper 
 * @param subject 
 * @returns 
 */
const addClickSubject = (wrapper: HTMLElement) => {
    const subject = createSubject<ExtendedEvent>();
    wrapper.addEventListener('click', event => subject.notify(event));
    return subject;
}

/**
 * On move callback
 * 
 * @param wrapper 
 * @param callback 
 */
const addMoveSubject = (wrapper: HTMLElement) => {
    const subject = createSubject<ExtendedEvent>();
    wrapper.addEventListener('mousemove', event => subject.notify(event));
    return subject;
}

/**
 * On key down callback
 */
const addKeySubject = () => {
    const subject = createSubject<ExtendedEvent>();

    let pressed = new Set<string>();
    let interval: ReturnType<typeof setInterval> | null = null;

    document.addEventListener('keydown', event => {
        pressed.add(event.code);

        if(!interval) {
            interval = setInterval(() => subject.notify({ ...event, pressed }), 10);
        }
    });

    document.addEventListener('keyup', event => {
        pressed.delete(event.code);

        if(pressed.size === 0 && interval) {
            clearInterval(interval);
            interval = null;
        }
    });

    document.addEventListener('visibilitychange', () => {
        interval && clearInterval(interval);
        interval = null;
        pressed = new Set();
    })

    return subject;
}