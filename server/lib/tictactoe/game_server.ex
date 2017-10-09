defmodule Tictactoe.GameServer do
  use GenServer
  alias TictactoeWeb.Endpoint

  defmodule State do
    defstruct(
      board: %{
        0 => %{0 => ".", 1 => ".", 2 => "."},
        1 => %{0 => ".", 1 => ".", 2 => "."},
        2 => %{0 => ".", 1 => ".", 2 => "."}
      },
      phase: "playing"
    )
  end


  #API
  def start_link(_) do
    GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def play(x, y) do
    GenServer.cast(__MODULE__, %{action: :play, x: x, y: y})
  end

  def reset() do
    GenServer.cast(__MODULE__, %{action: :reset})
  end

  def getGameState() do
    GenServer.call(__MODULE__, %{action: :get_game_state})
  end

  #Callbacks
  def init(:ok) do
    {:ok, %State{}}
  end

  def handle_cast(%{:action => :play, :x => x, :y => y}, state) do
    case can_move(state, x, y) do
      :true ->
        state = put_in state.board[y][x], "X"
        state = state
        |> check_finished
        |> make_random_move
        |> check_finished
        Endpoint.broadcast("game", "game_update", %{board: to_list(state.board), phase: state.phase})
        state
      :false -> state
    end
    {:noreply, state}
  end

  def handle_cast(%{:action => :reset}, _state) do
    state = %State{}
    Endpoint.broadcast("game", "game_update", %{board: to_list(state.board), phase: state.phase})
    {:noreply, state}
  end

  def handle_call(%{action: :get_game_state}, _, state) do
    {:reply, %{board: to_list(state.board), phase: state.phase}, state}
  end

  defp can_move(state, x, y) do
    case {state.board[y][x], is_finished(state)} do
      {".", :false} -> :true
      st ->
        IO.inspect st
        :false
    end
  end

  defp check_finished(state) do
    case is_finished(state) do
      {:true, :tie} -> %State{state|phase: "tie"}
      {:true, winner} -> %State{state|phase: winner <> " won"}
      _ -> state
    end
  end

  defp is_finished(state) do
    case Enum.all?(List.flatten(to_list(state.board)), &(&1 != ".")) do
      :true -> {:true, :tie}
      :false ->
        case to_list(state.board) do
          [[x, x, x],_,_] when x != "." -> {:true, x}
          [_,[x, x, x],_] when x != "." -> {:true, x}
          [_,_,[x, x, x]] when x != "." -> {:true, x}
          [[x, _, _],[x,_,_],[x,_,_]] when x != "." -> {:true, x}
          [[_, x, _],[_,x,_],[_,x,_]] when x != "." -> {:true, x}
          [[_, _, x],[_,_,x],[_,_,x]] when x != "." -> {:true, x}
          [[x, _, _],[_,x,_],[_,_,x]] when x != "." -> {:true, x}
          [[_, _, x],[_,x,_],[x,_,_]] when x != "." -> {:true, x}
          _ -> :false
        end
    end
  end

  defp make_random_move(state) do
    case is_finished(state) do
      {:yes, _} -> state
      _ ->
        x = Enum.random(0..2)
        y = Enum.random(0..2)
        case state.board[y][x] do
          "." -> put_in state.board[y][x], "O"
          _ -> make_random_move(state)
        end
    end
  end

  defp to_list(matrix) when is_map(matrix) do
    for {_index, value} <- matrix,
        into: [],
        do: to_list(value)
  end

  defp to_list(other), do: other

end