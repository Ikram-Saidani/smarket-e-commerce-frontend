import { Alert, Button, Stack } from "@mui/material";
import React, { useState } from "react";

function LoyaltyProgram({user}) {
  const [alertMessage, setAlertMessage] = useState("");
  const [tryGame, setTryGame] = useState(true);

  const spinLoyaltyWheel = () => {
    const pointsEarned = Math.floor(Math.random() * 100);
    setAlertMessage(`You earned ${pointsEarned} points!`);
    setTryGame(false);
  };
  return (
    <div className="loyaltyProgram">
      <h3>Take your chance and earn coins!</h3>
      <p>You currently have {user.loyaltyPoints} coins.</p>
      {tryGame? (
        <Button className="loyaltyButton" onClick={spinLoyaltyWheel}>
        Let's try
      </Button>
      ):<Button disabled className="loyaltyButtonDisabled">
      Let's try
    </Button>}

      {alertMessage && (
        <Stack sx={{ width: "100%", marginTop: 2 }} spacing={2}>
          <Alert severity="success">{alertMessage}</Alert>
        </Stack>
      )}
    </div>
  );
}

export default LoyaltyProgram;
