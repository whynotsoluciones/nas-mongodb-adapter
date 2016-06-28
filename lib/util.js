/*
 * Copyright (c) Why Not Soluciones, S.L.
 */

/*jslint node: true */
/*jshint -W030 */
"use strict";

var security = require('nas-security'),
  changeCase = require('change-case');

/**
 * Request user/app owns the entity?
 * @param  {[type]} req    [description]
 * @param  {[type]} entity [description]
 * @return {[type]}        [description]
 */
exports.owns = function (req, entity) {
  // Root access level OR user/app organization is the same than entity organization
  return ((req.user && security.allow(req.user, security.accessLevels.root)) ||
    (entity.organization !== undefined && entity.organization.equals !== undefined &&
      entity.organization.equals(req.organization)));
};

/**
 * Remove last part in string based on delimiter. For example, it can remove extension from a file name
 * @param  {[type]} str       [description]
 * @param  {[type]} delimiter [description]
 * @return {[type]}           [description]
 */
exports.beforeLastIndex = function (str, delimiter) {
  return str.split(delimiter).slice(0, -1).join(delimiter) || str + "";
};

/**
 * Given a file name, returns its corresponding Collection Name
 * @param  {[type]} fileName [description]
 * @return {[type]}          [description]
 */
exports.fileToCollectionName = function (fileName) {
  return changeCase.snakeCase(module.exports.beforeLastIndex(fileName.toLowerCase(), '.'));
};

/**
 * Given a collection name, returns its corresponding class Name
 * @param  {[type]} collectionName [description]
 * @return {[type]}                [description]
 */
exports.collectionToClassName = function (collectionName) {
  return changeCase.pascalCase(collectionName);
};
