# sifchain-assessment
This is an assessment made for Sifchain hiring process

## Installation
```
npm install
```
## Execution
To run tests, run
```
npm test
```

To run tests with code coverage enabled, run
```
npm run test:coverage
```

## Reporting and logs

By default, `mochawesome` reporter is enabled which means that `html` report is generated. Search for `mochawesome.html` file under
```
mochawesome-report/
```
Test output is also logged to intermediate JSON file `mochawesome.json` (under the same directory)

When code coverage is enabled (with `nyc` package), coverage is presented under
```
coverage/lcov-report
```
directory, where `index.html` is located. The report covers:
* statements
* branches
* functions
* lines

### Example coverage report

![](lcov.png)
