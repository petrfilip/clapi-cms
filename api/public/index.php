<?php

use App\DatabaseManager;
use App\ErrorUtils;
use App\Middleware\CorsMiddleware;
use App\Middleware\JwtMiddleware;
use App\Model\ApplicationRequirementsDto;
use App\SlimGlideResponseFactory;
use App\SystemImageProfiles;
use App\Utils;
use DI\ContainerBuilder;
use Fetzi\ServerTiming\ServerTimingMiddleware;
use Fetzi\ServerTiming\ServerTimings;
use Firebase\JWT\JWT;
use League\Glide\Responses\PsrResponseFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Psr7\Stream;

define("SYSTEM_COLLECTIONS", ["type-definition", "type-definition-archiving", "media", "media-trash", "user", "config"]);

define("DATABASE_ROOT", __DIR__ . "/../database");
define("MEDIA_STORAGE_TRASH", "/trash");
define("MEDIA_STORAGE_THUMBNAIL_DIRECTORY", "/generated-thumbnail");
define("MEDIA_STORAGE", "/media-storage");
define("MEDIA_STORAGE_ROOT", __DIR__ . MEDIA_STORAGE);
define("CONFIG_FILE", __DIR__ . './../config.php');
if (file_exists(CONFIG_FILE)) {
    // the file contain user defined constant

}
require CONFIG_FILE;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . './../src/Middleware/CorsMiddleware.php';
require __DIR__ . './../src/Middleware/JwtMiddleware.php';
require __DIR__ . './../src/Model/ApplicationError.php';
require __DIR__ . './../src/Model/ApplicationRequirementsDto.php';
require __DIR__ . './../src/ErrorUtils.php';
require __DIR__ . './../src/DatabaseManager.php';
require __DIR__ . './../src/Utils.php';
require __DIR__ . './../src/MIME.php';
require __DIR__ . './../src/SystemImageProfiles.php';


$containerBuilder = new ContainerBuilder();
AppFactory::setContainer($containerBuilder->build());

$app = AppFactory::create();

$app->add(CorsMiddleware::class);


$app->addBodyParsingMiddleware();
$app->addErrorMiddleware(true, true, true);
$app->addRoutingMiddleware();
$app->setBasePath("/api/public");

$container = $app->getContainer();
$app->add(new ServerTimingMiddleware($container->get(ServerTimings::class)));


$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write(phpinfo());
    return $response;
});

$app->get('/init-requirements', function (Request $request, Response $response, $args) {

    //$loadedModules = phpinfo();
    //$isModRewriteLoaded = (strpos($loadedModules, 'mod_rewrite') !== false);
    chmod(MEDIA_STORAGE_ROOT, 0777);
    chmod(DATABASE_ROOT, 0777);
    chmod(CONFIG_FILE, 0777);
    // PHP | CURRENT VERSION | REQUIRED VERSION | STATUS
    $requirements = [
        new ApplicationRequirementsDto("PHP", "phpversion()", "7.2", "todo description"),
        new ApplicationRequirementsDto("mod rewrite", "isModRewriteLoaded", "TRUE", "todo description"),
        new ApplicationRequirementsDto("gd library", extension_loaded('gd') ? "true" : "false", "true", "todo description"),
        new ApplicationRequirementsDto("upload_max_filesize", ini_get('post_max_size'), "todo", "todo description"),
        new ApplicationRequirementsDto("memory_limit", ini_get('memory_limit'), "todo", "todo description"),
        new ApplicationRequirementsDto("max_execution_time", ini_get('max_execution_time'), "todo", "todo description"),
        new ApplicationRequirementsDto("chmod media", is_writable(MEDIA_STORAGE_ROOT) ? "true" : "false", "TRUE", "todo description"),
        new ApplicationRequirementsDto("chmod database", is_writable(DATABASE_ROOT) ? "true" : "false", "TRUE", "todo description"),
        new ApplicationRequirementsDto("chmod config", is_writable(CONFIG_FILE) ? "true" : "false", "TRUE", "todo description"),
    ];

    $response->getBody()->write(json_encode($requirements));
    return $response;
});

