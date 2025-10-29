/* eslint-disable no-plusplus */

// const jwt = require('jsonwebtoken');
// const { pick } = require('lodash');
// const config = require('../config/config');
// const RegexEscape = require('regex-escape');
// const geolib = require('geolib');
// const moment = require('moment');


const getSortOptions = query => {
    const sort = {};
    if (query.sortBy) {
        query.sortBy.split(',').map((res, i) => {
            if (res) {
                const parts = res.split(':');
                sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
            }
        })
    } else {
        sort['_id'] = -1
    }
    return sort;
};

const getQueryOptions = query => {
    const page = query.page * 1 || 1;
    const limit = query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    let sort = {};
    if (query.sortBy) {
        const parts = query.sortBy.split(':');
        // console.log(parts[1]);
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } else {
        sort = { 'createdAt': -1 }
    }
    // console.log("Limit", limit, "Skip :", skip, "Sort :", sort, "page: ", page);
    return { limit, skip, sort, page };
};
module.exports = {
    getSortOptions,
    getQueryOptions
}