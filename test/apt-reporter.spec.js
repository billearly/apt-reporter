import AptReporter from '../lib/apt-reporter';
import assert from 'assert';
import sinon from 'sinon';

const baseReporter = {
    symbols: {
        ok: '✓',
        err: '✖',
        dot: '․',
        error: 'F'
    },
    color (type, str) {
        return `\u001b[${COLORS[type]}m${str}\u001b[0m`
    }
}

const reporter = new AptReporter(baseReporter);

describe('The Apt Reporter', () => {
    describe('test:fail event', () => {
        it('should increase failures by 1', () => {
            reporter.emit('test:fail');
            assert.equal(reporter.failures, 1);
        });
    });

    describe('end event', () => {
        let consoleLogSpy;

        beforeEach(() => {
            consoleLogSpy = sinon.spy(console, 'log');
        });

        afterEach(() => {
            consoleLogSpy.restore();
        });

        it('should log the correct number of failures to the console', () => {
            reporter.emit('end');
            assert(consoleLogSpy.calledWith('Failures: 1'));
        });
    });
});