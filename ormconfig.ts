export const ormconfig = {
  type       : 'postgres',
  port       : 5432,
  host       : process.env.POSTGRES_HOST     || '127.0.0.1',
  username   : process.env.POSTGRES_USER     || 'postgres',
  database   : process.env.POSTGRES_DATABASE || 'postgres',
  password   : process.env.POSTGRES_PASSWORD || 'password',
  logging    : true,
  synchronize: process.env.NODE_ENV !== 'production',
  entities   : ['src/**/*.entity.ts'],
  migrations : ['src/migrations/*.ts'],
  cli        : {
    migrationsDir: 'src/migrations'
  },
};

export default {...ormconfig};