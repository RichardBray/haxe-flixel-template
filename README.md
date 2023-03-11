<p align="center"><img src="https://user-images.githubusercontent.com/1377253/93661464-edf77780-fa4f-11ea-9622-86cf7e34d460.png" height="80" /></p>

<h1 align="center">HaxeFlixel Game Template</h1>

<h3 align="center">Everything you need to quickly start making your HF game</h3>

<p align="center">No need to install <a href="https://haxe.org/">Haxe</a>, <a href="https://www.openfl.org/">OpenFL</a>, <a href="https://lime.software/">Lime</a> or <a href="https://haxeflixel.com/">HaxeFlixel</a> separately. <br />This template takes care of all of that with the power of <a href="https://github.com/lix-pm/lix.client">Lix</a> and <a href="https://nodejs.org/en/">Nodejs</a>.</p>

---

*This template requires [Node.js](https://nodejs.org/en/) (v12 or higher) to be installed to run most of the commands below.*

## 1. Download

You can also create a new project based on this template using [degit](https://github.com/Rich-Harris/degit) which will ignore all .git related files.
```sh
npx degit RichardBray/haxe-flixel-template my-flixel-game
cd my-flixel-game
```

## 2. Install dependencies

These steps only need to be applied the first time you download the template.

First [install watchman](https://facebook.github.io/watchman/docs/install.html#buildinstall) locally

MacOS
```sh
brew update
brew install watchman
```

_Sorry I don't know how to install watchman on Windows_

Then install package dependencies
```sh
cd my-flixel-game
npm i -g lix
npm i
npx lix download
npm run dev
```

### Subsequent installs
If you've applied the steps above before, this means you have watchman and lix installed globally.

All you need to do is
```sh
cd my-flixel-game
npm i
npm run dev
```

## 3. Build

Your **.hx** files are watched with [Facebook's watchman plugin](https://facebook.github.io/watchman/). Anytime you save a file it will trigger an automatic rebuild.
```sh
npm start
```

Navigate to port **1212** in your browser.
_http://localhost:1212/_

## 4. Tweak

Open the `package.json` file located in the root.
Change the `"name:"` and `"description:"` value to the name of your game.

<br />

---

<br />

## How it works

There are a few scripts behind the scenes that make running your HaxeFlixel game with this template a little easier.

There are in the `/bin` folder and are currently written in plain old **JavaScript** but they might change to **Haxe** at some point in the future.

### Startup

This script is triggers on the `npm start` command and does a few things by default:

* opens the compilation server in a new terminal tab
* builds the game for HTML5
* starts the watcher and web server

**Compilation server in new tab**

This opens a new tab in your terminal and starts the compilation server. This benefits the speed of the game build since the automated build is cached in the compilation server, therefore subsequent builds will be faster.

Note with this option turned on you would have to manually stop the server, it doesn't stop automatically when the web server is closed.

This option be turned off by going to bin/options.js and setting `COMP_SERVER_NEW_TAB` to `false` which will result in the compilation server starting along with the web server and watcher.

<br/>

**Build for HTML5**

This runs the command `lix lime build html5 -debug` and is connected to the compilation server if it runs in a different tab.

This is particularly useful after starting up a completely different project which has compiled code in the `export` folder.

If the setting to open the compilation server in a different tab when this runs it will cache unchanging code making subsequent builds much faster.

This can be skipped by running:
```bash
npm start -- --skip
#or
npm start -- -s
```
Or by going to bin/options.js and setting `ALLOW_FIRST_BUILD` to `false`

<br/>

**Starting the watcher and web server**

The watcher automatically updates the game when any .hx file is saved. This is done by the [watchman](https://facebook.github.io/watchman/) package and the watcher script which will be explained later.

The web server is runs the game in a given port. This port can be changed by going to bin/options.js and changing `WEB_SERVER_PORT`.

<br/>

### Watcher

This rebuilds the game for html5 whenever there is a change to any .hx file. This is connected to the compilation server so should speed up builds.

A notification is triggered on Mac machines once the game has compiled.

### Github actions

This template contains a github action file that will:

* create a `gh_pages` branch
* build the game for html5 to that branch tab

**This action is commented out and would need to be uncommented to be enabled.**

By default this will happen whenever code is merged to the `main` branch but this can be changed.

## Things TO DO
- Replace watchman with chokidar
- Split scripts out into separate package
