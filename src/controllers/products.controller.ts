import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Brand, Category, Product } from '../models';
import { CustomError } from '../middlewares/errors';
import httpStatus from 'http-status';
import { Op } from 'sequelize';
import { validateProduct } from '../validators';
import { Product as ProductDTO } from '../validators/product.validator';
import { Params, PaginationQuery } from '../interfaces';
import { ParamsDictionary, QueryString } from '../interfaces'; // Import necessary types

const getProducts: RequestHandler<
  object,
  object,
  object,
  PaginationQuery & { discount: string }
> = async (
  req: Request<object, object, object, PaginationQuery & { discount: string }>,
  res: Response
) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
  const discount = req.query.discount;

  let where: { discount?: any } = {};

  if (discount) {
    where.discount = {
      [Op.gte]: parseInt(discount)
    };
  }

  const { count, rows } = await Product.findAndCountAll({
    where,
    offset: (page - 1) * perPage,
    limit: perPage,
    distinct: true
  });

  res.json({ count, rows });
};

const getProduct: RequestHandler<Params> = async (
  req: Request<Params>,
  res: Response<Product>
) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product)
    throw new CustomError('Product not found', httpStatus.NOT_FOUND);

  res.json(product);
};

const createProduct: RequestHandler = async (
  req: Request<object, object, ProductDTO>,
  res: Response
) => {
  const body = validateProduct(req.body);

  const category = await Category.findByPk(body.category_id);
  const brand = await Brand.findByPk(body.brand_id);

  if (!category)
    throw new CustomError('Category not found', httpStatus.NOT_FOUND);
  if (!brand) throw new CustomError('Brand not found', httpStatus.NOT_FOUND);

  const product = await Product.create({
    ...body
  });

  res.status(httpStatus.CREATED).json(product);
};

const getProductsByDiscount: RequestHandler<
  object,
  object,
  object,
  PaginationQuery
> = async (
  req: Request<object, object, object, PaginationQuery>,
  res: Response
) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;

  const { count: filteredCount, rows: filteredRows } = await Product.findAndCountAll({
    where: {
      discount: { [Op.gte]: 15 }
    }
  });

  const filteredProducts = filteredRows.filter(product => {
    const discountedPrice = product.price - (product.price * (product.discount / 100));
    return discountedPrice >= product.price * 0.15;
  });

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({ count: paginatedProducts.length, rows: paginatedProducts });
};

const getPopularInTheCommunity: RequestHandler<
  object,
  object,
  object,
  PaginationQuery
> = async (
  req: Request<object, object, object, PaginationQuery>,
  res: Response
) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
  const { count, rows } = await Product.findAndCountAll({
    where: {
      rating: {
        [Op.gte]: 4.5
      }
    },
    offset: (page - 1) * perPage,
    limit: perPage,
    distinct: true
  });

  res.json({ count, rows });
};

const getLimitedEditionProducts: RequestHandler<
  object,
  object,
  object,
  PaginationQuery
> = async (
  req: Request<object, object, object, PaginationQuery>,
  res: Response
) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;

  const { count, rows } = await Product.findAndCountAll({
    where: {
      isLimited: true,
      stock: {
        [Op.lt]: 20,
      },
    },
    offset: (page - 1) * perPage,
    limit: perPage,
    distinct: true
  });

  res.json({ count, rows });
};

const getNewArrivals: RequestHandler<
  object,
  object,
  object,
  PaginationQuery
> = async (
  req: Request<object, object, object, PaginationQuery>,
  res: Response
) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = req.query.perPage ? parseInt(req.query.perPage) : 4;

  const currentDate = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

  const { count, rows } = await Product.findAndCountAll({
    where: {
      createdAt: {
        [Op.between]: [threeMonthsAgo, currentDate]
      }
    },
    offset: (page - 1) * perPage,
    limit: perPage,
    distinct: true
  });

  res.json({ count, rows });
};

const getHandpickedCollections = async (
  req: Request<any, any, any, PaginationQuery>,
  res: Response
) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = req.query.perPage ? parseInt(req.query.perPage) : 4;
  try {
    const { count, rows } = await Product.findAndCountAll({
      where: {
        [Op.and]: [{ rating: { [Op.gt]: 4.5 } }, { price: { [Op.lt]: 100 } }]
      },
    offset: (page - 1) * perPage,
    limit: perPage,
    distinct: true
    });

    res.json({ count, rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const searchProducts: RequestHandler<
  object,
  object,
  object,
  PaginationQuery & { keyword: string }
> = async (
  req: Request<object, object, object, PaginationQuery & { keyword: string }>,
  res: Response
) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
  const keyword = req.query.keyword ?? '';

  const { count, rows } = await Product.findAndCountAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${keyword}%` } },
        { '$brand.name$': { [Op.like]: `%${keyword}%` } }
      ]
    },
    include: [
      {
        model: Brand,
        where: {}
      }
    ],
    offset: (page - 1) * perPage,
    limit: perPage,
    distinct: true
  });

  res.json({ count, rows });
};

export {
  getProducts,
  getProduct,
  createProduct,
  getPopularInTheCommunity,
  getLimitedEditionProducts,
  searchProducts,
  getNewArrivals,
  getHandpickedCollections,
  getProductsByDiscount
};