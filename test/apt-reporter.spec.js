import AptReporter from '../lib/apt-reporter';
import assert from 'assert';
import sinon from 'sinon';

const reporter = new AptReporter();

describe('The Apt Reporter', () => {
    describe('initilization', () => {
        it('should start with 0 total tests', () => {
            assert.equal(reporter.totalTests, 0);
        });

        it('should start with 0 failures', () => {
            assert.equal(reporter.failures, 0);
        });
    });

    describe('test:start event', () => {
        it('should increae total tests by 1', ( )=> {
            reporter.emit('test:start');
            assert.equal(reporter.totalTests, 1);
        });
    });

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

        it('should log the correct number of total testcases to the console', () => {
            reporter.emit('end');
            assert(consoleLogSpy.calledWith('Total: 1'));
        });

        it('should log the correct number of failures to the console', () => {
            reporter.emit('end');
            assert(consoleLogSpy.calledWith('Failures: 1'));
        });
    });
});