/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : user model creates user schema and performs db operation
 * @file            : address.model.js
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
const mongoose = require("mongoose");
const AddressSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, Ref: "User" },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: Number, required: true },
    locality: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    landmark: { type: String, required: true },
    addressType: {
      type: String,
      enum: ["Home", "Work", "Other"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Address = mongoose.model("Address", AddressSchema);

class AddressModel {
  /**
   * @description adds customer details
   * @returns err or data
   */
  addCustomerDetails = async (details) => {
    const address = new Address({
      userId: details.userId,
      name: details.name,
      phone: details.phone,
      pincode: details.pincode,
      locality: details.locality,
      address: details.address,
      city: details.city,
      landmark: details.landmark,
      addressType: details.addressType,
    });
    try {
      let user = await Address.findOne({ userId: details.userId });
      if (!user) {
        return await address.save({});
      } else {
        return await Address.findOneAndUpdate(
          { userId: details.userId },
          details,
          { new: true }
        );
      }
    } catch (error) {
      throw error;
    }
  };

  /**
   * @description gets customer details
   * @returns err or data
   */
  getCustomerDetails = async (userId) => {
    try {
      return await Address.findOne({ userId: userId });
    } catch (error) {
      throw error;
    }
  };
}
module.exports = new AddressModel();