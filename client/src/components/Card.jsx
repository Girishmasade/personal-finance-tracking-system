import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { IconButton } from "@mui/material";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";

const cards = [
  {
    name: "Total Income",
    icon: ArrowCircleUpRoundedIcon,
    price: "4,000.00",
    inc: "+5.2% from last month",
  },
  {
    name: "Total Expense",
    icon: ArrowCircleDownRoundedIcon,
    price: "1,405.00",
    inc: "-2.4% from last month",
  },
  {
    name: "Balance",
    icon: SavingsRoundedIcon,
    price: "2,595.00",
  },
];

function SelectActionCard() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <Box
      sx={{
        maxWidth: "120%",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? "" : undefined}
            sx={{
              height: "100%",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ height: "100%" }}>
                <Typography variant="h5" component="div">
                  {card.name}
                </Typography>
                <Typography variant="h5" component="div" sx={{fontWeight: "bold", fontSize: '30px'}}>
                 $ {card.price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      card.icon === ArrowCircleUpRoundedIcon ||
                      card.icon === SavingsRoundedIcon
                        ? "#4ade80"
                        : "#ef4444",
                  }}
                >
                  {card.inc}
                </Typography>
              </CardContent>
              <IconButton
                sx={{
                  color:
                    card.icon === ArrowCircleUpRoundedIcon ||
                    card.icon === SavingsRoundedIcon
                      ? "#4ade80"
                      : "#ef4444",
                }}
              >
                <card.icon />
              </IconButton>
            </Typography>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default SelectActionCard;
