const mongoose = require("mongoose");
const Ride = require("../models/ride");

/*

    Scenario: 

    Get Ride details

    Get all rides for specific user

    Get all rides for all users

    Create a new ride when a user ride request has been accepted

    Update a ride

    Delete a ride ( posibly only admins ? )
    

*/

exports.getRides = async () => {
  try {
    //gets all rides for all users
    const rides = await Ride.find().exec();
    return rides;
  } catch (error) {
    throw error;
  }
};

exports.getRideDetails = async (query) => {
  try {
    // query implies userid and specific ride id or driver
    const rideDetails = await Ride.findOne(query).populate("").exec();
    if (!rideDetails) throw new Error("Ride not found!");
    return rideDetails;
  } catch (error) {
    throw error;
  }
};

// gets all rides for specific user
exports.getMyRides = async (query) => {
  try {
    const myRides = await Ride.find(query).populate().exec(); // gets rides for query (userID)
    if (!myRides) throw new Error("User rides not found!");
    return myRides;
  } catch (error) {
    throw error;
  }
};

exports.createRide = async () => {
  return new Ride({});
};

exports.updateRide = async (query, method) => {
  try {
    const updatedRide = await Ride.findOneAndUpdate(query, method, {
      new: true,
    }).populate();
    return updatedRide;
  } catch (error) {
    throw error;
  }
};

exports.deleteRide = async () => {
  try {
  } catch (error) {
    throw error;
  }
};
