/**
 * name
 * email
 * password
 */

/**
 * req.body
 * name,email,password
 */

/**
 * userModel.create 
 * {_id,name,email,password,createdAt,updatedAt}
 */

/**
 * response
 * {_id,name,email}
 */

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserInput = Omit<User, keyof Pick<User, "_id" | "createdAt" | "updatedAt">>;

export type UserResponse = Pick<User, "_id" | "email" | "name">

export type UserUpdateInput = Partial<UserInput>

// {
//     _id: string;
//     name: string;
//     email: string;
// }