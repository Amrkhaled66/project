import React from "react";

import Uploadform from "src/components/Profile/Uploads/UploadForm";
const Uploads = () => {
  return (
    <div className="container space-y-4 mx-auto">
      <div className="page-header">
        <h1 className="text-2xl font-semibold sm:text-3xl">
          Upload Photos & Videos
        </h1>
        <p className="text-base font-light sm:text-lg">
          Select your preferred method to upload files for your custom blanket
          design.
        </p>
      </div>
      <Uploadform
        onSubmit={async ({ files, note }) => {
          const form = new FormData();
          files.forEach((f) => form.append("photos", f));
          form.append("note", note);
          await fetch("/api/upload", { method: "POST", body: form });
        }}
      />
    </div>
  );
};

export default Uploads;
