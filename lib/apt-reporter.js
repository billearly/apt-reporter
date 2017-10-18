import events from 'events';

export default class AptReporter extends events.EventEmitter {
    constructor (baseReporter, config, options = {}) {
        super();

        this.baseReporter = baseReporter;
        this.config = config;
        this.options = options;

        this.totalTestCases = 0;
        this.failedTestCases = [];

        this.on('test:start', () => {
            this.totalTestCases++;
        });

        this.on('test:fail', (test) => {
            this.failedTestCases.push(this.parseFailedTest(test));
        });

        this.on('end', () => {
            console.log('Total: ' + this.totalTestCases);
            console.log(this.baseReporter.color('fail', 'Failures: ' + this.failedTestCases.length));
            console.log('\n---\n');
            
            this.failedTestCases.forEach(failure => {
                console.log('Testcase: ' + failure.fullTitle);
                console.log('Spec File: ' + failure.file);
                console.log(failure.errStackCondensed);
            });
        });
    }

    parseFailedTest (test) {
        return {
            browser: test.runner[test.cid].browserName,
            cid: test.cid,
            errMessage: test.err.message,
            errStack: test.err.stack,
            errStackCondensed: this.condenseStack(test.err.stack), 
            file: test.file,
            fullTitle: test.fullTitle,
            specHash: test.specHash
        }
    }

    condenseStack (stack) {
        let stackArray = stack.split('\n');
        let newStack = '';

        stackArray.forEach(line => {
            if (!line.includes('node_modules')) {
                newStack += line + '\n';
            }
        });

        return newStack;
    }
}

AptReporter.reporterName = 'AptReporter';