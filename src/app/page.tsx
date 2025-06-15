"use client";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { TextField, Box, Container } from "@mui/material";
import { useQr } from "@/app/context/HistoryContext";

export default function Home() {
  const { urls, addUrl } = useQr();
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [qrText, setQrText] = useState("");

  const validateUrl = (url: string): boolean => {
    const trimmed = url.trim();
    return trimmed.startsWith("http://") || trimmed.startsWith("https://");
  };

  const Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setText(input);
    setError(false);
  };

  const handleGenerate = () => {
    if (!validateUrl(text)) {
      setError(true);
      setShowQr(false);
    } else {
      addUrl(text);
      setQrText(text);
      setShowQr(true);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Box textAlign="center">
        <h1
          style={{ fontSize: "30px", marginTop: "60px", marginBottom: "30px" }}
        >
          QR Code Generator
        </h1>

        <TextField
          sx={{
            width: "330px",
            input: { color: "white" },
            "& .MuiFormHelperText-root": {
              fontSize: "14px",
              color: "red",
            },
          }}
          variant="outlined"
          value={text}
          placeholder="Enter URL starting with http:// or https://"
          onChange={Change}
          error={error}
          helperText={
            error ? "Invalid URL. Must start with http:// or https://" : ""
          }
        />

        <Box sx={{ marginTop: "20px" }}>
          <button style={{ width: "60px" }} onClick={handleGenerate}>
            Generate
          </button>
        </Box>

        {showQr && (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              margin: "30px",
            }}
          >
            <QRCodeSVG value={qrText} size={200} />
          </Box>
        )}
      </Box>
    </Container>
  );
}
