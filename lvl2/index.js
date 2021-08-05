#!/usr/bin/env node
import { Command } from "commander";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import connection from "./connection.js";
import mongoose from "mongoose";
dotenv.config();

import User from "./domain/User.js";
import Fleet from "./domain/Fleet.js";
import Vehicle from "./domain/Vehicle.js";

const client = new MongoClient(process.env.MONGO_URI);
const program = new Command();

program
  .command("create")
  .argument("<userId>")
  .action(async (userId) => {
    try {
      const user = new User({
        _id: userId,
        fleetsRefs: [Math.floor(Math.random() * (999999999 - 1 + 1) + 1)],
      });

      const fleet = new Fleet({
        _id: user.fleetsRefs[0],
        vehicles: new Map(),
        userId: userId,
      });

      const db = await connection(client);
      const newUser = await db.collection("users").insertOne(user);
      await db.collection("fleets").insertOne(fleet);

      console.log({
        userCreated: newUser.insertedId,
        defaultFleetId: user.fleetsRefs[0],
      });
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      await client.close();
    }
  });

program
  .command("register-vehicle")
  .arguments("<fleetId> <plate>")
  .action(async (fleetId, plate) => {
    try {
      const vehicle = new Vehicle({
        plate: plate,
        parked: false,
        lng: -500,
        lat: -500,
        alt: -500,
      });

      const db = await connection(client);
      const result = await db.collection("fleets").findOneAndUpdate(
        { _id: Number(fleetId) },
        {
          $set: {
            vehicles: {
              [plate]: vehicle,
            },
          },
        }
      );

      console.log(result);
    } catch (err) {
      console.error(err);
    } finally {
      client.close();
    }
  });

program
  .command("localize-vehicle")
  .arguments("<fleetId> <plate> lng lat [alt]")
  .action(async (fleetId, plate, lng, lat, alt) => {
    try {
      const db = await connection(client);
      const fleet = await db
        .collection("fleets");
        
      const result = await fleet.updateOne({
        _id: Number(fleetId)
      }, {$set: {
        vehicles: {
          [plate]:  {
            lng: Number(lng),
            lat: Number(lat),
            alt: Number(alt)
          }
        }
      }});

      console.log(result)
    } catch (err) {
      console.error(err);
    } finally {
      client.close();
    }
  });

program.parse(process.argv);
