type SubscribeCallback = <T>(value: T) => void;

type ObserverInstance = {
    notify: SubscribeCallback;
};

export type SubjectInstance<T> = {
    subscribe: (callback: SubscribeCallback) => void;
    notify: (value: T) => void; 
}

/**
 * Holds reference to the value emitted and all observers
 * @returns 
 */
export const createSubject = <T>(initial: T | null = null): SubjectInstance<T> => {
    let current = initial;
    let observers: ObserverInstance[] = [];

    return {
        /**
         * Adds an observer to the all observers array
         * 
         * @param observer 
         */
        subscribe: (callback: SubscribeCallback) => {
            const observer = createObserver<T>(callback);
            observers = [...observers, observer];

            if(current) {
                observer.notify(current);
            }
        },

        /**
         * Notifies all observers
         */
        notify: (value: T) => {
            current = value;
            observers.forEach(obs => obs.notify(value))
        }
    }
}

const createObserver = <T>(callback: SubscribeCallback): ObserverInstance => {
    return {
        notify: callback
    }
}