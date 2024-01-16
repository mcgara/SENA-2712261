export type UserID = number
export type FoodID = number
export type FoodCategoryID = number
export type OrderID = number
export type InvoiceID = number

export interface User {
  id: UserID
  name: string
  lastname: string | null
  username: string
  email: string
  password: string
  create_time: Date
}

export interface Food {
  id: FoodID
  name: string
  description: string
  price: number
  stock: number
  image: string | null
  food_category_id: FoodCategoryID
}

export interface FoodCategory {
  id: FoodCategoryID
  name: string
  description: string
}

export interface Order {
  id: OrderID
  invoice_id: InvoiceID
  food_id: FoodID
  stock: number
}

export interface Invoice {
  id: InvoiceID
  user_id: UserID
  details: string | null
  total: number
  create_time: Date
}

export interface ITableModelID {
  'user': UserID
  'food': FoodID
  'food_category': FoodCategoryID
  'order': OrderID
  'invoice': InvoiceID
}

export interface ITableModel {
  'user': User
  'food': Food
  'food_category': FoodCategory
  'order': Order
  'invoice': Invoice
}

export type TableModelNames = { [P in keyof ITableModel]: P }[keyof ITableModel]