$app->post('/init', function (Request $request, Response $response, $args) {

    if (isApplicationInitialized()) {
        return $response->withStatus(204);
    }

    $inputJson = $request->getParsedBody();
    if ($inputJson == null) {
        return $response->withStatus(424);
    }

    /* init required directories */
    if (!folder_exist(MEDIA_STORAGE_ROOT . MEDIA_STORAGE_THUMBNAIL_DIRECTORY)) {
        mkdir(MEDIA_STORAGE_ROOT . MEDIA_STORAGE_THUMBNAIL_DIRECTORY);
    }

    if (!folder_exist(MEDIA_STORAGE_ROOT . MEDIA_STORAGE_TRASH)) {
        mkdir(MEDIA_STORAGE_ROOT . MEDIA_STORAGE_TRASH);
    }


    /* create config file with configuration*/
    $inputJson = $request->getParsedBody();

    if (!filter_var($inputJson["email"], FILTER_VALIDATE_EMAIL)) {
        $response->getBody()->write("INVALID EMAIL");
        return $response;
    }

    if (!isPasswordValid($inputJson["password"])) {
        $response->getBody()->write("INVALID PASSWORD");
        return $response;
    }


    $configFile = fopen(CONFIG_FILE, "w") or die("Unable to open file!");
    $txt = '<?php ';
    fwrite($configFile, $txt);
    $txt = 'define("JWT_KEY", "' . $inputJson["password"] . '");';
    fwrite($configFile, $txt);
    fclose($configFile);

    /* create first user */
    $user = new stdClass();
    $user->email = $inputJson["email"];
    $user->password = password_hash($inputJson["password"], PASSWORD_BCRYPT);

    $savedUser = DatabaseManager::insertNewVersionedRecord("user", $user, 0);
    unset($savedUser["password"]);
    $response->getBody()->write(json_encode($savedUser));
    return $response;
});

function isPasswordValid($password)
{
    //todo
    return strlen($password) > 3;
//    $uppercase = preg_match('@[A-Z]@', $password);
//    $lowercase = preg_match('@[a-z]@', $password);
//    $number = preg_match('@[0-9]@', $password);
//    $specialChars = preg_match('@[^\w]@', $password);
//
//    return (!$uppercase || !$lowercase || !$number || !$specialChars || strlen($password) < 8);
}

function isApplicationInitialized()
{
    return defined("JWT_KEY");
}


$app->post('/login', function (Request $request, Response $response, $args) {
    $inputJson = $request->getParsedBody();
    $userStore = DatabaseManager::getDataStore("user");

    // verify credentials
    $loadedUser = $userStore->where("email", "=", $inputJson["email"])->fetch();
    if (!password_verify($inputJson["password"], $loadedUser[0]["password"])) {
        $response->getBody()->write(json_encode(ErrorUtils::error(ErrorUtils::BAD_LOGIN)));
        return $response->withStatus(403);
    }


    // todo improve create token
    $payload = array( //todo fix the payload
        "user_id" => $loadedUser[0]["_id"],
        "user_email" => $loadedUser[0]["email"],
        "iss" => "http://example.org",
        "aud" => "http://example.com",
        "iat" => 1356999524,
        "nbf" => 1357000000
    );
    $jwt = JWT::encode($payload, JWT_KEY);


    // create output for user
    $output = new stdClass();
    $output->token = $jwt;
    $output->email = $inputJson["email"];

    $response->getBody()->write(json_encode($output));
    return $response;
});

/* add user */
$app->post('/user', function (Request $request, Response $response, $args) {
    $inputJson = $request->getParsedBody();
    $userId = $request->getAttribute("userId");


    $user = new stdClass();
    $user->email = $inputJson["email"];
    $user->password = password_hash($inputJson["password"], PASSWORD_BCRYPT);

    $savedUser = DatabaseManager::insertNewVersionedRecord("user", $user, $userId);
    unset($savedUser["password"]);
    $response->getBody()->write(json_encode($savedUser));
    return $response;
})->addMiddleware(new JwtMiddleware());

/* update user*/

$app->put('/user', function (Request $request, Response $response, $args) {
    $inputJson = $request->getParsedBody(); //todo

    $response->getBody()->write(json_encode($inputJson));
    return $response;
});

/* configurations */
$app->get('/config', function (Request $request, Response $response, $args) {

    $saved = DatabaseManager::findBy("config", []);
    $response->getBody()->write(json_encode($saved));
    return $response;
})->addMiddleware(new JwtMiddleware());

$app->get('/config/{configName}', function (Request $request, Response $response, $args) {
    $configCondition = ["type" => "where", "key" => "configName", "operator" => "=", "value" => $args["configName"]];
    $saved = DatabaseManager::findBy("config", $configCondition);
    if (!count($saved)) {

    }

    $response->getBody()->write(json_encode($saved[0]));
    return $response;
})->addMiddleware(new JwtMiddleware());

$app->post('/config', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();
    $userId = $request->getAttribute("userId");
    $saved = DatabaseManager::insertNewVersionedRecord("config", $data, $userId);
    $response->getBody()->write(json_encode($saved));
    return $response;
})->addMiddleware(new JwtMiddleware());

