import events from 'events';

export default class AptReporter extends events.EventEmitter {
    constructor (baseReporter, config, options = {}) {
        super();

        this.baseReporter = baseReporter;
        this.config = config;
        this.options = options;

        this.failures = 0;

        this.on('test:fail', () => {
            this.failures++;
        });

        this.on('end', () => {
            console.log('Failures: ' + this.failures);
        });
    }
}

AptReporter.reporterName = 'AptReporter';