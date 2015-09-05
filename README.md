# Code Kata

> This project is a solution for the [Babysitter Kata](https://gist.github.com/jameskbride/5482722). I chose to use
> Yeoman and gulp-angular to generate the shell for the solution. From there I created a babysitter component to handle
> the calculation of the babysitter's nightly charge.

Technologies Used

* node
* yeoman
* gulp-angular generator
* foundation
* angular
* moment
* karma for unit tests
* protractor for end to end tests

## Install

This project has a dependency on bower and gulp, if you do not already have them globally install, use the following 
command from any folder

```
$ npm install bower gulp -g
```

From within the code-kata folder

```
$ npm install
$ bower install
```

## Run Karma Unit Tests

From within the code-kata folder

```
$ gulp test
```

## Run Protractor E2E Tests

From within the code-kata folder

```
$ gulp protractor
```
