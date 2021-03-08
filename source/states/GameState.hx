package states;

import flixel.FlxState;
import flixel.text.FlxText;
import utils.Colors;

class GameState extends FlxState {
	override public function create() {
		super.create();
		bgColor = Colors.grey;
		add(new FlxText("Hello World", 32).screenCenter());
	}

	override public function update(elapsed:Float) {
		super.update(elapsed);
	}
}