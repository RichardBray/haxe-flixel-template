package states;

import characters.Player;

class LevelState extends GameState {
	var player:Player;

	override public function create() {
		super.create();
	}

	public function createPlayer(x:Float = 0, y:Float = 0) {
		player = new Player(x, y);
		add(player);
	}
}