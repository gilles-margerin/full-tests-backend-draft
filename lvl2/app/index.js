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
  .argument("<userId>")
  .action((userId) => {
    createHandler(userId, client, connection)
  });

program
  .command("register-vehicle")
  .arguments("<fleetId> <plate>")
  .action(async (fleetId, plate) => {
    registerHandler(fleetId, plate, client, connection)
  }); 

program
  .command("localize-vehicle")
  .arguments("<fleetId> <plate> lng lat [alt]")
  .action(async (fleetId, plate, lng, lat, alt) => {
    localizeHandler(fleetId, plate, lng, lat, alt, client, connection)
  });

program.parse(process.argv);
