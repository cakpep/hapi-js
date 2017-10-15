var Knex = require('../Config/knex');

exports.findAll = function findAll() {
    // In general, the Knex operation is like Knex('TABLE_NAME').where(...).chainable(...).then(...)
    return Knex( 'birds' ).select().then( ( results ) => {

        if( !results || results.length === 0 ) {
            return {
                error: false,
                errMessage: 'no birds found',
            };
        }

        return {
            error: false,
            dataCount: results.length,
            data: results,
        };

    } ).catch( ( err ) => {
        return {
            error: true,
            errMessage: 'server-side error',
        };
    } );
};

exports.findById = function findById(id) {
    return Knex( 'birds' ).where( {
        id: id
    } ).select( 'name', 'species', 'picture_url' ).then( ( results ) => {

        if( !results || results.length === 0 ) {
            return {
                error: false,
                errMessage: 'no bird found',
            };
        }

        return {
            error: false,
            data: results,
        };

    } ).catch( ( err ) => {
        return {
            error: true,
            errMessage: 'server-side error',
        };
    } );
};