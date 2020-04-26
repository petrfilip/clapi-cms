<?php

namespace App;

use Exception;
use SleekDB\SleekDB;

final class DatabaseManager
{

    static public function getMediaDataStore(): SleekDB
    {
        return DatabaseManager::getDataStore("media");
    }

    static public function getDataStore($storeName): SleekDB
    {
        return SleekDB::store($storeName, DATABASE_ROOT);
    }

    static public function findBy($collectionName, $params)
    {
        $collectionStore = DatabaseManager::getDataStore($collectionName);

        //todo
//        if ($params["where"]) {
//            foreach ($params["where"] as $where) {
//                $collectionStore->where($where["key"], $where["operator"], $where["value"]);
//            }
//        }
//
//        if ($params["search"]) {
//            foreach ($params["search"] as $search) {
//                $collectionStore->search($search["key"], $search["value"]);
//            }
//        }
//
//        if ($params["offset"]) {
//            $collectionStore->skip($params["offset"]);
//        }
//        if ($params["limit"]) {
//            $collectionStore->limit($params["limit"]);
//        }
//        if ($params["orderBy"]) {
//            $order = empty($params["order"]) ? "asc" : $params["order"];
//            $collectionStore->orderBy($order, $params["orderBy"]);
//        }
        return $collectionStore->fetch();
    }

    static public function findOneBy($collectionName, $params)
    {
        $collectionStore = DatabaseManager::getDataStore($collectionName);

        if ($params["where"]) {
            foreach ($params["where"] as $where) {
                $collectionStore->where($where["key"], $where["operator"], $where["value"]);
            }
        }
        $collectionStore->limit(1);
        return $collectionStore->fetch();
    }

    static public function createWhere($key, $operator, $value) {
        $where["key"] = $key;
        $where["operator"] = $operator;
        $where["value"] = $value;
        return $where;
    }

    static public function getById($collectionStoreName, $id)
    {
        $collectionStore = DatabaseManager::getDataStore($collectionStoreName);
        $loadedArray = $collectionStore->where("_id", "=", $id)->fetch();
        if (count($loadedArray)) {
            return $loadedArray[0];
        } else {
            return null;
        }
    }

    static public function updateById($collectionStore, $data)
    {
        $isUpdated = $collectionStore->where("_id", "=", $data["_id"])->update($data);
        if (!$isUpdated) {
            throw new Exception('Unable to update data.');
        }
    }

    static public function createAuditVersion($collectionStoreName, $data)
    {
        unset($data["_id"]);
        $store = DatabaseManager::getDataStore($collectionStoreName . "-archiving");
        $store->insert($data);
    }

    static public function updateVersionedRecord($collectionName, $data, $userId, $createAudit = true)
    {
        $collectionStore = DatabaseManager::getDataStore($collectionName);
        $id = $data["_id"];
        if (empty($id)) {
            throw new Exception("Missing ID");
        }

        $loadVersion = DatabaseManager::getById($collectionName, $id);

        $data["sys"]["version"] = $data["sys"]["version"] + 1;
        $data["sys"]["updated"] = Utils::getCurrentDateTime();
        $data["sys"]["updatedBy"] = $userId;
        DatabaseManager::updateById($collectionStore, $data);

        if ($createAudit) {
            DatabaseManager::createAuditVersion($collectionName, $loadVersion);
        }
        return $data;
    }

    static public function insertNewVersionedRecord($collectionName, $data, $userId)
    {
        $data = (array) $data;
        $data["sys"]["version"] = 1;
        $data["sys"]["created"] = Utils::getCurrentDateTime();
        $data["sys"]["updated"] = Utils::getCurrentDateTime();
        $data["sys"]["createBy"] = $userId;
        $collectionStore = DatabaseManager::getDataStore($collectionName);
        return $collectionStore->insert($data);
    }

    static public function insertNewVersionedRecords($collectionName, $data, $userId)
    {
        $now = Utils::getCurrentDateTime();
        foreach ($data as $item) {
            $item = (array) $item;
            $item["sys"]["version"] = 1;
            $item["sys"]["created"] = $now;
            $item["sys"]["updated"] = $now;
            $item["sys"]["createBy"] = $userId;
            $items[] = $item;
        }

        $collectionStore = DatabaseManager::getDataStore($collectionName);
        return $collectionStore->insertMany($items);
    }


}