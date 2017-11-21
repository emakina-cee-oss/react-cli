# Hello Contributor!
Thank you for considering contributing. Your input, ideas and productive criticism are much appreciated!


## Introduction
These guidelines should help to communicate and collaborate with each other on this project.
Following these guidelines helps to save time and to be more productive.

There are many ways to contribute like submitting bug reports or feature requests, 
improving documentation or writing tutorials. As already mentions every input is appreciated.


## Ground Rules

> Issue before PR

To save your own time and prevent frustration start by 
[creating an issue](https://github.com/emakina-cee-oss/generator-emakinacee-react/blob/master/CONTRIBUTING.md#creating-issues) 
before submitting a Pull Request. This way others can share their opinions on your input.
Maybe there won't be a need for a code change or another solution can derive from your thoughts.
As soon there is a need for code change, go for it and create a pull request!

> It is time for Bullet Points

* Be polite.
* Ensure cross-platform compatibility (Windows, Mac, Linux).
* Test your changes.
* Discuss things transparently and get community feedback.
* Keep feature versions small.


## Creating Issues
When creating a new issue consider which of the following types this issue fits in the best and assign
the correct label.

* bug
* feature
* change request


## Commit Messages
Prefix commit messages with a package description it belongs to like follows:
* `[react-cli] change something`
* `[generator-emakinacee-react] change something`


## Dev / Test Setup
To work on the react-cli you should clone/fork the repo 
and checkout the desired branch (well, hello captain obvious).

In addition to that you also have to link the npm dependencies correctly.

1. Navigate to `./packages/generator-emakinacee-react`
2. Run `npm link`
3. Navigate back to the projects root folder
4. Run `npm link generator-emakinacee-react`
5. Run `npm link`

Now you should be able to run the react-cli commands on your console.

As soon as you change the code of either the generator or the cli package
you can test it on the console by running the related task.
