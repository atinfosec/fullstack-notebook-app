import React, { useState } from "react";

import { useNotes } from "../context/Notes.context";

export default function AddNotes() {
  const { createNote } = useNotes();

  const [state, setState] = useState({
    title: "",
    short_desc: "",
    content: "",
  });

  const onChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const AddNoteFn = async (e) => {
    e.preventDefault();

    try {
      if (!state.title || !state.short_desc || !state.content) {
        alert("Fill all the details");
        return;
      }

      const res = await createNote(
        state.title,
        state.short_desc,
        state.content
      );
    } catch (e) {
      console.log(e);
    } finally {
      e.currentTarget.reset({
        title: "",
        short_desc: "",
        content: "",
      });
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-3">
        <h1>Add Notes</h1>
      </div>

      <form onSubmit={AddNoteFn} className="col-sm-10">
        <div className="mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Note Title"
            className="form-control"
            onChange={onChangeHandler}
            value={state.title}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="short_desc">Short Description</label>
          <textarea
            rows={3}
            name="short_desc"
            placeholder="Enter Short Description"
            className="form-control"
            onChange={onChangeHandler}
            value={state.short_desc}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content">Content</label>
          <textarea
            rows={6}
            name="content"
            placeholder="Enter Content"
            className="form-control"
            onChange={onChangeHandler}
            value={state.content}
          />
        </div>
        <div className="mb-3 d-flex w-full">
          <button className="btn-block btn-danger btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
