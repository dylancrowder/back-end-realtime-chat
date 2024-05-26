import userSchema from "../schema/user.schema.js";

export default class User {
  static async createUser(name, lastName, email, password, thumbnail) {
    return await userSchema.create({
      name,
      lastName,
      email,
      password,
      thumbnail,
    });
  }

  static async getAllUsers() {
    return await userSchema.find();
  }

  static async getAllUsersExceptOne(id) {
    const usersExceptOne = await userSchema.find({ _id: { $ne: id } });

    return usersExceptOne;
  }

  static async findOne(email) {
    const user = await userSchema.findOne({ email: email });
    return user;
  }
}
