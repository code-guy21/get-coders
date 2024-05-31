const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
          return User.find();
        },  
        user: async (parent, { username }) => {
          return User.findOne({ username });
        },
        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id });
          }
          throw AuthenticationError;
        },
    },  

    Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    becomeContractor: async ( parent, { userId  } ) => {
      const user = await User.findOneAndUpdate(
        { 
          _id: userId
        },
        {
          $set: { isContractor: true },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return user;
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError
      }

      const token = signToken(user);
      return { token, user };
    },
},
};

module.exports = resolvers;