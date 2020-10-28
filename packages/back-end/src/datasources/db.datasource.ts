// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';

// TODO: make this configuration .env based
const config = {
  name: 'db',
  connector: 'mssql',
  url: 'mssql://sherpauser:SherpaUser@123@43.255.152.21/DBSHERPA_TEST',

  "options": {
    "encrypt": true,
    "enableArithAbort": true
    },  
};

export class DbDataSource extends juggler.DataSource {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
