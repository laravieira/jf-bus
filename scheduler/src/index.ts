import DotEnv from 'dotenv';
import Meta from './handlers/Meta.handler';
import Data from './handlers/Data.handler';
import SMU from './handlers/SMU.handler';

DotEnv.config();

SMU();
Meta.read()
  .then(console.debug);

Data.read()
  .then(console.debug);