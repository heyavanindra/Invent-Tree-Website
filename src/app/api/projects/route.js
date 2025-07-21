import connectMongo from "../../../lib/db";
import cloudinary from "../../../lib/cloudinary";
import Project from "../../../models/proejct";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import { Types } from 'mongoose';
import deleteImage from "../../../utils/destroyImage"
import { NextResponse } from "next/server";
import { validateFormData } from "../../../lib/middleware/validateFormData";

export async function GET(req) {
    await connectMongo();
    try {
        let data = await Project.find({});
        if (!data) {
            return NextResponse.json({ message: "Not found." }, { status: 404 });
        }
        return NextResponse.json(
            { message: "Data Fetched Successfully.", data: data },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error While Fetching Project Posts", err);
        return NextResponse.json(
            { error: "Failed to Fetch Project Posts." },
            { status: 500 }
        );
    }
}



export async function POST(req) {
   await connectMongo();
  const formData = await req.formData(); // ✅ real FormData
  const imageFile = formData.get("image");

  console.log("formData entries:");
  for (let [key, val] of formData.entries()) {
    console.log(`${key}:`, val);
  }

  let uploadedImageUrl = "";

    if (imageFile && imageFile.name) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const tmpDir = os.tmpdir(); // Cross-platform safe
        const tmpPath = path.join(tmpDir, uuidv4() + "-" + imageFile.name);
        await writeFile(tmpPath, buffer);

        const uploadRes = await cloudinary.uploader.upload(tmpPath, {
            folder: "proejcts",
        });

        uploadedImageUrl = uploadRes.secure_url;
    }

    const projectData = {
        title: {
            en: formData.get("titleEn"),
            hi: formData.get("titleHi"),
        },
        description: {
            en: formData.get("descriptionEn"),
            hi: formData.get("descriptionHi"),
        },
        image: uploadedImageUrl,
        category: formData.get("category"),
        featured: formData.get("featured") === "true",
    };
    try {
        const saved = await Project.create(projectData);
        return NextResponse.json({ message: "Project Created Successully.", data: saved }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}


export async function DELETE(req) {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: 'Invalid Project ID' }, { status: 400 });
    }
    try {
        let data = await Project.findByIdAndDelete({ _id: id });
        if (data.image == undefined) {
            console.log("no Project found");
            return NextResponse.json({ message: "No Project Found. " }, { status: 400 });
        }
        await deleteImage(data.image);
        return NextResponse.json({ message: "Project Deleted Successfully." }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

export async function PATCH(req) {
    await connectMongo();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  console.log("this is id", id);

  const formData = await req.formData(); // ✅ real FormData
  const imageFile = formData.get("image");

  console.log("formData entries:");
  for (let [key, val] of formData.entries()) {
    console.log(`${key}:`, val);
  }

  let uploadedImageUrl = "";

    // Upload image to Cloudinary if present
    if (imageFile && imageFile.name) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const tmpDir = os.tmpdir();
        const tmpPath = path.join(tmpDir, uuidv4() + "-" + imageFile.name);
        await writeFile(tmpPath, buffer);

        const uploadRes = await cloudinary.uploader.upload(tmpPath, {
            folder: "projects",
        });

        uploadedImageUrl = uploadRes.secure_url;
    }
    console.log("this is upload image", uploadedImageUrl);

    // Construct updated Project data
    const projectData = {
        title: {
            en: formData.get("titleEn"),
            hi: formData.get("titleHi"),
        },
        description: {
            en: formData.get("descriptionEn"),
            hi: formData.get("descriptionHi"),
        },
        image: uploadedImageUrl,
        category: formData.get("category"),
        featured: formData.get("featured") === "true",
    };

    if (uploadedImageUrl) {
        projectData.image = uploadedImageUrl;
    }
    console.log("this is Project data", projectData);
    try {
        // Get current Project before updating (to access old image)
        const oldProject = await Project.findById(id);
        console.log("this is old Project", oldProject);
        if (!oldProject) {
            return NextResponse.json({ message: "No Project Found." }, { status: 404 });
        }

        // Delete old image if a new one was uploaded
        if (uploadedImageUrl && oldProject.image) {
            await deleteImage(oldProject.image);
        }

        const updatedProject = await Project.findByIdAndUpdate(id, projectData, { new: true });
        console.log("this is updatedProject", updatedProject);
        return NextResponse.json({ message: "Project Updated.", data: updatedProject }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}