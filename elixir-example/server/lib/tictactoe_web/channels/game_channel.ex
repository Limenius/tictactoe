defmodule TictactoeWeb.GameChannel do
  use Phoenix.Channel

  def join("game", _message, socket) do
    game = Tictactoe.GameServer.getGameState()
    {:ok, game, socket}
  end

  def handle_in("game:play", %{"x" => x, "y" => y}, socket) do
    Tictactoe.GameServer.play(x, y)
    {:noreply, socket}
  end

  def handle_in("game:reset", _, socket) do
    Tictactoe.GameServer.reset()
    {:noreply, socket}
  end
end