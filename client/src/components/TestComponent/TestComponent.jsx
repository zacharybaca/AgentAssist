import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditorTest() {
  const [value, setValue] = useState("");

  return (
    <div style={{ minHeight: "300px", border: "1px solid gray" }}>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
}