$app->put('/config', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();
    $userId = $request->getAttribute("userId");
    $updated = DatabaseManager::updateVersionedRecord("config", $data, $userId);
    $response->getBody()->write(json_encode($updated));
    return $response;
})->addMiddleware(new JwtMiddleware());


/* DOCUMENT API */
$app->post('/query', function (Request $request, Response $response, $args) {
    $queryParams = $request->getParsedBody();
    $loadedData = DatabaseManager::findBy($queryParams["collection"], $queryParams["query"]);

    $payload = json_encode($loadedData);
    $response->getBody()->write($payload);
    return $response;
});


$app->get('/collection/{collection}', function (Request $request, Response $response, $args) {
    $params = $request->getQueryParams();
    $queryParams = $request->getParsedBody();
    $loadedData = DatabaseManager::findBy($args["collection"], $queryParams["query"]);


//    $timingFetchCollection = $this->get("Fetzi\ServerTiming\ServerTimings")->create('fetchData');
//    $timingFetchCollection->start();
//    $timingFetchCollection->stop();

    $payload = json_encode($loadedData);
    $response->getBody()->write($payload);
    return $response;
});

$app->get('/collection/type-definition/{collectionName}', function (Request $request, Response $response, $args) {
    $collectionStore = DatabaseManager::getDataStore("type-definition");

    $loadedDefinition = $collectionStore->where("metadata.collectionName", "=", $args["collectionName"])->fetch();
    if (is_array($loadedDefinition) && count($loadedDefinition)) {
        $payload = json_encode($loadedDefinition[0]);
        $response->getBody()->write($payload);
        return $response;
    } else {
        return $response->withStatus(404);
    }
});

$app->get('/collection/{collection}/{id}', function (Request $request, Response $response, $args) {
    $loadedData = DatabaseManager::getById($args["collection"], $args["id"]);

    if (is_array($loadedData) && count($loadedData)) {
        $payload = json_encode($loadedData);
        $response->getBody()->write($payload);
        return $response;
    } else {
        return $response->withStatus(404);
    }
});


$app->post('/collection/type-definition', function (Request $request, Response $response, $args) {
    $collectionStore = DatabaseManager::getDataStore("type-definition");
    $data = $request->getParsedBody();
    $collectionName = $data["collectionName"];

    if (count($collectionStore->where("metadata.collectionName", "=", $collectionName)->fetch())) {
        return $response->withStatus(503);
    } else {
        $userId = $request->getAttribute("userId");
        $inserted = DatabaseManager::insertNewVersionedRecord("type-definition", $data, $userId);
        $response->getBody()->write(json_encode($inserted));
        return $response;
    }
})->addMiddleware(new JwtMiddleware());


$app->put('/collection/type-definition', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();
    $userId = $request->getAttribute("userId");
    $updated = DatabaseManager::updateVersionedRecord("type-definition", $data, $userId);
    $response->getBody()->write(json_encode($updated));
    return $response;
})->addMiddleware(new JwtMiddleware());


$app->options('{route:.*}', function (Request $request, Response $response, $args) {
    return $response;
});

$app->post('/collection/{collection}', function (Request $request, Response $response, $args) use ($app) {
    $data = $request->getParsedBody();
    $userId = $request->getAttribute("userId");
    $inserted = DatabaseManager::insertNewVersionedRecord($args["collection"], $data, $userId);
    $response->getBody()->write(json_encode($inserted));
    return $response;
})->addMiddleware(new JwtMiddleware());


$app->put('/collection/{collection}', function (Request $request, Response $response, $args) {
    $inputJson = $request->getParsedBody();
    $userId = $request->getAttribute("userId");
    $updated = DatabaseManager::updateVersionedRecord($args["collection"], $inputJson, $userId);
    $response->getBody()->write(json_encode($updated));
    return $response;
})->addMiddleware(new JwtMiddleware());

$app->delete('/collection/{collection}/{id}', function (Request $request, Response $response, $args) {
    $userId = $request->getAttribute("userId");
    $updated = DatabaseManager::safeDeleteVersionedRecord($args["collection"], $args["id"], $userId);
    $response->getBody()->write(json_encode($updated));
    return $response;
})->addMiddleware(new JwtMiddleware());


/* MEDIA API */

