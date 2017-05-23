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
For Single Page Applications the basic react stack will be extended with helpful libraries and
features:

+ Routing
+ [PWA enhancements](https://github.com/emakina-cee-oss/generator-emakinacee-react#pwa-enhancements)
+ [State Management](https://github.com/emakina-cee-oss/generator-emakinacee-react#state-management)



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
To quickly add new files with the necessary boilerplate code there are different sub generators
to add e.g. a new component.


### Component
```sh
yo emakinacee-react:component ComponentName --class
```
By Default this will add a stateless component to add a class component add the 
`--class` option flag.

### Service
```sh
yo emakinacee-react:service AwesomeService
```
Services are placed in `src/shared/services`
