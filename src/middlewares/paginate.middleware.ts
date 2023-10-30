import { NextFunction, Request, RequestHandler, Response } from 'express';
import { PaginationQuery } from '../interfaces';

interface PaginatedData {
  rows: any[];
  count: number;
}

const paginate = (data: PaginatedData, page: number, perPage: number) => {
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

export const paginateMiddleware: RequestHandler<
  object,
  object,
  object,
  PaginationQuery
> = (
  req: Request<object, object, object, PaginationQuery>,
  res: Response,
  next: NextFunction
) => {
  if (req.method !== 'GET') return next();

  let oldSend = res.send;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : 1;

  res.send = function (data) {
    let parsedData = JSON.parse(data);
    res.send = oldSend;

    if (parsedData?.error) return res.send(parsedData);

    const paginatedData = paginate(parsedData, page, perPage);
    return res.send(paginatedData);
  };

  next();
};
