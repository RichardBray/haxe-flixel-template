# game-jam-template

This is a HaxeFlixel template that is particularly helpful for game jams. It consists of:

- An empty HaxeFlixel project generated with the `flixel template` command (with config files for Visual Studio Code).

## Installation

### 1. As a Github template
This is a [template repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template), simply click "Use this template" to create a copy of it on your own GitHub account!

![](https://help.github.com/assets/images/help/repository/use-this-template-button.png)

### 2. As a non-Github template
```sh
npx degit RichardBray/game-jam-template my-flixel-game
npm install or npm i
npm start
```

**Notes:**
- For the first GitHub pages deployment, it can take around 10 minutes for the page to show up. Also, the repository needs to be public.
- The HTML5 builds are made [with the `-final` flag](https://github.com/HaxeFlixel/game-jam-template/blob/105be8f21d3880736ab056da22cb9e4d04d5536c/.github/workflows/main.yml#L19), which means [Dead Code Elimination](https://haxe.org/manual/cr-dce.html) and Minification are active to create smaller `.js` files. However, your code needs to be DCE-safe (avoid reflection or use `@:keep`).
