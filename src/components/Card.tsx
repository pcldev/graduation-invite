import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { toast } from "react-toastify";

// Define person type
type PersonType = "conglong" | "lananh";

// Theme configuration
const THEMES = {
  conglong: {
    backgroundColor: "#333333",
    color: "#ffffff",
    buttonBackground: "#555555",
    buttonColor: "#ffffff",
    displayName: "Công Long",
    avatar:
      "https://cdn.shopify.com/s/files/1/0698/9814/1941/files/z6352225942827_1377c10277fb9e5a26c9224b6c167e31.jpg?v=1740494884",
  },
  lananh: {
    backgroundColor: "#ffc0cb",
    color: "#000000",
    buttonBackground: "#ff99aa",
    buttonColor: "#000000",
    displayName: "Lan Anh",
    avatar:
      "https://cdn.shopify.com/s/files/1/0698/9814/1941/files/z6352226042331_b389d52cc81d292ee434f5892fbfbce9.jpg?v=1740494884",
  },
};

// Graduation details
const GRADUATION_INFO = {
  time: "11:00 PM, 01/03/2025 (UTC+7)",
  location: "Trung tâm hội nghị Quốc gia - Cổng số 1 Đại lộ Thăng Long",
  locationUrl: "https://maps.app.goo.gl/qrzFBJBmPopzjzCF6",
  formSubmitUrl:
    "https://script.google.com/macros/s/AKfycbzA5OUcOhD0iIhxtZHLF-AGYgMrnNnot7ZWcE_TVx5lokRJ4hMc0hbr4Cg1i069R6kE_w/exec",
};

interface CardProps {
  person: PersonType;
}

const Card: React.FC<CardProps> = ({ person }) => {
  const [friendName, setFriendName] = useState("");
  const theme = THEMES[person];

  const handleSubmit = async (going: boolean) => {
    if (!friendName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    toast.success(
      going ? "Thank you for coming" : "Sorry to hear that you can't come"
    );
    setFriendName("");

    // Prepare data as URL-encoded parameters
    const formData = new URLSearchParams();
    formData.append("Name", friendName);
    formData.append("Yes/No", going ? "Yes" : "No");
    formData.append("Form", theme.displayName);

    try {
      await fetch(GRADUATION_INFO.formSubmitUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred, please try again later");
    }
  };

  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.45}
      glareBorderRadius="10px"
      scale={1.1}
      transitionSpeed={2500}
      style={{
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <div
        style={{
          ...theme,
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          filter: "drop-shadow(5px 8px 16px rgba(0, 0, 0, 0.3))",
        }}
      >
        <h3 className="invite-title">Invite you to attend</h3>
        <h2 className="invite-subtitle">{theme.displayName}'s</h2>
        <h3 className="invite-ceremony">Graduation Ceremony</h3>
        <img src={theme.avatar} alt={`${theme.displayName}'s avatar`} />
        <p style={{ margin: "5px 0" }}>Time: {GRADUATION_INFO.time}</p>
        <span style={{ margin: "5px 0" }}>Venue:</span>{" "}
        <a
          href={GRADUATION_INFO.locationUrl}
          style={{
            margin: "5px 0",
            textDecoration: "underline",
            color: theme.color,
          }}
        >
          {GRADUATION_INFO.location}
        </a>
        <div style={{ marginTop: "20px" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(true);
            }}
          >
            <input
              type="text"
              placeholder="Enter your name"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              className="invite-input"
            />
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => handleSubmit(true)}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                backgroundColor: theme.buttonBackground,
                color: theme.buttonColor,
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              I will go
            </button>
            <button
              onClick={() => handleSubmit(false)}
              style={{
                padding: "10px 20px",
                backgroundColor: theme.buttonBackground,
                color: theme.buttonColor,
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Sorry, I can't go
            </button>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default Card;