/* get file by id*/
$app->get('/media/download/{id:[0-9]+}', function (Request $request, Response $response, $args) {
    $loadedItem = DatabaseManager::getById("media", $args["id"]);

    if (count($loadedItem)) {

        $path = __DIR__ . $loadedItem["publicPath"];
        $fh = fopen($path, 'rb');
        $stream = new Stream($fh); // create a stream instance for the response body

        return $response->withBody($stream)
            ->withHeader('X-Filename', $loadedItem["originName"])
            ->withHeader('Content-Disposition', 'attachment;filename=' . $loadedItem["originName"] . ';')
            ->withHeader('Content-Type', mime_content_type($path))
            ->withHeader('Content-Length', filesize($path))
            ->withHeader('Expires', '0')
            ->withHeader('Cache-Control', 'must-revalidate, post-check=0, pre-check=0');
    } else {
        return $response->withStatus(404);
    }
});

$app->get('/media/show/{id:[0-9]+}', function (Request $request, Response $response, $args) {
    $loadedItem = DatabaseManager::getById("media", $args["id"]);

    if (count($loadedItem)) {

        $path = __DIR__ . $loadedItem["publicPath"];
        $fh = fopen($path, 'rb');
        $stream = new Stream($fh); // create a stream instance for the response body

        return $response->withBody($stream)
            ->withHeader('X-Filename', $loadedItem["originName"])
            ->withHeader('Content-Disposition', 'inline;filename=' . $loadedItem["originName"] . ';')
            ->withHeader('Content-Type', mime_content_type($path))
            ->withHeader('Content-Length', filesize($path))
            ->withHeader('Expires', '0')
            ->withHeader('Cache-Control', 'must-revalidate, post-check=0, pre-check=0');
    } else {
        return $response->withStatus(404);
    }
});

function findProfileByName($profileName, $profiles)
{
    foreach ($profiles as $profile) {
        if ($profile["name"] === $profileName) {
            return $profile;
        }
    }
    return null;
}

function findImageProfile($profile)
{
    /* system profiles */
    $systemProfile = SystemImageProfiles::getByName($profile);
    if ($systemProfile != null) {
        return $systemProfile;
    }

    /* user defined profiles*/
    $imageConfigCondition = ["type" => "where", "key" => "configName", "operator" => "=", "value" => "imageConfiguration"];
    $imageConfiguration = DatabaseManager::findOneBy("config", $imageConfigCondition);
    $loadedProfiles = $imageConfiguration["profiles"];
    $profile = findProfileByName($profile, $loadedProfiles);

    if ($profile == null) {
        throw new Exception("Unable to find requested image profile");
    }
    return $profile;
}

$app->get('/media/show/{id:[0-9]+}/{profile}', function (Request $request, Response $response, $args) {
    $loadedItem = DatabaseManager::getById("media", $args["id"]);

    if ($loadedItem == null) {
        return $response->withStatus(404);
    }

    $format = findImageProfile($args["profile"]);
    if ($format == null) {
        throw new \http\Exception\RuntimeException("Format is not supported");
    }

    $server = League\Glide\ServerFactory::create([
        'source' => __DIR__,
        'cache' => MEDIA_STORAGE_ROOT . MEDIA_STORAGE_THUMBNAIL_DIRECTORY,
        'response' => new PsrResponseFactory($response, function ($stream) {
            return new Stream($stream);
        }),
    ]);

    $imageParams = [
        'w' => $format["width"],
        'h' => $format["height"],
        'fit' => $format['fit'],
        'q' => $format['quality'],
        'fm' => $format['fm']
    ];
    $newResponse = $server->getImageResponse($loadedItem["publicPath"], $imageParams);
    return $newResponse
        ->withHeader('X-Filename', $loadedItem["originName"])
        ->withHeader('Content-Disposition', 'inline;filename=' . $loadedItem["originName"] . ';')
        ->withHeader('Expires', '0')
        ->withHeader('Cache-Control', 'must-revalidate, post-check=0, pre-check=0');


});


$app->get('/media/{id:[0-9]+}', function (Request $request, Response $response, $args) {
    $loadedItem = DatabaseManager::getById("media", $args["id"]);

    if (count($loadedItem)) {
        $payload = json_encode($loadedItem);
        $response->getBody()->write($payload);
        return $response;
    } else {
        return $response->withStatus(404);
    }
});

