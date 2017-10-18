import AptReporter from '../lib/apt-reporter';
import assert from 'assert';
import sinon from 'sinon';

import { 
    TEST_FAILURE, TEST_FAILURE_PARSED,
    STACK_TRACE, STACK_TRACE_CONDENSED 
} from './fixtures';

const reporter = new AptReporter();

describe('The Apt Reporter', () => {
    describe('initilization', () => {
        it('should start with 0 total tests', () => {
            assert.equal(reporter.totalTestCases, 0);
        });

        it('should start with an empty failure list', () => {
            assert.equal(reporter.failedTestCases.length, 0);
        });
    });

    describe('condenseStack method', () => {
        it('should remove any stack trace lines for files inside node_modules', () => {
            let condenseStack = reporter.condenseStack(STACK_TRACE);
            assert.strictEqual(condenseStack, STACK_TRACE_CONDENSED);
        });
    });
    
    describe('parseFailedTest method', () => {
        it('should correctly parse a failed test result', () => {
            let parsedTest = reporter.parseFailedTest(TEST_FAILURE);
            assert.deepStrictEqual(parsedTest, TEST_FAILURE_PARSED);
        });
    });

    describe('test:start event', () => {
        it('should increase total tests by 1', ( )=> {
            reporter.emit('test:start');
            assert.equal(reporter.totalTestCases, 1);
        });
    });

    describe('test:fail event', () => {
        before(() => {
            reporter.emit('test:fail', TEST_FAILURE);
        });

        it('should add the parsed failed test to the list', () => {
            assert.equal(reporter.failedTestCases.length, 1);
            assert.deepStrictEqual(reporter.failedTestCases[0], TEST_FAILURE_PARSED);
        });
    });

    describe('end event', () => {
        let consoleLogSpy;

        before(() => {
            consoleLogSpy = sinon.spy(console, 'log');
            reporter.emit('end');
        });

        after(() => {
            consoleLogSpy.restore();
        });

        it('should log the correct number of total testcases to the console', () => {
            assert(consoleLogSpy.calledWith('Total: 1'));
        });

        it('should log the correct number of failures to the console', () => {
            assert(consoleLogSpy.calledWith('Failures: 1'));
        });

        it('should log the name and file of the failed test to the console', () => {
            assert(consoleLogSpy.calledWith('Testcase: ' + TEST_FAILURE_PARSED.fullTitle));
            assert(consoleLogSpy.calledWith('Spec File: ' + TEST_FAILURE_PARSED.file));
        });

        it('should log the condensed stack trace to the console', () => {
            assert(consoleLogSpy.calledWith(STACK_TRACE_CONDENSED));
        });
    });
});