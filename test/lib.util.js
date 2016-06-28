/*
 * Copyright (c) Why Not Soluciones, S.L.
 */

/*jslint node: true */
/*jshint -W030 */
"use strict";

var dutil = require('../lib/util'),
  security = require('nas-security'),
  ObjectID = require('mongodb').ObjectID,
  expect = require('chai').expect,
  Chance = require('chance');

describe('Data Util module unit tests', function () {

  describe('owns', function () {
    it('Should return always true for root', function (done) {
      expect(dutil.owns({
        user: {
          role: security.accessLevels.root
        }
      }, {
        organization: new ObjectID()
      })).to.be.true;
      done();
    });

    it('Should return true it user organization is the same than the entity organization', function (done) {
      var organizationId = new ObjectID();
      expect(dutil.owns({
        organization: organizationId
      }, {
        organization: organizationId
      })).to.be.true;
      done();
    });

    it('Should return false it user organization is not the same than the entity organization', function (done) {
      expect(dutil.owns({
        organization: new ObjectID()
      }, {
        organization: new ObjectID()
      })).to.be.false;
      done();
    });
  });

  describe('beforeLastIndex', function () {
    it('Should remove extension from a file', function (done) {
      expect(dutil.beforeLastIndex('file-name.jpg', '.')).to.equal('file-name');
      done();
    });
    it('Should remove extension from a file containing dots in its name', function (done) {
      expect(dutil.beforeLastIndex('file.name.png', '.')).to.equal('file.name');
      done();
    });
    it('Should remove extension from a file containing dots in its name', function (done) {
      expect(dutil.beforeLastIndex('long.file.name.png', '.')).to.equal('long.file.name');
      done();
    });
    it('Should be remove last level in an URL', function (done) {
      expect(dutil.beforeLastIndex('http://www.domain.com/path1/path2', '/')).to.equal('http://www.domain.com/path1');
      done();
    });
  });

  describe('fileToCollectionName', function () {
    it('Should get a valid collection name for various files', function (done) {
      expect(dutil.fileToCollectionName('file-name.jpg', '.')).to.equal('file_name');
      expect(dutil.fileToCollectionName('User_company.jpg', '.')).to.equal('user_company');
      expect(dutil.fileToCollectionName('File Name.jpg', '.')).to.equal('file_name');
      expect(dutil.fileToCollectionName('file_name-Company.jpg', '.')).to.equal('file_name_company');
      expect(dutil.fileToCollectionName('file-name  Company', '.')).to.equal('file_name_company');
      done();
    });
  });

  describe('collectionToClassName', function () {
    it('Should get a Pascal Case Class Name for various collection names', function (done) {
      expect(dutil.collectionToClassName('file')).to.equal('File');
      expect(dutil.collectionToClassName('file_name')).to.equal('FileName');
      expect(dutil.collectionToClassName('user_company')).to.equal('UserCompany');
      expect(dutil.collectionToClassName('file_name_company')).to.equal('FileNameCompany');
      done();
    });
  });

});
