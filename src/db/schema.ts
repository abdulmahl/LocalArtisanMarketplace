import {
  pgTable,
  serial,
  boolean,
  varchar,
  integer,
  numeric,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Categories Table
export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  imageUrl: varchar("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Users Table
export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  termsAccepted: boolean("terms_accepted"),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").unique().notNull(),
  phone: varchar("phone").unique().notNull(),
  city: varchar("city").notNull(),
  province: varchar("province").notNull(),
  profileImage: varchar("profile_image").notNull().default(""),
  password: varchar("password").notNull(),
  roles: varchar("roles").array().notNull(),
  active: boolean().notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Products Table
export const product = pgTable("product", {
  id: serial("id").primaryKey(),
  sellerId: integer("seller_id")
    .notNull()
    .references(() => user.id),
  categoryId: integer("category_id")
    .notNull()
    .references(() => category.id),
  productName: varchar("product_name").notNull(),
  productDescription: text("product_description"),
  productPrice: numeric("product_price", { precision: 10, scale: 2 }).notNull(),
  productImage: varchar("product_image").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Orders Table
export const order = pgTable("order", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => product.id),
  buyerId: integer("buyer_id")
    .notNull()
    .references(() => user.id),
  status: varchar("status").notNull().default("pending"),
  quantity: integer("quantity").notNull().default(1),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Cart Table
export const cart = pgTable("cart", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id), // Reference to the user who owns the cart
  productId: integer("product_id")
    .notNull()
    .references(() => product.id), // Reference to the product added to the cart
  quantity: integer("quantity").notNull().default(1), // Quantity of the product
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Relations
export const userRelations = relations(user, ({ many }) => ({
  products: many(product),
  orders: many(order),
  cartItems: many(cart), // User's cart items
}));

export const productRelations = relations(product, ({ one, many }) => ({
  seller: one(user, {
    fields: [product.sellerId],
    references: [user.id],
  }),
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id],
  }),
  orders: many(order),
  cartItems: many(cart), // Products in carts
}));

export const orderRelations = relations(order, ({ one }) => ({
  product: one(product, {
    fields: [order.productId],
    references: [product.id],
  }),
  buyer: one(user, {
    fields: [order.buyerId],
    references: [user.id],
  }),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  products: many(product),
}));

export const cartRelations = relations(cart, ({ one }) => ({
  user: one(user, {
    fields: [cart.userId],
    references: [user.id],
  }),
  product: one(product, {
    fields: [cart.productId],
    references: [product.id],
  }),
}));
