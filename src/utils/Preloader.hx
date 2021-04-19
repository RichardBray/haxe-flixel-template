package utils;

import flash.Lib;
import flash.text.TextField;
import flash.text.TextFormat;
import flixel.system.FlxBasePreloader;

// @:font("assets/images/preloader/corners.png")
// private class CustomFont extends Font {}
class Preloader extends FlxBasePreloader {
	var _text:TextField;

	override public function new(MinDisplayTime:Float = 0,
			?AllowedURLs:Array<String>) {
		super(MinDisplayTime, AllowedURLs);
	}

	override function create() {
		var _pageWidth:Int = Lib.current.stage.stageWidth;
		var _pageHeight:Int = Lib.current.stage.stageHeight;

		// Loading text
		// Font.registerFont(CustomFont); if custom front
		_text = new TextField();
		_text.defaultTextFormat = new TextFormat("Arial", 32, 0xffffffff);
		_text.embedFonts = true;
		_text.selectable = false;
		_text.multiline = false;
		_text.x = _pageWidth - 250;
		_text.y = _pageHeight - 80;
		_text.width = 200;
		_text.text = "Loading";
		addChild(_text);

		super.create();
	}

	/**
	 * Cleanup your objects!
	 * Make sure you call super.destroy()!
	 */
	override function destroy() {
		super.destroy();
	}

	override public function onLoaded() {
		super.onLoaded();
		_loaded = false;
		// Load after the page gets to 100%
		haxe.Timer.delay(() -> _loaded = true, 50);
	}

	/**
	 * Update is called every frame, passing the current percent loaded. Use this to change your loading bar or whatever.
	 * @param	Percent	The percentage that the project is loaded
	 */
	override public function update(Percent:Float) {
		_text.text = "Loading " + Std.int(Percent * 100) + "%";
	}
}