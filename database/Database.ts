import { Sequelize } from "sequelize";
import config from "../config/environment";

class Database {
  private static sequelize: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.sequelize) {
      Database.sequelize = new Sequelize(config.database.uri, {
        logging: console.log,
      });
    }
    return Database.sequelize;
  }
}

export default Database;
