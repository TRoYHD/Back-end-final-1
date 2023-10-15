import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Brand, Category, Product, ProductImages } from '../models';
import { CustomError } from '../middlewares/errors';
import httpStatus from 'http-status';
import cloudinary from '../config/cloudinary.config';
import { Op } from 'sequelize';
import { validateProduct } from '../validators';
import { Product as ProductDTO } from '../validators/product.validator';
import { Params, PaginationQuery } from '../interfaces';

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
    include: { model: ProductImages },
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

  const product = await Product.findByPk(id, {
    include: { model: ProductImages }
  });

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
    include: {
      model: ProductImages
    },
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

const getLimitedEdtionProducts: RequestHandler<
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
    include: {
      model: ProductImages
    },
    where: {
      isLimited: true
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
  const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;

  const currentDate = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

  const { count, rows } = await Product.findAndCountAll({
    include: [ProductImages],
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

const getHandpickedCollections: RequestHandler<
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
    include: {
      model: ProductImages
    },
    where: {
      [Op.and]: [{ rating: { [Op.gt]: 4.5 } }, { price: { [Op.lt]: 100 } }]
    },
    offset: (page - 1) * perPage,
    limit: perPage,
    distinct: true
  });

  res.json({ count, rows });
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
      },
      { model: ProductImages }
    ],
    offset: (page - 1) * perPage,
    limit: perPage,
    distinct: true
  });

  res.json({ count, rows });
};

const uploadProductImage: RequestHandler<Params> = async (
  req: Request<Params>,
  res: Response
) => {
  const { id } = req.params;
  if (req.files && req.files.image && !Array.isArray(req.files.image)) {
    const imgTempPath = req.files.image.tempFilePath;
    const result = await cloudinary.uploader.upload(imgTempPath);

    const image = result.url;
    const product = await Product.findByPk(id, {
      include: { model: ProductImages }
    });

    if (!product)
      throw new CustomError('Product not found', httpStatus.NOT_FOUND);

    await product.addImage(image);

    return res
      .status(httpStatus.CREATED)
      .json({ msg: 'Uploaded successfully' });
  }

  res
    .status(httpStatus.UNPROCESSABLE_ENTITY)
    .json({ msg: 'Please upload an image' });
};

export {
  getProducts,
  getProduct,
  createProduct,
  getPopularInTheCommunity,
  uploadProductImage,
  getLimitedEdtionProducts,
  searchProducts,
  getNewArrivals,
  getHandpickedCollections
};
