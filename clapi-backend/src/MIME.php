<?php

/**
 * SOURCE: https://gist.github.com/Artem-Schander/37cc1763aef7161a3151
 * Simple repository of common file mime types
 */
class MIME
{

    private static $types = array(
        'ai' => 'application/postscript',
        'aif' => 'audio/x-aiff',
        'aiff' => 'audio/x-aiff',
        'asf' => 'video/x-ms-asf',
        'asx' => 'video/x-ms-asx',
        'avi' => 'video/avi',
        'bin' => 'application/octet-stream',
        'bmp' => 'image/bmp',
        'bz' => 'application/x-bzip',
        'bz2' => 'application/x-bzip2',
        'crt' => 'application/x-x509-ca-cert',
        'css' => 'text/css',
        'csv' => 'text/plain',
        'doc' => 'application/msword',
        // 'docx' => 'application/msword',
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'dot' => 'application/msword',
        'dotx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
        'dxf' => 'application/dxf',
        'eps' => 'application/postscript',
        'gif' => 'image/gif',
        'gz' => 'application/x-gzip',
        'gzip' => 'application/x-gzip',
        'htm' => 'text/html',
        'html' => 'text/html',
        'ico' => 'image/x-icon',
        'jpg' => 'image/jpeg',
        'jpe' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'js' => 'text/javascript',
        'm4a' => 'audio/mp4',
        'mov' => 'video/quicktime',
        'mp3' => 'audio/mpeg',
        'mp4' => 'video/mp4',
        'mpeg' => 'video/mpeg',
        'mpg' => 'video/mpeg',
        // 'msg' => 'application/vnd.ms-outlook',
        'msg' => 'application/CDFV2-corrupt',
        'pdf' => 'application/pdf',
        'php' => 'text/plain',
        'phps' => 'text/plain',
        'png' => 'image/png',
        'pot' => 'application/vnd.ms-powerpoint',
        'ppa' => 'application/vnd.ms-powerpoint',
        'pps' => 'application/vnd.ms-powerpoint',
        'ppt' => 'application/vnd.ms-powerpoint',
        'pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'potx' => 'application/vnd.openxmlformats-officedocument.presentationml.template',
        'ppsx' => 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
        'ps' => 'application/postscript',
        'qt' => 'video/quicktime',
        'ra' => 'audio/x-pn-realaudio',
        'ram' => 'audio/x-pn-realaudio',
        'rtf' => 'application/rtf',
        'shtml' => 'text/html',
        'sit' => 'application/x-stuffit',
        'swf' => 'application/x-shockwave-flash',
        'sql' => 'text/plain',
        'tar' => 'application/x-tar',
        'tgz' => 'application/x-compressed',
        'tif' => 'image/tiff',
        'tiff' => 'image/tiff',
        'txt' => 'text/plain',
        'wav' => 'audio/wav',
        'wma' => 'audio/x-ms-wma',
        'wmf' => 'windows/metafile',
        'wmv' => 'video/x-ms-wmv',
        'xls' => 'application/vnd.ms-excel',
        'xlsx' => 'application/vnd.ms-excel',
        'xlt' => 'application/vnd.ms-excel',
        'xltx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
        'z' => 'application/x-compressed',
        'zip' => 'application/zip'
    );

    private static $groups = array(
        'doc' => array('doc', 'docx', 'dot', 'dotx', 'rtf', 'txt'),
        'powerpoint' => array('ppa', 'pot', 'pps', 'ppt', 'pptx', 'potx', 'ppsx'),
        'table' => array('csv', 'xla', 'xls', 'xlsx', 'xlt', 'xltx'),
        'pdf' => array('pdf'),
        'archive' => array('bin', 'bz', 'bz2', 'gz', 'sit', 'tar', 'tgz', 'z', 'zip'),

        'image' => array('ai', 'bmp', 'dxf', 'eps', 'gif', 'ico', 'jpg', 'jpe', 'jpeg', 'png', 'ps', 'swf', 'tif', 'tiff', 'wmf'),
        'video' => array('asf', 'asx', 'avi', 'mov', 'mpg', 'mpeg', 'mp4', 'qt', 'ra', 'ram', 'swf', 'wmv'),
        'audio' => array('mp3', 'm4a', 'ra', 'ram', 'wav', 'wma'),

        'code' => array('css', 'js', 'htm', 'html', 'php', 'phps', 'shtml', 'sql'),
    );


    /**
     * Return group from suffix or type
     */
    static public function group($suffix)
    {

        if (strpos($suffix, '/')) {
            $suffix = self::suffix($suffix)[0];
        }

        foreach (self::$groups as $group => $suffixes) {
            if (in_array(strtolower($suffix), $suffixes)) {
                return $group;
            }
        }

        return "UNKNOWN";
    }


    /**
     * Return array of mime types
     */
    static public function types($group_type = false)
    {
        if (!$group_type) {
            return self::$types;
        } else {
            if (array_key_exists($group_type, self::$groups)) {
                foreach (self::$types as $key => $mt) {
                    if (in_array($key, self::$groups[$group_type])) {
                        $types[$key] = $mt;
                    }
                }
                return $types;
            } else {
                return false;
            }
        }
    }

    /**
     * Return type from suffix
     */
    static public function type($suffix)
    {
        if (array_key_exists($suffix, self::$types)) {
            return self::$types[$suffix];
        } else {
            return false;
        }
    }

    /**
     * Return array of suffixes from group
     */
    static public function suffixes($group_type)
    {
        if (array_key_exists($group_type, self::$groups)) {
            return self::$groups[$group_type];
        } else {
            return false;
        }
    }

    /**
     * Return array of suffixes from type
     */
    static public function suffix($type)
    {
        if (in_array($type, self::$types)) {
            return array_keys(self::$types, $type);
        } else {
            return false;
        }
    }
}