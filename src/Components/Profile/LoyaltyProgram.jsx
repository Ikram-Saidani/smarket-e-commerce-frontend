import React, { useContext, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Button, Stack, Alert } from "@mui/material";
import { toast } from "react-toastify";
import appAxios from "../../utils/axiosConfig";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";

function LoyaltyProgram() {
  const token = localStorage.getItem("authToken");
  const { user, setUser } = useContext(UserContext);
  const [alertMessage, setAlertMessage] = useState("");
  const [tryGame, setTryGame] = useState(true);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const earnedChoices = [
    0, 10, 20, 10, 0, 30, 40, 0, 50, 60, 0, 10, 20, 0, 30, 40, 0, 50, 60, 70,
    20, 80, 30, 0, 90, 20, 0, 100,
  ];
  useEffect(() => {
    if (!token) return;
    appAxios
      .get("/api/user/me", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error.response || error);
      });
  }, [setUser, token]);
  const data = earnedChoices.map((value, index) => ({
    option: `${value} Coins`,
    style: { backgroundColor: index % 2 === 0 ? "#ffa726" : "#ff7043" },
  }));

  const spinLoyaltyWheel = async () => {
    const randomIndex = Math.floor(Math.random() * earnedChoices.length);
    setPrizeNumber(randomIndex);
    setMustSpin(true);
  };

  const handleSpinComplete = async () => {
    const pointsEarned = earnedChoices[prizeNumber];
    setMustSpin(false);

    if (pointsEarned === 0) {
      setAlertMessage("Sorry, you didn't earn any points.");
    } else {
      setAlertMessage(`You earned ${pointsEarned} points!`);
      const updatedUser = {
        ...user,
        coinsEarned: user?.coinsEarned + pointsEarned,
      };
      setUser(updatedUser);
      try {
        await appAxios.put(
          `/api/user/coinsearned/${user._id}`,
          { coinsEarned: user?.coinsEarned + pointsEarned },
          {
            headers: { Authorization: token },
          }
        );
        if (pointsEarned > 0) {
          setUser({ ...user, coinsEarned: user?.coinsEarned + pointsEarned });
          toast.success(`You earned ${pointsEarned} coins!`);
        }
      } catch (error) {
        console.error(
          "Failed to update user's coinsEarned:",
          error.response || error
        );
        toast.error("Failed to update your coins earned.");
      }
      appAxios
        .put(
          "/api/user/lastspinTime",
          {
            lastSpinTime: new Date(),
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          setUser({ ...user, lastSpinTime: new Date() });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setTryGame(false);
  };

  const canTryAgain = () => {
    const lastSpinTime = user?.lastSpinTime;
    if (!lastSpinTime) return true; // If no lastSpinTime, user can try again.
  
    const lastSpinDate = new Date(lastSpinTime);
    const currentDate = new Date();
  
    // Calculate the time difference in milliseconds
    const diffTime = currentDate - lastSpinDate;
  
    // Check if 24 hours (in milliseconds) have passed
    return diffTime >= 24 * 60 * 60 * 1000;
  };

  return (
    <div className="loyaltyProgram">
      <h3>Take your chance now!</h3>
      <p>You currently have {user?.coinsEarned.toFixed(2)} coins.</p>

      {canTryAgain() && tryGame ? (
        <>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={handleSpinComplete}
            backgroundColors={["#02a6a325", "#fffcf3"]}
            textColors={["#FFFFFF"]}
          />
          {!mustSpin && (
            <Button
              className="loyaltyButton"
              onClick={spinLoyaltyWheel}
              sx={{ marginTop: 2 }}
            >
              Let's try
            </Button>
          )}
        </>
      ) : (
        <>
          <Button disabled className="loyaltyButtonDisabled">
            Let's try
          </Button>
          <p>Please wait 24 hours to try again.</p>
        </>
      )}

      {alertMessage && (
        <Stack sx={{ width: "100%", marginTop: 2 }} spacing={2}>
          <Alert severity="success">{alertMessage}</Alert>
        </Stack>
      )}
    </div>
  );
}

export default LoyaltyProgram;
