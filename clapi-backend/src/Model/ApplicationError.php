<?php

namespace App\Model;

use App\Utils;

final class ApplicationError
{
    protected $errorCode;
    protected $errorDescription;
    protected $timestamp;

    /**
     * ApplicationError constructor.
     * @param $errorCode
     * @param $errorDescription
     */
    public function __construct($errorCode, $errorDescription)
    {
        $this->errorCode = $errorCode;
        $this->errorDescription = $errorDescription;
        $this->timestamp = Utils::getCurrentDateTime();
    }


    /**
     * @return mixed
     */
    public function getErrorCode()
    {
        return $this->errorCode;
    }

    /**
     * @return mixed
     */
    public function getErrorDescription()
    {
        return $this->errorDescription;
    }

    /**
     * @return mixed
     */
    public function getTimestamp()
    {
        return $this->timestamp;
    }




}