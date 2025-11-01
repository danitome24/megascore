import { type NextRequest, NextResponse } from "next/server";
import { pinata } from "@/lib/external/pinata/config";

/**
 * Extract CID from Pinata gateway URL
 * Example: https://gateway.pinata.cloud/ipfs/QmXXXX -> QmXXXX
 */
function extractCidFromUri(uri: string): string | null {
  const match = uri.match(/\/ipfs\/(Qm\w+)/);
  return match ? match[1] : null;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const { cid } = await pinata.upload.public.file(file);
    const url = await pinata.gateways.public.convert(cid);
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { oldUri } = await request.json();

    if (!oldUri) {
      return NextResponse.json({ error: "No URI provided for deletion" }, { status: 400 });
    }

    const cid = extractCidFromUri(oldUri);
    if (!cid) {
      return NextResponse.json({ error: "Could not extract CID from URI" }, { status: 400 });
    }

    // Use Pinata SDK to delete the file
    const deletedFiles = await pinata.files.public.delete([cid]);

    console.log(`Deleted file: ${cid}`, deletedFiles);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.log("Error deleting file:", e);
    // Don't fail on deletion errors - return success
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
