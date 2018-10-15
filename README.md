# Water Jug Puzzle App

## Overview

The Water Jug Puzzle App is an exercise in state space search. The logic behind the app finds the most efficient path through the space to the goal state (shortest number of steps). The current implementation is a breadth first search of the state space.

## Usage

Direct your web browser to http://{docker-machine-ip}:3000/ to view the user interface. The app allows you to enter sizes for two jugs of water and a goal amount which is the amount of water you want to accumulate in one of the jugs. Enter your values and click "Find Path" to search for a viable path. If one is returned, you can hit "Play" to run the simulation!

## Installation

Use Docker-Compose to spin up the required services locally. Navigate your terminal to this directory and run the following command:

> docker-compose up --build