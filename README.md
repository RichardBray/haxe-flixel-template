<p align="center"><img src="https://user-images.githubusercontent.com/1377253/93661464-edf77780-fa4f-11ea-9622-86cf7e34d460.png" height="80" /></p>

<h1 align="center">HaxeFlixel Game Template</h1>

<h3 align="center">Everything you need to quickly start making your HF game</h3>

<p align="center">No need to install <a href="https://haxe.org/">Haxe</a>, <a href="https://www.openfl.org/">OpenFL</a>, <a href="https://lime.software/">Lime</a> or <a href="https://haxeflixel.com/">HaxeFlixel</a> separately. <br />This template takes care of all of that with the power of <a href="https://github.com/lix-pm/lix.client">Lix</a> and <a href="https://nodejs.org/en/">Nodejs</a>.</p>

---

*This template requires [Node.js](https://nodejs.org/en/) (v6 or higher) to be installed to run most of the commands below.*

### 1. Download

You can also create a new project based on this template using [degit](https://github.com/Rich-Harris/degit) which will ignore all .git related files.
```sh
npx degit RichardBray/game-jam-template my-flixel-game
cd my-flixel-game
```

### 2. Install dependencies

First [install watchman](https://facebook.github.io/watchman/docs/install.html#buildinstall) locally

```sh
brew update
brew install watchman
```

Then install package dependencies
```sh
npm i -g lix
npm i
npx lix download
```

### 3. Build

Your **.hx** files are watched with [Facebook's watman plugin](https://facebook.github.io/watchman/). Anytime you save a file it will trigger an automatic rebuild.
```sh
npm run dev
```

#### Build to HTML5
```sh
npm start
```

Navigate to port **1212** in your browser.
_http://localhost:1212/_
