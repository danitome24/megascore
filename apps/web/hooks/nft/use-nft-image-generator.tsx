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
   * Upload to Lens Grove storage
   * TODO: Implement with Lens Grove storage integration
   */
  const uploadToStorage = async (blob: Blob): Promise<string> => {
    // TODO: Implement Lens Grove storage upload
    // Return storage URI/hash
    throw new Error("uploadToStorage not implemented");
  };

  /**
   * Render ScoreSVG component to string and upload to storage
   */
  const generateAndUpload = async (score: number, address: Address): Promise<string> => {
    setIsGenerating(true);
    try {
      const svgComponent = renderToStaticMarkup(<ScoreSVG score={score} address={address} />);
      const blob = svgToBlob(svgComponent);

      // Upload to Lens Grove storage
      const storageUri = await uploadToStorage(blob);
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
