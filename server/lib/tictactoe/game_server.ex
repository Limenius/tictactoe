defmodule Tictactoe.GameServer do
  use GenServer
  alias TictactoeWeb.Endpoint

  defmodule State do
    defstruct(
      board: [
          [".",".","."],
          [".",".","."],
          [".",".","."]
      ]
    )
  end


  #API
  def start_link do
    Supervisor.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def play(position) do
    GenServer.cast(__MODULE__, %{action: :play, position: position})
  end

  #Callbacks
  def init() do
    {:ok, %State{}}
  end

  def handle_cast(%{:action => :play, :position => position}, state) do
    state = Kernel.put_in(state.board[position.y][position.x], "X")
    Endpoint.broadcast("game", "board:update", state)
    {:noreply, state}
  end

end
