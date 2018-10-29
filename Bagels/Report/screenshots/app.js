var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "Should have displayed the dropdown correctlly|Feedback form",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.einsteinbros.com/images/bg-franchising.jpg - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1540389077506,
                "type": ""
            }
        ],
        "screenShotFile": "images\\008c0098-005d-00b1-0073-005500f800a9.png",
        "timestamp": 1540389074577,
        "duration": 3319
    },
    {
        "description": "Should get the title of customer feedback page|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\004300da-00ac-002a-0053-00d100640005.png",
        "timestamp": 1540389078231,
        "duration": 0
    },
    {
        "description": "Should have displayed the FirstName|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\007100c6-0066-004f-0027-009f008d0046.png",
        "timestamp": 1540389078239,
        "duration": 0
    },
    {
        "description": "Should have displayed the LastName|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\008a00aa-0083-007f-000f-007700cd00c5.png",
        "timestamp": 1540389078248,
        "duration": 0
    },
    {
        "description": "Should have displayed the Email|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00c60039-00c8-0027-00ec-008b00d000fe.png",
        "timestamp": 1540389078257,
        "duration": 0
    },
    {
        "description": "Should have displayed the Phone|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0048006d-0004-009b-0018-0052005a00ea.png",
        "timestamp": 1540389078265,
        "duration": 0
    },
    {
        "description": "Should have displayed the location|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f100a2-0055-00f5-0014-00ae0073006b.png",
        "timestamp": 1540389078274,
        "duration": 0
    },
    {
        "description": "Should have displayed the dropdown and Count|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\009a006c-0089-007f-00e9-006b006d00a7.png",
        "timestamp": 1540389078282,
        "duration": 0
    },
    {
        "description": "Should inspect the comments label|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00d100fe-003c-00fb-00f5-006d009300a1.png",
        "timestamp": 1540389078290,
        "duration": 0
    },
    {
        "description": "Should inspect submit button|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f90091-0027-001b-002a-007a004300df.png",
        "timestamp": 1540389078298,
        "duration": 0
    },
    {
        "description": "Should require first name|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00070060-0092-0078-00b3-00d4002a00c4.png",
        "timestamp": 1540389078306,
        "duration": 0
    },
    {
        "description": "Should not type numbers in First Name field|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\006400c3-00fd-0089-00bf-002d00de00c3.png",
        "timestamp": 1540389078315,
        "duration": 0
    },
    {
        "description": "Should require last name|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00d10020-0016-0041-0018-0080009b009f.png",
        "timestamp": 1540389078324,
        "duration": 0
    },
    {
        "description": "Should not type numbers in Last Name field|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00d4000b-004c-00a9-002d-0078003e002b.png",
        "timestamp": 1540389078336,
        "duration": 0
    },
    {
        "description": "Should require Email|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00990030-0096-002d-0092-00e100ad0048.png",
        "timestamp": 1540389078345,
        "duration": 0
    },
    {
        "description": "Should not type numbers in Email field|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\007a00da-007d-009c-002f-00c900d90080.png",
        "timestamp": 1540389078365,
        "duration": 0
    },
    {
        "description": "Should not leave Phone field blank|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\005800a0-00ad-005d-0056-006100cd0090.png",
        "timestamp": 1540389078374,
        "duration": 0
    },
    {
        "description": "Should not type letters in phone field|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00830012-0066-008d-0072-005b000f00ea.png",
        "timestamp": 1540389078382,
        "duration": 0
    },
    {
        "description": "Should not leave location blank|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\0073003a-0001-00e4-009f-004e00f400ea.png",
        "timestamp": 1540389078391,
        "duration": 0
    },
    {
        "description": "Should not type numbers in in location field|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\00f8005f-002f-00a9-00af-0035000b006a.png",
        "timestamp": 1540389078401,
        "duration": 0
    },
    {
        "description": "Should successfully submit your feedback|Feedback form",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6288,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "images\\004a00a0-00d4-006d-0024-00cf000d00ae.png",
        "timestamp": 1540389078410,
        "duration": 0
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
