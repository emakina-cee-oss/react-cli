# generator-emakinacee-react

_! Work in progress !_

The EMAKINA CEE React generator is built on top of react-scripts used by 
[Create React App](https://github.com/facebookincubator/create-react-app).
This way you can utilize all the awesome features of create-react-app.

And in addition you have access to some even more awesome features like
[File Generators](https://github.com/emakina-cee-oss/generator-emakinacee-react#file-generators).


## Getting started

### 1. Install the generator
```sh
npm install -g generator-emakinacee-react
```
Also make sure you have installed [Yarn](https://yarnpkg.com/en/) 
and the [Yeoman](http://yeoman.io/) command line utility `yo`.
```sh
npm install -g yarn yo
```

### 2. Create your project

For the [Basic Setup](https://github.com/emakina-cee-oss/generator-emakinacee-react#basic-setup) 
run the generator and provide the project name.
```sh
yo emakinacee-react my-awesome-project
```
The generator then creates a new folder called `my-awesome-project` 
and sets up all the files and dependencies needed to take off.

If you need the [SPA Setup](https://github.com/emakina-cee-oss/generator-emakinacee-react#spa-setup) 
just add the `--spa` option flag to the command.
```sh
yo emakinacee-react my-awesome-project --spa
```

### 3. Take off
```sh
cd my-awesome-project
npm start
```


## Basic Setup
The basic setup simply provides a ready to go project structure for React
without any fancy additions.


## SPA Setup
For Single Page Applications [Cerebral](http://cerebraljs.com/docs/introduction/) 
is added to the stack to provide route, state management etc.


## Project Structure
There is a `public` folder for static files and a `src` folder for the fancy app code.

Inside the `src` folder three main sections can be found. Components are encapsulated 
in the `components` folder each component has it's own folder which contains all resources
used by the component.

The `shared` folder is for code which is shared and can be consumed from many components and other
parts of the app.
Like services and helper functions etc.

As Cerebral is used for the SPA-Setup the `modules` folder is introduced to split Cerebral's signals
and state into modules. Therefore each module has it's own folder which contains actions, computes,
and factories. If there are e.g. actions used in multiple modules those are moved to the `shared` 
folder.

```
|-public
    |-index.html
    |-manifest.json
|-src
    |-components 
        |-App 
            |-App.js
            |-App.spec.js
            |-App.scss
            |-images
                |-logo.svg
    |-modules 
        |-App
            |-actions
                |-exampleAction.js
                |-exampleAction.spec.js
            |-computes
                |-exampleCompute.js
                |-exampleCompute.spec.js
            |-factories
                |-exampleFactory.js
                |-exampleFactory.spec.js
            |-AppModule.js
            |-AppModule.spec.js
    |-shared
        |-actions
            |-exampleAction.js
            |-exampleAction.spec.js
        |-computes
            |-exampleCompute.js
            |-exampleCompute.spec.js
        |-factories
            |-exampleFactory.js
            |-exampleFactory.spec.js
        |-services
            |-exampleService.js
            |-exampleService.spec.js
        |-providers
            |-exampleProvider.js
            |-exampleProvider.spec.js
    |-index.js
    |-index.css
    |-controller.js 
```


## Styles (SCSS)
By default the support for SCSS is enabled and we recommend to use it.

Just add a .scss instead of a .css file for your components.
The SCSS files are watched and compiles to a CSS file right next to it.
As components still import the CSS all the styles will be part of the application.

### Variables and Tools
Variables, Settings and tools which can be used by all components are placed in `./src/scss`.

If you add new files add an import to _base-imports.scss which then gets imported by
a components SCSS file to get access to all settings and tools.

### SASS MQ
To work with Media Queries [SASS-MQ](https://github.com/sass-mq/sass-mq) is included.
The breakpoints are configured in `./src/scss/settings/_settings.breakpoints.scss`.



## File Generators
To quickly add new parts to your app like components modules etc. the syntax to you can use is
```sh
yo emakinacee-react:gen type name module
```
See the following examples for more detail.

### Component
```sh
yo emakinacee-react:gen component ComponentName --class
```
By Default this will add a stateless component to add a class component add the 
`--class` option flag.

Spawns the following Files:
+ `src/components/ComponentName/ComponentName.js`
+ `src/components/ComponentName/ComponentName.scss`
+ `src/components/ComponentName/ComponentName.spec.js`

### Service
```sh
yo emakinacee-react:gen service AwesomeService
```
Spawns the following Files:
+ `src/shared/services/AwesomeService.js`
+ `src/shared/services/AwesomeService.spec.js`

### Module
```sh
yo emakinacee-react:gen module AwesomeModule
```
Spawns the following Files:
+ `src/modules/Awesome/AwesomeModule.js`
+ `src/modules/Awesome/AwesomeModule.spec.js`

### Action
```sh
yo emakinacee-react:gen action awesomeAction SomeModule
```
If the module is omitted the action will be created in the shared folder.

If there is a module given which does not yet exist you will be asked to create
the module right away.

Spawns the following Files:
+ `src/modules/SomeModule/actions/awesomeAction.js`
+ `src/modules/SomeModule/actions/awesomeAction.spec.js`
