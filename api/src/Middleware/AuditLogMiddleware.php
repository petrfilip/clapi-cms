<?php

namespace App\Middleware;

use App\DatabaseManager;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;


final class AuditLogMiddleware implements MiddlewareInterface
{

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {

        $response =  $handler->handle($request);

        $userId = $request->getAttribute("userId");
        //todo update audit log
        /**
         * data structure: userId x year :
         * {
         *      type: entry
         *      objectId: 15
         *      objectDescription: title
         *      operation: update|delete|create
         *      operationDescription: file moved from / to /home
         * }
         */

        return $response;
    }
}