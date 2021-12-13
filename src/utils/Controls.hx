package utils;

import flixel.input.actions.FlxAction.FlxActionDigital;

final class Controls {
	public var left: FlxActionDigital;
	public var right: FlxActionDigital;
	public var up: FlxActionDigital;
	public var circle: FlxActionDigital;
	public var cross: FlxActionDigital;

	public static final instance: Controls = new Controls();

	private function new() {
		initInputs();
		keyboardInputs();
	}

	function initInputs() {
		left = new FlxActionDigital();
		right = new FlxActionDigital();
		up = new FlxActionDigital();
		circle = new FlxActionDigital();
		cross = new FlxActionDigital();
	}

	function keyboardInputs() {
		// - left
		left.addKey(LEFT, PRESSED);
		left.addKey(A, PRESSED);
		// - right
		right.addKey(RIGHT, PRESSED);
		right.addKey(D, PRESSED);
		// - up
		up.addKey(UP, PRESSED);
		up.addKey(W, PRESSED);
		// - circle
		circle.addKey(SHIFT, PRESSED);
		// - cross
		cross.addKey(SPACE, PRESSED);
	}
}