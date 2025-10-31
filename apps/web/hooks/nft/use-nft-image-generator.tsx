import { useState } from "react";
import { ScoreSVG } from "@/components/assets/score-svg";
import { Address } from "@/lib/domain/shared/types";
import { renderToStaticMarkup } from "react-dom/server";

export function useNftImageGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);

  /**
   * Convert SVG string to Blob
   */
  const svgToBlob = (svgString: string): Blob => {
    return new Blob([svgString], { type: "image/svg+xml" });
  };

  /**
   * Upload to Pinata via /api/files endpoint
   */
  const uploadToStorage = async (blob: Blob, address: Address): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", blob, `${address}-${Date.now()}.svg`);

      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      if (!uploadRequest.ok) {
        throw new Error(`Upload failed: ${uploadRequest.statusText}`);
      }

      const signedUrl = await uploadRequest.json();
      return signedUrl;
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      throw error;
    }
  };

  /**
   * Render ScoreSVG component to string and upload to storage
   */
  const generateAndUpload = async (score: number, address: Address): Promise<string> => {
    setIsGenerating(true);
    try {
      const svgComponent = renderToStaticMarkup(<ScoreSVG score={score} address={address} />);
      const blob = svgToBlob(svgComponent);

      const storageUri = await uploadToStorage(blob, address);
      return storageUri;
    } catch (error) {
      console.error("Error generating and uploading NFT:", error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateAndUpload,
    isGenerating,
  };
}