/* list directory */
$app->get('/media/list[/{location:.*}]', function (Request $request, Response $response, $args) {
    $path = $args["location"];
    if ($path == "" || $path[0] != "/") {
        $path = "/" . $path;
    }
    $params = $request->getQueryParams();
    if ($params == null) {
        $params = [];
    }

    $pathCondition = ["type" => "where", "key" => "path", "operator" => "=", "value" => $path];
    array_push($params, $pathCondition);


    //todo contribute to sleekDB - to make
//    $collectionStore->where($fieldName, $condition, $value)
//        ->or([
//            self::createWhere($key, $operator, $value),
//            self::createWhere($key, $operator, $value),
//        ])
//        ->or([self::createWhere($key, $operator, $value)]);


    $allItems = DatabaseManager::findBy("media", $params);

    $directories = array_filter($allItems, function ($v) {
        return $v["type"] === 'directory';
    }, ARRAY_FILTER_USE_BOTH);

    $files = array_filter($allItems, function ($v) {
        return $v["type"] === 'file';
    }, ARRAY_FILTER_USE_BOTH);

    $out = new stdClass();
    $out->location = $path;
    $out->files = array_values($files);
    $out->directories = array_values($directories);

    $payload = json_encode($out);
    $response->getBody()->write($payload);
    return $response;
});

/**
 * create new directory
 */
$app->post('/media/directory', function (Request $request, Response $response, $args) {
    $inputData = $request->getParsedBody();
    $path = $inputData["location"];
    if ($path[0] != "/") {
        $path = "/" . $path;
    }

    $slugName = Utils::slugify($inputData["directory"]);
    $originName = $inputData["directory"];


    $relativePath = $path;

    /* avoid two slashes in path*/
    if (strlen($path) === 1) {
        $path = "";
    }
    $publicPath = MEDIA_STORAGE . $path . DIRECTORY_SEPARATOR . $slugName;
    $realPathToSave = MEDIA_STORAGE_ROOT . $path . DIRECTORY_SEPARATOR . $slugName;


    if (mkdir($realPathToSave)) {
        $media = new stdClass();
        $media->type = "directory";
        $media->originName = $originName;
        $media->slugName = $slugName;
        $media->path = $relativePath;
        $media->fullPath = $publicPath;
        $userId = $request->getAttribute("userId");
        $saved = DatabaseManager::insertNewVersionedRecord("media", $media, $userId);
        $payload = json_encode($saved);
        $response->getBody()->write($payload);
        return $response;
    } else {
        return $response->withStatus(503);
    }
})->addMiddleware(new JwtMiddleware());

$app->put('/media/directory', function (Request $request, Response $response, $args) {
//todo rename folder, find all files and directories containing old name and rename it
})->addMiddleware(new JwtMiddleware());


/* upload files*/

$app->post('/media/file', function (Request $request, Response $response, $args) {
    // todo handle file with same name
    $uploadedFiles = $request->getUploadedFiles();
    if (!count($uploadedFiles)) {
        $response->getBody()->write(json_encode(ErrorUtils::error(ErrorUtils::NO_CONTENT_TO_UPLOAD)));
        return $response->withStatus(404); //todo fix code
    }

    foreach ($uploadedFiles['files'] as $uploadedFile) {
        if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            $uploaded[] = Utils::moveUploadedFile($_POST["location"], $uploadedFile);
        }
    }

    $userId = $request->getAttribute("userId");
    $inserted = DatabaseManager::insertNewVersionedRecords("media", $uploaded, $userId);
    $response->getBody()->write(json_encode($inserted));
    return $response;
})->addMiddleware(new JwtMiddleware());


$app->put('/media/file', function (Request $request, Response $response, $args) {
    $inputJson = $request->getParsedBody();
    $userId = $request->getAttribute("userId");
    $inserted = DatabaseManager::updateVersionedRecord("media", $inputJson, $userId);
    $response->getBody()->write(json_encode($inserted));
    return $response;
})->addMiddleware(new JwtMiddleware());

$app->delete('/media/{id}', function (Request $request, Response $response, $args) {

    $userId = $request->getAttribute("userId");
    //load from db
    $loaded = DatabaseManager::getById("media", $args["id"]);


    //check type (file/folder)

    //if dir, then go deep and delete (no trash)
    //if file, then move to trash


    rename(__DIR__ . $loaded["publicPath"], MEDIA_STORAGE_ROOT . MEDIA_STORAGE_TRASH . '/' . $loaded["slugName"]);

    DatabaseManager::deleteById("media", $args["id"], $userId);
    unset($loaded["_id"]);

    $inserted = DatabaseManager::insertNewVersionedRecord("trash-media", $loaded, $userId);
    $response->getBody()->write(json_encode($inserted));
    return $response;
})->addMiddleware(new JwtMiddleware());

//todo empty media trash & flush caches

$app->run();

function folder_exist($folder)
{
    $path = realpath($folder);

    return ($path !== false and is_dir($path)) ? $path : false;
}