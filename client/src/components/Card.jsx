import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  IconButton,
} from "@mui/material";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";

function SelectActionCard({ transactions }) {
  const [selectedCard, setSelectedCard] = React.useState(0);

  const totalIncome = transactions
    .filter((txn) => txn.type === "Income")
    .reduce((acc, txn) => acc + Number(txn.amount), 0);

  const totalExpense = transactions
    .filter((txn) => txn.type === "Expense")
    .reduce((acc, txn) => acc + Number(txn.amount), 0);

  const totalBanace = totalIncome - totalExpense;

  const cards = [
    {
      name: "Total Income",
      icon: ArrowCircleUpRoundedIcon,
      price: totalIncome,
      inc: "+5.2% from last month",
    },
    {
      name: "Total Expense",
      icon: ArrowCircleDownRoundedIcon,
      price: totalExpense,
      inc: "-2.4% from last month",
    },
    {
      name: "Balance",
      icon: SavingsRoundedIcon,
      price: totalBanace,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(400px, 100%), 1fr))",
        gap: 2,
      }}
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isPositive =
          card.icon === ArrowCircleUpRoundedIcon ||
          card.icon === SavingsRoundedIcon;

        return (
          <Card key={card.name}>
            <CardActionArea
              onClick={() => setSelectedCard(index)}
              data-active={selectedCard === index ? "" : undefined}
              sx={{ height: "100%", width: "100%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{card.name}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
                    ${card.price}
                  </Typography>
                  {card.inc && (
                    <Typography
                      variant="body2"
                      sx={{ color: isPositive ? "#4ade80" : "#ef4444", mt: 1 }}
                    >
                      {card.inc}
                    </Typography>
                  )}
                </CardContent>

                <Box
                  sx={{
                    color: isPositive ? "#4ade80" : "#ef4444",
                    fontSize: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon fontSize="inherit" />
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        );
      })}
    </Box>
  );
}

export default SelectActionCard;
