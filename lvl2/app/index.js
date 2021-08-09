#!/usr/bin/env node
import { Command } from "commander";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import connection from "./connection.js";
dotenv.config();

import createHandler from "../handlers/createHandler.js";
import registerHandler from "../handlers/registerHandler.js";
import localizeHandler from "../handlers/localizeHandler.js";

const client = new MongoClient(process.env.MONGO_URI);
const program = new Command();

program
  .command("create")
  .argument("<userId>", "user to create or add a fleet to")
  .description("creates a new user with a default fleet number, or add a new fleet to an existing user")
  .action((userId) => {
    createHandler(userId, client, connection)
  });

program
  .command("register-vehicle")
  .arguments("<fleetId> <plate>", "fleet to record vehicle, plate identifying vehicle")
  .description("register a new vehicle into an existing fleet")
  .action((fleetId, plate) => {
    registerHandler(fleetId, plate, client, connection)
  }); 

program
  .command("localize-vehicle")
  .arguments("<fleetId> <plate> lng lat [alt]", "parking coordinates")
  .description("set parking coordinates of a registered vehicle")
  .action((fleetId, plate, lng, lat, alt) => {
    localizeHandler(fleetId, plate, lng, lat, alt, client, connection)
  });

program.parse(process.argv);
