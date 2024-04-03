"use client";

import React from "react";
import cloudinary from "cloudinary";
import Image from "next/image";
import { useForm } from "react-hook-form";
import sha256 from "crypto-js/sha256";
import { NextRequest, NextResponse } from "next/server";
// import dbConnect from "@/lib/db-connect";



function Page() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const apiKey = "521165744352871";
      const apiSecret = "BekIshV3n2oZF18kP6t-iFbdhbA";
      const uploadURL =
        "https://api.cloudinary.com/v1_1/dcmjg2lmc/image/upload";
      const timestamp = String(+new Date());
      const signature = sha256(`timestamp=${timestamp}${apiSecret}`).toString();

      const upload_preset = "content-catalyst";

      // extract the uploaded image
      const image = data.image_file[0];

      // create an instance of form data
      const formData = new FormData();

      // append the image to the formData
      formData.append("file", image);

      // Bind the upload preset to the form data: for unauthenticated requests
      // Bind the signature to the form data: for authenticated requests
      formData.append("uploadPreset", upload_preset);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      // make an API request to Cloudinary Upload Endpoint
      const uploadResponse = await fetch(uploadURL, {
        method: "POST",
        body: formData,
        cache: "no-store",
      });

      const uploadedImageData = await uploadResponse.json();
      console.log(uploadedImageData);
      const image_url = uploadedImageData.secure_url;
       console.log(image_url);

    
    } catch (error: any) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1>Create Biography</h1>
        <form className="mt-40 mx-16" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            {...register("name")}
            required
          />
          <br></br>
          <label htmlFor="slug">Slug:</label>
          <input
            type="text"
            id="slug"
            name="slug"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            required
          />
          <br></br>
          <br></br>
          <label htmlFor="profilePhoto">Profile Photo:</label>
          <input type="text" id="profilePhoto" name="profilePhoto" />
          <br></br>
          <br></br>
          <label htmlFor="bio">Bio:</label>
          <textarea id="bio" name="bio" required></textarea>
          <br></br>
          <h2>Projects</h2>
          <div id="projects">
            <div>
              <label htmlFor="projectName">Name:</label>
              <input type="text" name="projectName[]" required />
              <br></br>
              <br></br>

              <label htmlFor="projectDescription">Description:</label>
              <textarea name="projectDescription[]" required></textarea>
              <br></br>
              <br></br>

              <label htmlFor="coverImage">Cover Image:</label>
              <input type="text" name="coverImage[]" />
              <br></br>
              <br></br>
            </div>
          </div>
          <button type="button">Add Project</button>
          <br></br>
          {/* <button type="button" onclick="addProject()">Add Project</button> */}
          <h2>Articles</h2>
          <div id="articles">
            <div>
              <label htmlFor="articleName">Name:</label>
              <input type="text" name="articleName[]" required />
              <br></br>
              <br></br>
              <label htmlFor="articleLink">Article Link:</label>
              <input type="text" name="articleLink[]" required />
              <br></br>
              <br></br>
              <label htmlFor="articleCoverImage">Cover Image:</label>
              <input type="text" name="articleCoverImage[]" /> <br></br>
              <br></br>
            </div>
          </div>
          <button type="button">Add Article</button> <br></br>
          <br></br>
          <label htmlFor="video">Video:</label>
          <textarea id="video" name="video" required></textarea>
          <br></br>
          <br></br>
          <label htmlFor="coverImage">Cover Image:</label>
          <input type="text" id="coverImage" name="coverImage" />
          <br></br>
          <br></br>
          <h2>Skills</h2>
          <div id="skills">
            <div>
              <label htmlFor="skill">Skill:</label>
              <input type="text" name="skill[]" required /> <br></br>
              <br></br>
              <label htmlFor="proficiencyLevel">Proficiency Level:</label>
              <input type="text" name="proficiencyLevel[]" required />
            </div>
          </div>
          <button type="button">Add Skill</button> <br></br>
          <br></br>
          <h2>Social</h2>
          <div id="social">
            <div>
              <label htmlFor="socialName">Name:</label>
              <input type="text" name="socialName[]" required /> <br></br>
              <br></br>
              <label htmlFor="socialLink">Link:</label>
              <input type="text" name="socialLink[]" required /> <br></br>
              <br></br>
            </div>
          </div>
          <button type="button">Add Social</button> <br></br>
          <br></br>
          <h2>Pitch</h2>
          <div id="pitch">
            <div>
              <label htmlFor="pitchVideo">Video:</label>
              <textarea name="pitchVideo[]" required></textarea> <br></br>
              <br></br>
              <label htmlFor="pitchCoverImage">Cover Image:</label>
              <input type="text" name="pitchCoverImage[]" /> <br></br>
              <br></br>
            </div>
          </div>
          <button type="button">Add Pitch</button> <br></br>
          <br></br>
          <h2>Slide Images</h2>
          <div id="slideImages">
            <div>
              <label htmlFor="slideImage">Slide Image:</label>
              <input type="text" name="slideImage[]" required /> <br></br>
              <br></br>
            </div>
          </div>
          <button type="button">Add Slide Image</button> <br></br>
          <br></br>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload File
          </label>
          <input
            {...register("image_file")}
            type="file"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            name="image_file"
            aria-describedby="file_input_help"
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF
          </p>
          <button
            type="submit"
            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-4"
          >
            Upload to cloud
          </button>
        </form>
        {/* <Image
          className=" mb-50"
          src="https://res.cloudinary.com/dcmjg2lmc/image/upload/v1712124127/pzbvkobde5kvnxhbae9r.jpg"
          alt="image"
          width={300}
          height={50}
        /> */}
      </div>
    </>
  );
}

export default Page;

  //const { coursename, coursedescription } = data;

    //   // Save the form data to MongoDB
    //   const courses = {
    //     courseName: coursename,
    //     courseDescription: coursedescription,
    //     imageUrl: image_url,
    //   };

    //   // make an API request to the database
    //   const newCourses = await fetch("http://localhost:3000/api/courses", {
    //     method: "POST",
    //     body: JSON.stringify(courses),
    //     cache: "no-store",
    //   });

    //   if (!newCourses.ok) {
    //     throw new Error("Failed to save form data to MongoDB");
    //   }

    //   const uploadedCourses = await newCourses.json();
    //   console.log(uploadedCourses);

 {
   /* <label htmlFor="coursename">Course Name</label>
          <input type="text" id="coursename" {...register("coursename")} />
          <label htmlFor="coursedescription">Course Description</label>
          <input
            type="text"
            id="coursedescription"
            {...register("coursedescription")}
          /> */
 }