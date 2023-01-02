const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, "first name is required"],
            required: true,
            max: 32,
        },
        last_name: {
            type: String,
            required: [true, "last name is required"],
            trim: true,
            text: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },    
        picture: {
            type: String,
            trim: true,
            default:
              "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
          },
          verified: {
            type: Boolean,
            default: false,
          }
          },          
          {
            timestamps: true,
          }
);

module.exports = mongoose.model("User", userSchema);
