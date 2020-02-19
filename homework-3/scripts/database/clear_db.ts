import sequelize from '../../config/database';
import modelsLoader from '../../loaders/models';

(async function clear(): Promise<void> {
  try {
    await sequelize.authenticate();
    modelsLoader();
    await sequelize.drop();
    await sequelize.close();
  } catch (error) {
    console.error(`Error occured while working with database: ${error}`);
    await sequelize.close();
  }
}());
