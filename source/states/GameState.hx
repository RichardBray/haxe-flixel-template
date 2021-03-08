package states;

import flixel.FlxState;
import flixel.system.FlxAssets;
import flixel.text.FlxText;
import utils.Colors;

class GameState extends FlxState {
	override public function create() {
		super.create();
		bgColor = Colors.grey;
		FlxAssets.FONT_DEFAULT = "assets/fonts/OpenSans-Regular.ttf";
		add(new FlxText("Hello World", 32).screenCenter());
	}

	override public function update(elapsed:Float) {
		super.update(elapsed);
	}
}