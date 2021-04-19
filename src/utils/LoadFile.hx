package utils;

final class LoadFile {
	/**
	 * Helper function tom load json file precompilation since JS targets
	 * can't access the system file.
	 *
	 * @see https://stackoverflow.com/a/30040322/2395062
	 * @param path Desired Json file to be loaded
	 */
	macro public static function json(path:String) {
		final value = sys.io.File.getContent(path);
		final json = haxe.Json.parse(value);
		return macro $v{json};
	}
}