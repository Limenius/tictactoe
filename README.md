# Tic-tac-toe

This is an example how similar is to work with Redux and Elixir/OTP GenServers.

This code was used in the demo of a talk in AgentConf'18

Blog post: https://limenius.com/elixir-otp-react-redux/

Don't use this code as it is as base for anything serious, please. I have cut all the corners while developing
this to showcase an idea. There is no lobby, no player negotiation, or anything like that, and for simplicity
there is a GenServer that will listen to every websocket connection. There are examples like https://github.com/bigardone/phoenix-battleship that are closer to a real project.

## Running it

Clone the repo:

````
git clone https://github.com/Limenius/tictactoe.git
````

cd into the project and then get the client dependencies:
````
yarn install
````
or

````
npm i
````

get the server dependencies:

````
cd server
mix deps.get
````
(note that you need to have Elixir installed).

run the server:

````
mix phx.server
````

And then in another terminal run the client application:

````
npm run start
````

You should be able to see the app live at http://localhost:3000/
