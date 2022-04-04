# GardenCaring2
## Introduction
This is an IoT website that acts as a *dashboard*, where user can view garden information and control devices

## Technology
- Backend: NodeJs, Express, jQuery, MySQL

- View engine: ejs

- Gateway: Python

- Connecting between web and gateway: socket.io

- Devices used: DHT11 (Temperature sensor); Soil moisture sensor; A 2-color single LED;  Relay circuit + mini Pump

Device used: 
# Features
- Auto collecting data (*Temperature and Moisture*) and updating on website
- Control devices via website (Lights, Pumps, Dome)
- Set lower and upper bound for each type of data
- Automatically operate the devices in different scenarios
- View *chart*, analystic (Average in different ranges)
- Login, logout
# Script for running
First, run the web server: **npm start**

Second, run the gateway: **python main.py**

Open http://localhost:8080/ to access home page
