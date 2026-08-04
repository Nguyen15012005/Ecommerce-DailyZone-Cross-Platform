


export const uploadToCloudinary = async (pics) => {
  const cloud_name = "dkavboirf";
  const upload_preset = "dailyzone-ecommerce";

  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("file", upload_preset);
    data.append("file", cloud_name);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dkavboirf/upload",
      {
        method: "POST",
        body: data,
      },
    );

    const fileDate = await res.json();
    return fileDate.url;
  } else {
    console.log("Error : pics not found");
  }
};
