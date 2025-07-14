import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { Wallet } from "lucide-react";

export function ConnectButton() {
  const baseButtonStyle = {
    color: "#FFFFFF",
    border: 0,
    textTransform: "uppercase" as const,
    letterSpacing: "0.2em",
    fontWeight: 500,
    fontSize: "0.875rem",
    height: "auto",
    borderRadius: 0,
    cursor: "pointer",
    outline: "none",
    fontFamily:
      "Sofia Pro Soft, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const connectedButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: "#7EAAD4", // mega-blue for connected state
    color: "#FFFFFF",
    padding: "12px 24px",
    boxShadow: "0 2px 8px rgba(126, 170, 212, 0.15)",
    border: "2px solid rgba(126, 170, 212, 0.3)",
  };

  const disconnectedButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: "#F5AF94", // mega-coral for disconnected
    padding: "24px 48px",
    boxShadow: "0 4px 16px rgba(245, 175, 148, 0.25)",
  };

  const connectedHoverStyle = {
    backgroundColor: "rgba(126, 170, 212, 0.9)", // hover:bg-mega-blue/90
    transform: "scale(1.02)",
    borderColor: "rgba(126, 170, 212, 0.5)",
  };

  const disconnectedHoverStyle = {
    backgroundColor: "rgba(245, 175, 148, 0.9)", // hover:bg-mega-coral/90
    transform: "scale(1.05)",
  };

  return (
    <ConnectKitButton.Custom >
      {({ isConnected, isConnecting, show, address, ensName }) => {
        const displayText = isConnected
          ? ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`
          : isConnecting
          ? "Connecting..."
          : "Connect & View Score";

        const buttonStyle = isConnected
          ? connectedButtonStyle
          : disconnectedButtonStyle;
        const hoverStyle = isConnected
          ? connectedHoverStyle
          : disconnectedHoverStyle;

        return (
          <button
            onClick={show}
            style={buttonStyle}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, hoverStyle);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, buttonStyle);
            }}
          >
            <Wallet size={16} />
            {displayText}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
