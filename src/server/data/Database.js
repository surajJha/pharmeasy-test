/**
 * Created by surajjha on 02/06/18.
 */
/**
 * @module Database
 */

/**
 * this module creates an instance of lowdb database and returns it.
 * The database is file system and json based.
 */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./src/server/data/data.json');

const db = low(adapter);

module.exports = db;
