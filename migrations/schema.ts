import { pgTable, foreignKey, pgEnum, serial, text, integer, boolean, unique, timestamp } from "drizzle-orm/pg-core"
export const type = pgEnum("type", ['ASSIST', 'SELECT'])


export const lessons = pgTable("lessons", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	unitId: integer("unit_id").notNull().references(() => units.id, { onDelete: "cascade" } ),
	order: integer("order").notNull(),
});

export const challengeProgress = pgTable("challenge_progress", {
	id: serial("id").primaryKey().notNull(),
	userId: text("user_id").notNull(),
	challengeId: integer("challenge_id").notNull().references(() => challenges.id, { onDelete: "cascade" } ),
	completed: boolean("completed").default(false).notNull(),
});

export const userSubscription = pgTable("user_subscription", {
	id: serial("id").primaryKey().notNull(),
	userId: text("user_id").notNull(),
	chapaTxRef: text("chapa_tx_ref").notNull(),
	chapaPaymentStatus: text("chapa_payment_status").notNull(),
	chapaPaymentTime: timestamp("chapa_payment_time", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		userSubscriptionUserIdUnique: unique("user_subscription_user_id_unique").on(table.userId),
		userSubscriptionChapaTxRefUnique: unique("user_subscription_chapa_tx_ref_unique").on(table.chapaTxRef),
	}
});

export const challenges = pgTable("challenges", {
	id: serial("id").primaryKey().notNull(),
	lessonId: integer("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" } ),
	type: type("type").notNull(),
	question: text("question").notNull(),
	order: integer("order").notNull(),
});

export const challengeOptions = pgTable("challenge_options", {
	id: serial("id").primaryKey().notNull(),
	challengeId: integer("challenge_id").notNull().references(() => challenges.id, { onDelete: "cascade" } ),
	text: text("text").notNull(),
	correct: boolean("correct").notNull(),
	imageSrc: text("image_src"),
	audioSrc: text("audio_src"),
});

export const units = pgTable("units", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	courseId: integer("course_id").notNull().references(() => courses.id, { onDelete: "cascade" } ),
	order: integer("order").notNull(),
});

export const userProgress = pgTable("user_progress", {
	userId: text("user_id").primaryKey().notNull(),
	userName: text("user_name").default('User').notNull(),
	userImageSrc: text("user_image_src").default('/mascot.svg').notNull(),
	activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade" } ),
	hearts: integer("hearts").default(5).notNull(),
	points: integer("points").default(0).notNull(),
});

export const courses = pgTable("courses", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	imageSrc: text("image_src").notNull(),
});