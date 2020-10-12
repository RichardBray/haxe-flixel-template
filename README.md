<p align="center"><img src="https://user-images.githubusercontent.com/1377253/93661464-edf77780-fa4f-11ea-9622-86cf7e34d460.png" height="80" /></p>

<h1 align="center">HaxeFlixel Game Template</h1>

<h3 align="center">Everything you need to start making your HF game in 2-3 terminal commands</h3>

<p align="center">No need to install <a href="https://haxe.org/">Haxe</a>, <a href="https://www.openfl.org/">OpenFL</a>, <a href="https://lime.software/">Lime</a> or <a href="https://haxeflixel.com/">HaxeFlixel</a> separately. <br />This template takes care of all of that with the power of <a href="https://github.com/lix-pm/lix.client">Lix</a> and <a href="https://nodejs.org/en/">Nodejs</a>.</p>

---

*This template requires [Nodejs](https://nodejs.org/en/) (v6 or higher) to be installed to run most of the commands below.*

### 1. Download

You can also create a new project based on this template using [degit](https://github.com/Rich-Harris/degit) which will ignore all .git related files.
```sh
npx degit RichardBray/game-jam-template my-flixel-game
cd my-flixel-game
```

### 2. Install dependencies

```sh
npm i 
```

### 3. Build
It's recommended to run the [Haxe compilation server](https://youtu.be/3crCJlVXy-8) when developing to cache the compilation, this should be done in a separate terminal window/tab with the following command.
```sh
npm run comp-server
```

Your **.hx** files are watched with [Facebook's watman plugin](https://facebook.github.io/watchman/). Anytime you save a file it will trigger an automatic rebuild. 
```sh
npm start 
```
