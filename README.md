<p align="center"><img src="https://user-images.githubusercontent.com/1377253/93661464-edf77780-fa4f-11ea-9622-86cf7e34d460.png" height="80" /></p>

<h1 align="center">HaxeFlixel Game Template</h1>

<h3 align="center">Everything you need to quickly start making your HF game</h3>

<p align="center">No need to install <a href="https://haxe.org/">Haxe</a>, <a href="https://www.openfl.org/">OpenFL</a>, <a href="https://lime.software/">Lime</a> or <a href="https://haxeflixel.com/">HaxeFlixel</a> separately. <br />This template takes care of all of that with the power of <a href="https://github.com/lix-pm/lix.client">Lix</a> and <a href="https://nodejs.org/en/">Nodejs</a>.</p>

---

*This template requires [Node.js](https://nodejs.org/en/) v16 or higher to be installed to run most of the commands below.*

## 1. Download

You can also create a new project based on this template using [degit](https://github.com/Rich-Harris/degit) which will ignore all .git related files.
```sh
npx degit RichardBray/haxe-flixel-template [my-flixel-game]
cd [my-flixel-game]
```
_NOTE: Replace `[my-flixel-game]` with the name of your game._

## 2. Install dependencies

These steps only need to be applied the first time you download the template.

Then install package dependencies
```sh
cd [my-flixel-game]
npm i -g lix
npm i
npx lix download
npm run dev
```

## 3. Running the project
If you've applied the steps above before, this means you have lix installed globally.

All you need to do is
```sh
cd [my-flixel-game]
npm run dev
```
Navigate to port **1212** in your browser.
_http://localhost:1212/_


<br />

---

<br />

## How it works

The project heavily relies on a package called [hf-scripts](https://www.npmjs.com/package/hf-scripts). This package contains the two main scripts that are used to run the project, `startup` and `comp-server`.

### startup

This script is triggered on the `npm start` or `npm run dev` command and does a few things by default:

* builds the game for HTML5
* starts the watcher web and compilation server

**Build for HTML5**

This runs the command `lix lime build HTML5 -debug` and is connected to the compilation server if it is run in a different tab.

You can run your project without a compilation server by creating a file called `config.json` in the root of your project and using these settings:

```json
{
  "useCompServer": false
}
```

The `useCompServer` setting is set to `true` by default. This will cache unchanging code making subsequent builds much faster.

<br/>

**The watcher and web server**

Your **.hx** files are watched with [Chokadir](https://github.com/paulmillr/chokidar). Anytime you save a file it will trigger an automatic rebuild.
```sh
npm start
```

The web server runs the game in a given port. You can change the port in your `config.json` file with these settings:

```json
{
  "webServerPort": 3000
}
```


### Github actions

This template contains a github action file that will:

* create a `gh_pages` branch
* build the game for HTML5 to that branch tab

**This action is commented out and would need to be uncommented to be enabled.**

By default this will happen whenever code is merged to the `main` branch but this can be changed.
