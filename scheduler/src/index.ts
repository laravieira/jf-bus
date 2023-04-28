import DotEnv from 'dotenv';
import SMU from './handlers/SMU.handler';

DotEnv.config();

SMU().catch(console.error);
