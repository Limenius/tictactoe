defmodule TictactoeWeb.GameChannel do
  use Phoenix.Channel

  def join("game", _message, _socket) do
    :ok
  end

  def handle_in("play", %{"position" => position}, socket) do
    Tictactoe.GameServer.play(position)
    {:noreply, socket}
  end

end