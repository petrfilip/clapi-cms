<?php

use App\DatabaseManager;
use App\ErrorUtils;
use App\Middleware\CorsMiddleware;
use App\Middleware\JwtMiddleware;
use App\Utils;
use Firebase\JWT\JWT;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Psr7\Stream;

require __DIR__ . '/../vendor/autoload.php';
require './../src/Middleware/CorsMiddleware.php';
require './../src/Middleware/JwtMiddleware.php';
require './../src/Model/ApplicationError.php';
require './../src/ErrorUtils.php';
require './../src/DatabaseManager.php';
require './../src/Utils.php';
require './../src/MIME.php';
define("DATABASE_ROOT", __DIR__ . "/../database");
define("MEDIA_STORAGE", "/media-storage");
define("MEDIA_STORAGE_ROOT", __DIR__ . MEDIA_STORAGE);
define("JWT_KEY", "example_key");


$app = AppFactory::create();

$app->add(JwtMiddleware::class);
$app->add(CorsMiddleware::class);

$app->addBodyParsingMiddleware();
$app->addErrorMiddleware(true, true, true);
$app->addRoutingMiddleware();


$container = $app->getContainer();


$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("test");
    return $response;
});

$app->post('/login', function (Request $request, Response $response, $args) {
    $inputJson = $request->getParsedBody();
    $userStore = DatabaseManager::getDataStore("user");

    // verify credentials
    $loadedUser = $userStore->where("email", "=", $inputJson["email"])->fetch();
    if (!password_verify($inputJson["password"], $loadedUser[0]["password"])) {
        $response->getBody()->write(json_encode(ErrorUtils::error(ErrorUtils::BAD_LOGIN)));
        return $response->withStatus(404);
    }


    // create token
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
    $userStore = DatabaseManager::getDataStore("user");
    $userId = $request->getAttribute("userId");


    $user = new stdClass();
    $user->email = $inputJson["email"];
    $user->password = password_hash($inputJson["password"], PASSWORD_BCRYPT);

    $savedUser = DatabaseManager::insertNewVersionedRecord("user", $user, $userId);
    unset($savedUser["password"]);
    $response->getBody()->write(json_encode($savedUser));
    return $response;
});

/* update user*/

$app->put('/user', function (Request $request, Response $response, $args) {
    $inputJson = $request->getParsedBody(); //todo

    $response->getBody()->write(json_encode($inputJson));
    return $response;
});


/* DOCUMENT API */
$app->get('/collection/{collection}', function (Request $request, Response $response, $args) {
    $params = $request->getQueryParams();
    $loadedData = DatabaseManager::findBy($args["collection"], $params);

    $payload = json_encode($loadedData);
    $response->getBody()->write($payload);
    return $response;
});

$app->get('/collection/type-definition/{collectionName}', function (Request $request, Response $response, $args) {
    $collectionStore = DatabaseManager::getDataStore("type-definition");

    $loadedDefinition = $collectionStore->where("collectionName", "=", $args["collectionName"])->fetch();
    if (is_array($loadedDefinition) && count($loadedDefinition)) {
        $payload = json_encode($loadedDefinition[0]);
        $response->getBody()->write($payload);
        return $response;
    } else {
        return $response->withStatus(404);
    }
});

$app->get('/collection/{collection}/{id}', function (Request $request, Response $response, $args) {
    $collectionStore = DatabaseManager::getDataStore($args["collection"]);
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

    if (count($collectionStore->where("collectionName", "=", $collectionName)->fetch())) {
        return $response->withStatus(503);
    } else {
        $userId = $request->getAttribute("userId");
        $inserted = DatabaseManager::insertNewVersionedRecord("type-definition", $data, $userId);
        $response->getBody()->write(json_encode($inserted));
        return $response;
    }
});

$app->put('/collection/type-definition', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();
    $userId = $request->getAttribute("userId");
    $updated = DatabaseManager::updateVersionedRecord("type-definition", $data, $userId);
    $response->getBody()->write(json_encode($updated));
    return $response;
});

$app->options('{route:.*}', function (Request $request, Response $response, $args) {
    return $response;
});

$app->post('/collection/{collection}', function (Request $request, Response $response, $args) use ($app) {
    $data = $request->getParsedBody();
    $userId = $request->getAttribute("userId");
    $inserted = DatabaseManager::insertNewVersionedRecord($args["collection"], $data, $userId);
    $response->getBody()->write(json_encode($inserted));
    return $response;
});


$app->put('/collection/{collection}', function (Request $request, Response $response, $args) {
    $inputJson = $request->getParsedBody();
    $userId = $request->getAttribute("userId");
    $updated = DatabaseManager::updateVersionedRecord($args["collection"], $inputJson, $userId);
    $response->getBody()->write(json_encode($updated));
    return $response;
});

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
            ->withHeader('Content-Disposition', 'attachment; ' . $loadedItem["originName"] . ';')
            ->withHeader('Content-Type', mime_content_type($path))
            ->withHeader('Content-Length', filesize($path))
            ->withHeader('Expires', '0')
            ->withHeader('Cache-Control', 'must-revalidate, post-check=0, pre-check=0');
    } else {
        return $response->withStatus(404);
    }
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
});

/* upload files*/

$app->post('/media/file', function (Request $request, Response $response, $args) {

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
});

$app->put('/media/file', function (Request $request, Response $response, $args) {
    $inputJson = $request->getParsedBody();
    $userId = $request->getAttribute("userId");
    $inserted = DatabaseManager::updateVersionedRecord("media", $inputJson, $userId);
    $response->getBody()->write(json_encode($inserted));
    return $response;
});


$app->run();