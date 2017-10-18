export const TEST_FAILURE = {
    type: 'test:fail',
    err: {
        message: 'false == true',
        stack: 'AssertionError: false == true\n    at Context.it (C:\\project\\test\\specs\\test.spec.js: 13: 9)\n    at C:\\project\\node_modules\\wdio-sync\\build\\index.js: 594: 26\n    at Promise.F (C:\\project\\node_modules\\core-js\\library\\modules\\_export.js: 35: 28)\n    at Context.executeSync (C:\\project\\node_modules\\wdio-sync\\build\\index.js: 592: 12)\n    at C:\\project\\node_modules\\wdio-sync\\build\\index.js: 763: 42',
        type: 'AssertionError',
        expected: true,
        actual: false
    },
    title: 'I will fail',
    parent: 'Go to website',
    fullTitle: 'Go to website I will fail',
    pending: false,
    file: 'C:\\project\\test\\specs\\test.spec.js',
    cid: '0-0',
    specs: [
        'C:\\project\\test\\specs\\test.spec.js'
    ],
    event: 'test:fail',
    runner: {
        '0-0': {
            maxInstances: 5,
            browserName: 'chrome'
        }
    },
    uid: 'I will fail7',
    parentUid: 'Go to website2',
    specHash: 'd339bd5a5556d3d6d6db553968bcc16f'
}

export const TEST_FAILURE_PARSED = {
    browser: 'chrome',
    cid: '0-0',
    errMessage: 'false == true',
    errStack: 'AssertionError: false == true\n    at Context.it (C:\\project\\test\\specs\\test.spec.js: 13: 9)\n    at C:\\project\\node_modules\\wdio-sync\\build\\index.js: 594: 26\n    at Promise.F (C:\\project\\node_modules\\core-js\\library\\modules\\_export.js: 35: 28)\n    at Context.executeSync (C:\\project\\node_modules\\wdio-sync\\build\\index.js: 592: 12)\n    at C:\\project\\node_modules\\wdio-sync\\build\\index.js: 763: 42',
    errStackCondensed: 'AssertionError: false == true\n    at Context.it (C:\\project\\test\\specs\\test.spec.js: 13: 9)\n',
    file: 'C:\\project\\test\\specs\\test.spec.js',
    fullTitle: 'Go to website I will fail',
    specHash: 'd339bd5a5556d3d6d6db553968bcc16f'    
}

export const STATEMENT_FAILURE = '\u001b[31mFailures: 1\u001b[0m';

export const STACK_TRACE = 'AssertionError: false == true\n    at Context.it (C:\\project\\test\\specs\\test.spec.js: 13: 9)\n    at C:\\project\\node_modules\\wdio-sync\\build\\index.js: 594: 26\n    at Promise.F (C:\\project\\node_modules\\core-js\\library\\modules\\_export.js: 35: 28)\n    at Context.executeSync (C:\\project\\node_modules\\wdio-sync\\build\\index.js: 592: 12)\n    at C:\\project\\node_modules\\wdio-sync\\build\\index.js: 763: 42';
export const STACK_TRACE_CONDENSED = 'AssertionError: false == true\n    at Context.it (C:\\project\\test\\specs\\test.spec.js: 13: 9)\n';

export const COLORS = {
    'pass': 90,
    'fail': 31,
    'bright pass': 92,
    'bright fail': 91,
    'bright yellow': 93,
    'pending': 36,
    'suite': 0,
    'error title': 0,
    'error message': 31,
    'error stack': 90,
    'checkmark': 32,
    'fast': 90,
    'medium': 33,
    'slow': 31,
    'green': 32,
    'light': 90,
    'diff gutter': 90,
    'diff added': 32,
    'diff removed': 31
}