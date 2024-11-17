import { createEvent } from './../src/event';
describe('event', () => {
    let wrapper: HTMLElement;

    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();

        wrapper = document.createElement('div');
    })

    it('successfully initializes event', () => {
        const event = createEvent(wrapper);
        expect(event).toBeTruthy();
    })

    it('registering an event for non-existing name throws an error', () => {
        const event = createEvent(wrapper);

        // @ts-ignore
        expect(() => event.on('non-existing')).toThrow();
    })

    it('registers "on" callback successfully', () => {
        const event = createEvent(wrapper);
        const spy = jest.fn();

        expect(() => event.on('click', () => spy())).not.toThrow()
        expect(spy).not.toHaveBeenCalled();
    })

    it('click event is triggered successfully', () => {
        const event = createEvent(wrapper);
        const spy = jest.fn();

        event.on('click', () => spy());
        wrapper.click();
        
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it('mouse move event is triggered successfully', () => {
        const event = createEvent(wrapper);
        const spy = jest.fn();

        event.on('mousemove', () => spy());
        wrapper.dispatchEvent(new Event('mousemove'));

        expect(spy).toHaveBeenCalledTimes(1);
    })

    it('keydown event is triggered once successfully after 10ms timeout', () => {
        const event = createEvent(wrapper);
        const spy = jest.fn();

        event.on('key', () => spy());
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'test-code' }));
        jest.advanceTimersByTime(10);


        expect(spy).toHaveBeenCalledTimes(1);
    })

    it('key event keeps emitting when no keyup event was emitted', () => {
        const event = createEvent(wrapper);
        const spy = jest.fn();

        event.on('key', () => spy());
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'test-code' }));
        jest.advanceTimersByTime(50);

        expect(spy).toHaveBeenCalledTimes(5);
    })

    it('key event emits only once after keyup was emitted immediately after keydown', () => {
        const event = createEvent(wrapper);
        const spy = jest.fn();

        event.on('key', ev => spy(ev.pressed));
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'test-code' }));
        jest.advanceTimersByTime(10);

        setTimeout(() => document.dispatchEvent(new KeyboardEvent('keyup', { code: 'test-code' })), 5)
        jest.advanceTimersByTime(50);

        expect(spy).toHaveBeenCalledTimes(1);
    })

    it('key event keeps emitting when not all keys have been released', () => {
        const event = createEvent(wrapper);
        const spy = jest.fn();

        event.on('key', () => spy());
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'test-code' }));
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'test-code1' }));

        jest.advanceTimersByTime(5);
        setTimeout(() => document.dispatchEvent(new KeyboardEvent('keyup', { code: 'test-code' })), 5)

        jest.advanceTimersByTime(50);
        
        expect(spy).toHaveBeenCalledTimes(5);
    })

    it('key event stops emitting after all keys have been released', () => {
        const event = createEvent(wrapper);
        const spy = jest.fn();

        event.on('key', () => spy());
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'test-code' }));
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'test-code1' }));

        setTimeout(() => document.dispatchEvent(new KeyboardEvent('keyup', { code: 'test-code' })), 5)
        jest.advanceTimersByTime(5);

        setTimeout(() => document.dispatchEvent(new KeyboardEvent('keyup', { code: 'test-code1' })), 20)
        jest.advanceTimersByTime(25);

        jest.advanceTimersByTime(100);
        expect(spy).toHaveBeenCalledTimes(2);
    })

    it('when page visibility changes the key events stop emitting', () => {
        const event = createEvent(wrapper);
        const spy = jest.fn();

        event.on('key', () => spy());
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'test-code' }));
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'test-code1' }));
       
        document.dispatchEvent(new Event('visibilitychange'));
        jest.advanceTimersByTime(10);


        jest.advanceTimersByTime(100);
        expect(spy).toHaveBeenCalledTimes(0);
    })
})