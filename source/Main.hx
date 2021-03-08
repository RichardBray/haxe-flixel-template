package;

import flixel.FlxGame;
import openfl.display.Sprite;
import states.GameState;

class Main extends Sprite {
	public function new() {
		super();
		addChild(new FlxGame(0, 0, GameState));
	}
}