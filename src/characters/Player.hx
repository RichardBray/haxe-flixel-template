package characters;

import flixel.FlxSprite;
import utils.Colors;

final class Player extends FlxSprite {
	public function new(x:Float = 0, y:Float = 0) {
		super(x, y);
		makeGraphic(100, 100, Colors.white);
	}
}