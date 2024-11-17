import { createSubject, SubjectInstance } from "./subject.js";

/**
 * Event object
 */
type ExtendedEvent = any;

/**
 * Name of the event
 */
type EventName = 'mousemove' | 'click' | 'keydown';

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

    const events: EventName[] = ['mousemove', 'click', 'keydown'];
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
    const subject = createSubject<ExtendedEvent>();

    switch(name) {
        case 'click':
            subjects.set(name, addClickSubject(wrapper, subject));
            break;
        case 'mousemove':
            subjects.set(name, addMoveSubject(wrapper, subject));
            break;
        case 'keydown':
            subjects.set(name, addKeyDownSubject(subject))
    }

    console.log(subject)
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
const addClickSubject = (wrapper: HTMLElement, subject: SubjectInstance<ExtendedEvent>) => {
    wrapper.addEventListener('click', event => subject.notify(event));
    return subject;
}

/**
 * On move callback
 * 
 * @param wrapper 
 * @param callback 
 */
const addMoveSubject = (wrapper: HTMLElement, subject: SubjectInstance<ExtendedEvent>) => {
    wrapper.addEventListener('mousemove', event => subject.notify(event));
    return subject;
}

/**
 * On key down callback
 */
const addKeyDownSubject = (subject: SubjectInstance<ExtendedEvent>) => {
    document.addEventListener('keydown', event => subject.notify(event));
    return subject;
}