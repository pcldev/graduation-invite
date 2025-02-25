import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { toast } from "react-toastify";

interface CardProps {
  person: "conglong" | "lananh";
}

const Card: React.FC<CardProps> = ({ person }) => {
  const [friendName, setFriendName] = useState("");

  // Define theme colors based on person.
  const theme =
    person === "conglong"
      ? {
          backgroundColor: "#333333",
          color: "#ffffff",
          buttonBackground: "#555555",
          buttonColor: "#ffffff",
        }
      : {
          backgroundColor: "#ffc0cb",
          color: "#000000",
          buttonBackground: "#ff99aa",
          buttonColor: "#000000",
        };

  // Graduation details
  const graduationTime = "11:00 PM, 01/03/2025 (UTC+7)";
  const graduationLocation =
    "Trung tâm hội nghị Quốc gia - Cổng số 1 Đại lộ Thăng Long";
  const avatar =
    person === "conglong"
      ? "https://cdn.shopify.com/s/files/1/0698/9814/1941/files/z6352225942827_1377c10277fb9e5a26c9224b6c167e31.jpg?v=1740494884"
      : "https://cdn.shopify.com/s/files/1/0698/9814/1941/files/z6352226042331_b389d52cc81d292ee434f5892fbfbce9.jpg?v=1740494884";

  const handleSubmit = async (going: boolean) => {
    if (!friendName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    toast.success("Thank you for coming");
    setFriendName("");

    // Prepare data as URL-encoded parameters
    const formData = new URLSearchParams();
    formData.append("Name", friendName);
    formData.append("Yes/No", going ? "Yes" : "No");

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzdwZfISWi_bspW7SG9PY8KUcWQOgG7yJzAZY-7NX_YBbQRzq--Paa-KbCChkr5_K_qiA/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        }
      );
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
      scale={1.15}
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
        <h2 className="invite-subtitle">
          {person === "conglong" ? "Công Long" : "Lan Anh"}'s
        </h2>
        <h3 className="invite-ceremony">Graduation Ceremony</h3>
        <img src={avatar} alt="Avatar" />
        <p style={{ margin: "5px 0" }}>Time: {graduationTime}</p>
        <span style={{ margin: "5px 0" }}>Venue:</span>{" "}
        <a
          href="https://maps.app.goo.gl/qrzFBJBmPopzjzCF6"
          style={{
            margin: "5px 0",
            textDecoration: "underline",
            color: theme.color,
          }}
        >
          {graduationLocation}
        </a>
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Enter your name"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            className="invite-input"
          />
          <div>
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
