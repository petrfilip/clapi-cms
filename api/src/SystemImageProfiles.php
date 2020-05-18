<?php

namespace App;

final class SystemImageProfiles
{
    const ICON = ["width" => "100", "height" => "100", "quality" => "100", "fit" => "", "fm" => "webp"];
    const SMALL = ["width" => "300", "height" => "300", "quality" => "100", "fit" => "", "fm" => "webp"];
    const MEDIUM = ["width" => "600", "height" => "600", "quality" => "90", "fit" => "", "fm" => "webp"];
    const LARGE = ["width" => "900", "height" => "900", "quality" => "90", "fit" => "", "fm" => "webp"];
    const XLARGE = ["width" => "1600", "height" => "1600", "quality" => "90", "fit" => "", "fm" => "webp"];

    static public function getByName($name)
    {
        switch ($name) {
            case "system-icon":
                return self::ICON;
                break;
            case "system-small":
                return self::SMALL;
                break;
            case "system-medium":
                return self::MEDIUM;
                break;
            case "system-large":
                return self::LARGE;
                break;
            case "system-xlarge":
                return self::XLARGE;
                break;
        }
    }
}