/*
 * Copyright (c) Why Not Soluciones, S.L.
 */

/*jslint node: true */
/*jshint -W030 */
"use strict";

var transformations = require('../lib/transformations'),
  ObjectID = require('mongodb').ObjectID,
  expect = require('chai').expect;

describe('Transformation Helper', function () {
  var object = {
    id: new ObjectID(),
    name: 'Nombre',
    age: 18,
    created_at: new Date()
  };

  var transform = {
    properties: {
      id: {
        transform: transformations.mongoObjectID
      },
      created_at: {
        transform: transformations.javascriptDate
      }
    }
  };

  var cobject = {
    id: new ObjectID(),
    name: 'Nombre',
    age: 18,
    created_at: new Date(),
    updated_at: new Date(),
    organization: {
      id: new ObjectID(),
      name: 'Apple',
      created_at: new Date(),
      updated_at: new Date(),
      employees: 8302,
      locations: [{
        location: 'California',
        created_at: new Date(),
        id: new ObjectID(),
      }, {
        location: 'New York',
        created_at: new Date(),
        id: new ObjectID()
      }]
    },
    targets: [new ObjectID(), new ObjectID(), new ObjectID(), new ObjectID(), new ObjectID()],
    deliveries: [{
      mta_status: 'not-delivered',
      send_from: new Date(),
      content: 'Hello <b>Usuario</b>, welcome to bla bla bla'
    }]
  };

  var ctransform = {
    properties: {
      id: {
        transform: transformations.mongoObjectID
      },
      created_at: {
        transform: transformations.javascriptDate
      },
      updated_at: {
        transform: transformations.javascriptDate
      },
      organization: {
        properties: {
          id: {
            transform: transformations.mongoObjectID
          },
          created_at: {
            transform: transformations.javascriptDate
          },
          updated_at: {
            transform: transformations.javascriptDate
          },
          locations: {
            properties: {
              id: {
                transform: transformations.mongoObjectID
              },
              created_at: {
                transform: transformations.javascriptDate
              },
              updated_at: {
                transform: transformations.javascriptDate
              }
            }
          }
        }
      },
      targets: {
        transform: transformations.arrayMongoObjectID
      },
      deliveries: {
        properties: {
          confirmed_by_mta: {
            transform: transformations.javascriptDate
          },
          delivered_to_mta: {
            transform: transformations.javascriptDate
          },
          send_from: {
            transform: transformations.javascriptDate
          }
        }
      }
    }
  };

  it('Should parse or transform a simple object containing ObjectIDs and Dates', function (done) {
    var jsonObject = JSON.stringify(object);
    var parsedObject = JSON.parse(jsonObject);
    transformations.transform(parsedObject, transform);
    expect(parsedObject).to.deep.equal(object);
    done();
  });

  it('Should parse or transform an complex object containing ObjectIDs and Dates', function (done) {
    var jsonObject = JSON.stringify(cobject);
    var parsedObject = JSON.parse(jsonObject);
    transformations.transform(parsedObject, ctransform);
    expect(parsedObject).to.deep.equal(cobject);
    done();
  });
});
