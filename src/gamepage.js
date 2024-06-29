import "./App.css";

import React, { useState, useEffect } from "react";
import { Col, Row, notification, Modal } from "antd";
import { useNavigate } from "react-router-dom";

function Gamepage() {
  const navigate = useNavigate();

  const [hexColor, setHexColor] = useState({
    hex1: null,
    hex2: null,
    hex3: null,
  });
  const [correctHexColor, setCorrectHexColor] = useState("");
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleColors() {
    let color1 = generateColor();
    let color2 = generateColor();
    let color3 = generateColor();

    const colorsArray = [color1, color2, color3];
    const correctColor = colorsArray[Math.floor(Math.random() * 3)];

    setHexColor({
      hex1: color1,
      hex2: color2,
      hex3: color3,
    });
    setCorrectHexColor(correctColor);
  }
  function handleCorrectAnswer() {
    setCorrectAnswersCount((prevCount) => prevCount + 1);
  }
  function handleInCorrectAnswer() {
    setIncorrectAnswersCount((prevCount) => prevCount + 1);
    if (incorrectAnswersCount === 3) {
      setIsModalVisible(true);
    }
  }

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };
  const handleModalOk = () => {
    setIsModalVisible(false);
    if (correctAnswersCount > localStorage.getItem("correctscorerecord")) {
      localStorage.setItem("correctscorerecord", correctAnswersCount);
    }
    const userRecord = {
      name: localStorage.getItem("name"),
      score: correctAnswersCount || 0,
      Date: new Date().toLocaleDateString(),
    };
    addToLeaderboard(userRecord);
    navigate(0);
  };
  const handleModalCancel = () => {
    if (correctAnswersCount > localStorage.getItem("correctscorerecord")) {
      localStorage.setItem("correctscorerecord", correctAnswersCount);
    }
    const userRecord = {
      name: localStorage.getItem("name"),
      score: correctAnswersCount || 0,
      Date: new Date().toLocaleDateString(),
    };
    addToLeaderboard(userRecord);
    navigate("/");
  };
  useEffect(() => {
    if (incorrectAnswersCount >= 3) {
      setIsModalVisible(true);
    }
    handleColors();
  }, [incorrectAnswersCount]);

  return (
    <div className="Game_Page">
      <div className="Game-header">
        <div className="container">
          <Row justify="center">
            <Col span={8}>
              <p className="Gamefont">Correct: {correctAnswersCount}</p>
            </Col>
            <Col span={8}>
              <p className="Gamefont">
                Ok {localStorage.getItem("name")}, which one is{" "}
                {correctHexColor} ?{" "}
              </p>
            </Col>
            <Col span={8}>
              <p className="Gamefont">InCorrect: {incorrectAnswersCount}</p>
            </Col>
          </Row>
          <Row>
            {Object.keys(hexColor).map((key, index) => (
              <Col
                span={8}
                key={index}
                style={{
                  backgroundColor: hexColor[key],
                  height: "310px",
                  border: "solid",
                  borderColor: "black",
                  borderRadius: "5px",
                }}
              >
                <div
                  className="clickable-col"
                  style={{ backgroundColor: hexColor[key], height: "300px" }}
                  onClick={() => {
                    if (hexColor[key] === correctHexColor) {
                      openNotificationWithIcon("success", "Correct!");

                      handleColors();
                      handleCorrectAnswer();
                    } else {
                      {
                        openNotificationWithIcon("error", "Incorrect!");

                        handleColors();
                        handleInCorrectAnswer();
                      }
                    }
                  }}
                ></div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Modal
        title="Game Over"
        visible={isModalVisible}
        onOk={handleModalOk}
        okText="Play Again"
        onCancel={handleModalCancel}
        cancelText="Return to Home"
      >
        <p>You have lost the game.</p>
      </Modal>
    </div>
  );
}
export default Gamepage;
function generateColor() {
  const hexArray = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  let color = "#";

  for (let i = 0; i < 6; i++) {
    let randomDigit = Math.floor(Math.random() * hexArray.length);
    color = color + hexArray[randomDigit];
  }

  return color;
}
function addToLeaderboard(userdata) {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push(userdata);
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}
