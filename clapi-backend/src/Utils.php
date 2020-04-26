<?php

namespace App;

use DateTime;
use Slim\Psr7\UploadedFile;
use stdClass;

final class Utils
{

    static public function getCurrentDateTime()
    {
        $date = new DateTime();
        return $date->format('Y-m-d H:i:s');
    }

    static public function slugify($text)
    {
        // Strip html tags
        $text = strip_tags($text);
        // Replace non letter or digits by -
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);
        // Transliterate
        setlocale(LC_ALL, 'en_US.utf8');
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
        // Remove unwanted characters
        $text = preg_replace('~[^-\w]+~', '', $text);
        // Trim
        $text = trim($text, '-');
        // Remove duplicate -
        $text = preg_replace('~-+~', '-', $text);
        // Lowercase
        $text = strtolower($text);
        // Check if it is empty
        if (empty($text)) {
            return 'n-a';
        }
        // Return result
        return $text;
    }

    static public function moveUploadedFile($location, UploadedFile $uploadedFile)
    {
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
        $slugName = pathinfo($uploadedFile->getClientFilename(), PATHINFO_FILENAME);
        $slugName = Utils::slugify($slugName);

        $slugName = sprintf('%s.%0.8s', $slugName, $extension);

        $relativePath = $location ;

        /* avoid two slashes in path*/
        if (strlen($location) === 1) {
            $location = "";
        }
        $publicPath = MEDIA_STORAGE . $location . DIRECTORY_SEPARATOR . $slugName;
        $realPathToSave = MEDIA_STORAGE_ROOT . $location . DIRECTORY_SEPARATOR . $slugName;
        $uploadedFile->moveTo($realPathToSave);

        $media = new stdClass();
        $media->type = "file";
        $media->originName = $uploadedFile->getClientFilename();
        $media->slugName = $slugName;
        $media->path = $relativePath;
        $media->publicPath = $publicPath;
        $media->attributes = [
            'size' => $uploadedFile->getSize(),
            'type' => $uploadedFile->getClientMediaType()
        ];
        return $media;
    }


}