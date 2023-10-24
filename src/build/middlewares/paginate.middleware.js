"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateMiddleware = void 0;
const paginate = (data) => {
    const totalPages = Math.ceil(data.count / data.perPage);
    const totalPerPage = data.perPage;
    const currentPage = data.page;
    const prevPage = currentPage === 1 ? null : currentPage - 1;
    const nextPage = currentPage >= totalPages ? null : currentPage + 1;
    return {
        data: data.data,
        pagination: {
            totalRecords: data.count,
            totalPerPage: totalPerPage > data.count ? data.count : totalPerPage,
            totalPages,
            currentPage,
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
            res.send(parsedData);
        const result = paginate({
            data: parsedData.rows,
            count: parsedData.count,
            page,
            perPage
        });
        return res.send(result);
    };
    next();
};
exports.paginateMiddleware = paginateMiddleware;
//# sourceMappingURL=paginate.middleware.js.map