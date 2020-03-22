import sequelize from '../../config/database';
import modelsLoader from '../../loaders/models';

import createUsersTable from './create_users_table';
import createGroupsTable from './create_groups_table';
import createUsersGroupsTable from './create_users-groups_table';

(async function seed(): Promise<void> {
  try {
    await sequelize.authenticate();

    modelsLoader();

    await createUsersTable();
    await createGroupsTable();
    await createUsersGroupsTable();

    await sequelize.close();
  } catch (error) {
    console.error(`Error occured while working with database: ${error}`);
    await sequelize.close();
  }
}());
