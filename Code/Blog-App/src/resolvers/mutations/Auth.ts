import { Context } from "../../index";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { JWT_Signature } from "./key";

interface SignUpArgs {
  name: string;
  bio: string;
  credentials: {
    email: string;
    password: string;
  };
}

interface SignInArgs {
  credentials: { email: string; password: string };
}

interface UserPayload {
  userErr: {
    message: string;
  }[];
  token: any;
  message: string;
}

export const auth = {
  // ========== SignUp ===============================
  signUp: async (
    _: any,
    { credentials, name, bio }: SignUpArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;
    const isEmail = validator.isEmail(email);
    if (!isEmail) {
      return {
        userErr: [
          {
            message: "Invalid email",
          },
        ],
        token: null,
        message: "Not Created",
      };
    }

    // check if email is already registered and if it is registered then return with message user already registered
    const userFound = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userFound) {
      return {
        userErr: [
          {
            message: "Email already registered",
          },
        ],
        token: null,
        message: "Not Created",
      };
    }

    const isValidPassword: boolean = validator.isLength(password, {
      min: 8,
      max: 20,
    });

    if (!isValidPassword) {
      return {
        userErr: [
          {
            message: "Invalid password",
          },
        ],
        token: null,
        message: "Not Created",
      };
    }

    if (!name || !bio) {
      return {
        userErr: [
          {
            message: "Name and bio are required",
          },
        ],
        token: null,
        message: "Not Created",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    await prisma.profile.create({
      data: {
        bio,
        userId: user.id,
      },
    });

    const tokengen = await JWT.sign(
      {
        userId: user.id,
      },
      JWT_Signature,
      {
        expiresIn: 360000,
      }
    );

    return {
      userErr: [],
      token: tokengen,
      message: "Created",
    };
  },

  // ========== SignIn ===============================
  signIn: async (
    _: any,
    { credentials }: SignInArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;
    console.log("email", email);

    const isEmail = validator.isEmail(email);
    if (!isEmail) {
      return {
        userErr: [
          {
            message: "Invalid email",
          },
        ],
        token: null,
        message: "Not Signed In",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        userErr: [
          {
            message: "Invalid credentials",
          },
        ],
        token: null,
        message: "User Not Found",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        userErr: [
          {
            message: "Invalid credentials",
          },
        ],
        token: null,
        message: "User Not Found",
      };
    }

    console.log("isMatch:::", isMatch);

    return {
      userErr: [],
      token: JWT.sign(
        {
          userId: user.id,
        },
        JWT_Signature,
        {
          expiresIn: 360000,
        }
      ),
      message: "Signed In",
    };
  },
};
