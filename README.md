# Tic-tac-toe

This is an example of integration between a React+Redux client side with an Elixir/OTP GenServer

Blog post: https://limenius.com/elixir-otp-react-redux/

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

run the server:

````
mix phx.server
````

And then in another terminal run the client application:

````
npm run start
````

