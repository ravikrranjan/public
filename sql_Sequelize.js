import { Dialect, Sequelize } from "sequelize";
import logger from "../app-logger";

import dbConfig from "../config/db.config";
const sequelize = new Sequelize((dbConfig.CLEARDB_DATABASE_URL || dbConfig.DATABASE_URL), {
	dialect: dbConfig.dialect as Dialect,
	// sync: { force: true },
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

import { StoreFactory } from "./Store";
db.stores = StoreFactory(sequelize);
import { MessageFactory } from "./Message";
db.messages = MessageFactory(sequelize);
logger.debug("Messages=>", { messages: db.messages });

export { db };



//Message.ts

import { Model, Sequelize, DataTypes, TIME, BuildOptions } from "sequelize";

// We need to declare an interface for our model that is basically what our class would be
export interface MessageI {
	id: number;
	store_url: string;
	store_name: string;
	store_id: number;
	messages: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
}
// export interface StoreModel extends Model<StoreI>, StoreI {}
export class Message extends Model {
	public id!: number;
	public store_url!: string;
	public store_name!: string;
	public store_id!: number;
	public messages!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export const MessageFactory = (sequelize: Sequelize) => {
	return Message.init(
		{
			id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
			store_url: { type: DataTypes.STRING, unique: true, allowNull: false },
			store_name: { type: DataTypes.STRING, defaultValue: "" },
			store_id: { type: DataTypes.BIGINT },
			messages: { type: DataTypes.TEXT },
			timestamps: { type: DataTypes.DATE },
		},
		{
			// Other model options go here
			sequelize, // We need to pass the connection instance
			modelName: "Message", // We need to choose the model name,
			tableName: "messages",
			timestamps: true,
		}
	);
};

