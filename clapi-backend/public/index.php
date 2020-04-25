<?php

use App\Middleware\CorsMiddleware;
use App\Middleware\JwtMiddleware;
use Firebase\JWT\JWT;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use SleekDB\SleekDB;
use Slim\Factory\AppFactory;
use Slim\Psr7\UploadedFile;

require __DIR__ . '/../vendor/autoload.php';
require './../src/Middleware/CorsMiddleware.php';
require './../src/Middleware/JwtMiddleware.php';


$app = AppFactory::create();

$app->add(JwtMiddleware::class);
$app->add(CorsMiddleware::class);


$app->addBodyParsingMiddleware();
// The RoutingMiddleware should be added after our CORS middleware so routing is performed first
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);


/**
 * @param $args
 * @return SleekDB
 * @throws Exception
 */

function getMediaDataStore(): SleekDB
{
    $dataDir = "./database";
    return SleekDB::store("media", $dataDir);
}

function getDataStore($storeName): SleekDB
{
    $dataDir = "./database";
    return SleekDB::store($storeName, $dataDir);
}

function getSecuredKey()
{
    return "example_key";
}

function getById($collectionStore, $id)
{
    $loadedArray = $collectionStore->where("_id", "=", $id)->fetch();
    if (count($loadedArray)) {
        return $loadedArray[0];
    } else {
        return null;
    }
}

function updateById($collectionStore, $data)
{
    $isUpdated = $collectionStore->where("_id", "=", $data["_id"])->update($data);
    if (!$isUpdated) {
        throw new Exception('Unable to update data.');
    }
}

function createAuditVersion($collectionStoreName, $data)
{
    unset($data["_id"]);
    $store = getDataStore($collectionStoreName . "-archiving");
    $store->insert($data);
}

function getCurrentDateTime()
{
    $date = new DateTime();
    return $date->format('Y-m-d H:i:s');
}

function updateVersionedRecord($collectionName, $data, $userId, $createAudit = true)
{
    $collectionStore = getDataStore($collectionName);
    $id = $data["_id"];
    if (empty($id)) {
        throw new Exception("Missing ID");
    }

    $loadVersion = getById($collectionStore, $id);

    $data["sys"]["version"] = $data["sys"]["version"] + 1;
    $data["sys"]["updated"] = getCurrentDateTime();
    $data["sys"]["updatedBy"] = $userId;
    updateById($collectionStore, $data);

    if ($createAudit) {
        createAuditVersion($collectionName, $loadVersion);
    }
    return $data;
}

function insertNewVersionedRecord($collectionName, $data, $userId)
{
    $data["sys"]["version"] = 1;
    $data["sys"]["created"] = getCurrentDateTime();
    $data["sys"]["updated"] = getCurrentDateTime();
    $data["sys"]["createBy"] = $userId;
    $collectionStore = getDataStore($collectionName);
    return $collectionStore->insert($data);
}


$container = $app->getContainer();


$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("test");
    return $response;
});

$app->post('/login', function (Request $request, Response $response, $args) {
    $inputJson = $request->getParsedBody();
    $userStore = getDataStore("user");

    // verify credentials
    $loadedUser = $userStore->where("email", "=", $inputJson["email"])->fetch();
    if (!password_verify($inputJson["password"], $loadedUser[0]["password"])) {
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
    $jwt = JWT::encode($payload, getSecuredKey()); //todo fix getSecuredKey


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
    $userStore = getDataStore("user");
    $userId = $request->getAttribute("userId");


    $user = new stdClass();
    $user->email = $inputJson["email"];
    $user->password = password_hash($inputJson["password"], PASSWORD_BCRYPT);

    $savedUser = insertNewVersionedRecord("user", $user, $userId);
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
    $collectionStore = getDataStore($args["collection"]);
    $loadedData = $collectionStore->fetch();

    $payload = json_encode($loadedData);
    $response->getBody()->write($payload);
    return $response;
});

$app->get('/collection/type-definition/{collectionName}', function (Request $request, Response $response, $args) {
    $collectionStore = getDataStore("type-definition");

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
    $collectionStore = getDataStore($args["collection"]);
    $loadedData = $collectionStore->where("_id", "=", $args["id"])->fetch();

    if (is_array($loadedData) && count($loadedData)) {
        $payload = json_encode($loadedData[0]);
        $response->getBody()->write($payload);
        return $response;
    } else {
        return $response->withStatus(404);
    }
});


$app->post('/collection/type-definition', function (Request $request, Response $response, $args) {
    $collectionStore = getDataStore("type-definition");
    $data = $request->getParsedBody();
    $collectionName = $data["collectionName"];

    if (count($collectionStore->where("collectionName", "=", $collectionName)->fetch())) {
        return $response->withStatus(503);
    } else {
        $userId = $request->getAttribute("userId");
        $inserted = insertNewVersionedRecord("type-definition", $data, $userId);
        $response->getBody()->write(json_encode($inserted));
        return $response;
    }
});

$app->put('/collection/type-definition', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();
    $userId = $request->getAttribute("userId");
    $updated = updateVersionedRecord("type-definition", $data, $userId);
    $response->getBody()->write(json_encode($updated));
    return $response;
});

