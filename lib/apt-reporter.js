import events from 'events';

export default class AptReporter extends events.EventEmitter {
    constructor (baseReporter, config, options = {}) {
        super();

        this.baseReporter = baseReporter;
        this.config = config;
        this.options = options;

        this.totalTests = 0;
        this.failures = 0;

        this.failedTestList = [];

        this.on('test:start', () => {
            this.totalTests++;
        });

        this.on('test:fail', (test) => {
            this.failures++;
            this.failedTestList.push(this.parseFailedTest(test));
        });

        this.on('end', () => {
            console.log('Total: ' + this.totalTests);
            console.log('Failures: ' + this.failures);
            
            this.failedTestList.forEach(failure => {
                console.log(failure.fullTitle);
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