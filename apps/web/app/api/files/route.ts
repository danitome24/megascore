import { type NextRequest, NextResponse } from "next/server";
import { pinata } from "@/lib/external/pinata/config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const { cid } = await pinata.upload.public.file(file);
    // Return only the CID (URI), not the full gateway URL
    return NextResponse.json(cid, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { oldUri: cid } = await request.json();

    if (!cid) {
      return NextResponse.json({ error: "No URI provided for deletion" }, { status: 400 });
    }
    const files = await pinata.files.public.list().cid(cid);
    if (!files || files.files.length === 0) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Use Pinata SDK to delete the file
    const deletedFiles = await pinata.files.public.delete([files.files[0].id]);

    console.log(`Deleted file: ${cid}`, deletedFiles);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.log("Error deleting file:", e);
    // Don't fail on deletion errors - return success
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
