package utils;

import flash.Lib;
import flash.text.TextField;
import flash.text.TextFormat;

import flixel.system.FlxBasePreloader;

class Preloader extends FlxBasePreloader {
	var text: TextField;

	public function new(minDisplayTime: Float = 0,
			?allowedURLs: Array<String>) {
		super(minDisplayTime, allowedURLs);
	}

	override function create() {
		final pageWidth: Int = Lib.current.stage.stageWidth;
		final pageHeight: Int = Lib.current.stage.stageHeight;

		text = new TextField();
		text.defaultTextFormat = new TextFormat("Arial", 32, 0xffffffff);
		text.embedFonts = true;
		text.selectable = false;
		text.multiline = false;
		text.x = pageWidth - 250;
		text.y = pageHeight - 80;
		text.width = 200;
		addChild(text);

		super.create();
	}

	/**
	 * Cleanup your objects!
	 * Make sure you call super.destroy()!
	 */
	override function destroy() {
		super.destroy();
	}

	override function onLoaded() {
		super.onLoaded();
		this._loaded = false;
		// Load after the page gets to 100%
		haxe.Timer.delay(() -> this._loaded = true, 50);
	}

	/**
	 * Update is called every frame, passing the current percent loaded. Use this to change your loading bar or whatever.
	 * @param	percent	The percentage that the project is loaded
	 */
	override function update(percent: Float) {
		text.text = 'Loading ${Std.int(percent * 100)}%';
	}
}