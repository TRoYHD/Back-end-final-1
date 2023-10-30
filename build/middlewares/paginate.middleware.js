"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateMiddleware = void 0;
const paginate = (data, page, perPage) => {
    const totalPages = Math.ceil(data.count / perPage);
    const totalPerPage = perPage > data.count ? data.count : perPage;
    const prevPage = page === 1 ? null : page - 1;
    const nextPage = page >= totalPages ? null : page + 1;
    return {
        data: data.rows,
        pagination: {
            totalRecords: data.count,
            totalPerPage,
            totalPages,
            currentPage: page,
            nextPage,
            prevPage
        }
    };
};
const paginateMiddleware = (req, res, next) => {
    if (req.method !== 'GET')
        return next();
    let oldSend = res.send;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
    res.send = function (data) {
        let parsedData = JSON.parse(data);
        res.send = oldSend;
        if (parsedData === null || parsedData === void 0 ? void 0 : parsedData.error)
            return res.send(parsedData);
        const paginatedData = paginate(parsedData, page, perPage);
        return res.send(paginatedData);
    };
    next();
};
exports.paginateMiddleware = paginateMiddleware;
//# sourceMappingURL=paginate.middleware.js.map