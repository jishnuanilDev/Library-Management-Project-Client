import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddBookForm from "../forms/AddBookForm";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddBookModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Aligns content to the right
          width: "100%", // Ensures it takes full width
        }}
      >
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ marginTop: 2, marginBottom: 2, marginRight: 2 }}
        >
          Add book
        </Button>
      </Box>

      <Modal
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
            boxShadow: 3, // Gives a subtle shadow effect around the form
            borderRadius: 5,//Increase this value to make the corners more rounded
            backgroundColor: "rgba(255, 255, 255, 1)",//kground color of the form area
            padding: 3,
          }}
        >
          <AddBookForm handleClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}