$app->options('{route:.*}', function (Request $request, Response $response, $args) {
    return $response;
});

$app->post('/collection/{collection}', function (Request $request, Response $response, $args) use ($app) {
    $data = $request->getParsedBody();
    $userId = $request->getAttribute("userId");
    $inserted = insertNewVersionedRecord($args["collection"], $data, $userId);
    $response->getBody()->write(json_encode($inserted));
    return $response;
});


$app->put('/collection/{collection}', function (Request $request, Response $response, $args) {
    $inputJson = $request->getParsedBody();
    $userId = $request->getAttribute("userId");
    $updated = updateVersionedRecord($args["collection"], $inputJson, $userId);
    $response->getBody()->write(json_encode($updated));
    return $response;
});

/* MEDIA API */

/* get file by id*/
$app->get('/media/{id:[0-9]+}', function (Request $request, Response $response, $args) {
    $collectionStore = getMediaDataStore();
    $loadedItem = ($collectionStore
        ->where("_id", "=", $args["id"])
        ->fetch());

    if (count($loadedItem)) {
        $payload = json_encode($loadedItem[0]);
        $response->getBody()->write($payload);
        return $response;
    } else {
        return $response->withStatus(404);
    }
});

/* list directory */
$app->get('/media/list[/{location:.*}]', function (Request $request, Response $response, $args) {
    $collectionStore = getMediaDataStore();
    $path = $args["location"];
    if ($path == "" || $path[0] != "/") {
        $path = "/" . $path;
    }
    $allItems = ($collectionStore
        ->where("path", "=", $path)
//        ->orderBy('asc', 'originName')
        ->fetch());

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
    $collectionStore = getMediaDataStore();
    $inputData = $request->getParsedBody();
    $path = $inputData["location"];
    if ($path == "" || $path[0] != "/") {
        $path = "/" . $path;
    }
    //todo remove last slash
    $slugName = slugify($inputData["directory"]);
    $originName = $inputData["directory"];
    $fullPath = "media-storage" . $path . DIRECTORY_SEPARATOR . $slugName;
    if (mkdir($fullPath)) {
        $media = new stdClass(); //todo MediaApiClass
        $media->type = "directory";
        $media->originName = $originName;
        $media->slugName = $slugName;
        $media->path = $path;
        $media->fullPath = $fullPath;
        $saved = $collectionStore->insertMany([$media]); //todo [] is hack with insertMany

        $payload = json_encode($saved[0]);
        $response->getBody()->write($payload);
        return $response;
    } else {
        return $response->withStatus(503);
    }
});

/* upload files*/

$app->post('/media/upload', function (Request $request, Response $response, $args) {
    $directory = './media-storage';
    $collectionStore = getMediaDataStore();


    $uploadedFiles = $request->getUploadedFiles();
    if (!count($uploadedFiles)) {
        return $response->withStatus(404);
    }

    foreach ($uploadedFiles['files'] as $uploadedFile) {
        if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            $uploaded[] = moveUploadedFile($_POST["location"], $directory, $uploadedFile);
        }
    }
    $inserted = $collectionStore->insertMany($uploaded);
    $response->getBody()->write(json_encode($inserted));
    return $response;
});

function moveUploadedFile($location, $directory, UploadedFile $uploadedFile)
{
    if ($location == "") {
        $location = "/";
    }

    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $slugName = pathinfo($uploadedFile->getClientFilename(), PATHINFO_FILENAME);
    $slugName = slugify($slugName);

    $slugName = sprintf('%s.%0.8s', $slugName, $extension);

    $path = $location . DIRECTORY_SEPARATOR . $slugName;
    $fullPath = $directory . $path;
    $uploadedFile->moveTo($fullPath);

    $media = new stdClass();
    $media->type = "file";
    $media->originName = $uploadedFile->getClientFilename();
    $media->slugName = $slugName;
    $media->path = $location;
    $media->fullPath = $fullPath;
    $media->attributes = [
        'size' => $uploadedFile->getSize(),
        'type' => $uploadedFile->getClientMediaType()
    ];
    return $media;
}

function slugify($text)
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

$app->run();