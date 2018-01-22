defmodule Tictactoe.GameSupervisor do
  use Supervisor

  @name Tictactoe.GameSupervisor

  def start_link do
    Supervisor.start_link(Tictactoe.GameSupervisor, :ok, name: @name)
  end

  def init(:ok) do
    Supervisor.init([Tictactoe.GameServer], strategy: :simple_one_for_one)
  end

  def start_games(n) do
    for x <- 0..n do
      if rem(x, 100000) == 0 do
        IO.puts "Started " <> to_string(x) <> " games"
      end
      Supervisor.start_child(@name, [{:global, x}])
    end
  end
end
