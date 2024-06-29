import "./App.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal } from "antd";
function App() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [playerName, setPlayerName] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    showModal();
  };
  const handleInputChange = (event) => {
    setPlayerName(event.target.value);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showLeaderboardModal = () => {
    setIsLeaderboardModalOpen(true);
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setLeaderboardData(leaderboard);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    localStorage.setItem("name", playerName);
    navigate("/game");
  };
  const handleOkLeaderboard = () => {
    setIsLeaderboardModalOpen(false);
  };
  const handleCancelLeaderboard = () => {
    setIsLeaderboardModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="App">
      <header className="App-header">
        <p className="title">
          Welcome to <text className="title_gradient">Color</text> World Puzzle
        </p>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Smith"
              value={playerName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Let's Start!
          </Button>
        </Form>
        <br></br>
        <Button variant="dark" onClick={showLeaderboardModal}>
          Players Leaderboard
        </Button>
      </header>
      <Modal
        title={`Welcome ${playerName} !`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
      >
        <ul>
          <li>In this game you will be presented with 3 colors</li>
          <li>
            You have to choose the correct color based on the provided Hex code
          </li>
          <li>
            If you chose a correct color your correct answers will increment
          </li>
          <li>
            If you chose an incorrect color your incorrect answers will
            increment
          </li>
          <li>if you get 3 Wrong answers you will lose</li>

          <li>Try your best to raise your record as much as you can</li>
        </ul>
      </Modal>
      <Modal
        title={`Players Leaderboard`}
        open={isLeaderboardModalOpen}
        onOk={handleOkLeaderboard}
        onCancel={handleCancelLeaderboard}
        centered={true}
      >
        <ul>
          {leaderboardData.map((record, index) => (
            <li key={index}>
              {index + 1}. {record.name} - {record.score} points ({record.Date})
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}

export default App;
