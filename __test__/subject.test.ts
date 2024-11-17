import { createSubject, SubjectInstance } from './../src/subject';
describe('subject', () => {
    let subject: SubjectInstance<string>;

    beforeEach(() => {
        jest.clearAllMocks();
        subject = createSubject();
    })

    it('creates subject successfully', () => {
        expect(subject).toBeTruthy();
    })

    it('subscribing to the subject does not call the spy', () => {
        const spy = jest.fn();
        subject.subscribe(spy);

        expect(spy).not.toHaveBeenCalled();
    })

    it('subscribing to the subject when it has initial value calls the spy', () => {
        const spy = jest.fn();
        subject = createSubject('initial-value');
        subject.subscribe(spy);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('initial-value');
    })

    it('subscribing to the subject calls the spy every time it emits', () => {
        const spy = jest.fn();

        subject.subscribe(spy);
        subject.notify('1');
        subject.notify('2');

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenNthCalledWith(1, '1');
        expect(spy).toHaveBeenNthCalledWith(2, '2')
    })
})