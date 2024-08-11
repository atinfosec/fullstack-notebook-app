import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../context/Notes.context";

export default function UpdatePage() {
  const navigate = useNavigate();
  const { fetchSingleNote, note, updateNoteById } = useNotes();
  const [loader, setLoader] = useState(true);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      try {
        fetchSingleNote(params.id);
      } catch (e) {
        console.log(e);
      } finally {
        setLoader(false);
      }
    }
  }, []);

  const [state, setState] = useState({
    _id: note._id || "",
    title: note.title || "",
    slug: note.slug || "",
    short_desc: note.short_desc || "",
    content: note.content || "",
  });

  useEffect(() => {
    setState({
      _id: note._id || "",
      title: note.title || "",
      slug: note.slug || "",
      short_desc: note.short_desc || "",
      content: note.content || "",
    });
  }, [note]);

  const updateNoteFn = async (e) => {
    e.preventDefault();

    try {
      if (!state.title || !state.short_desc || !state.content) {
        alert("Fill all the details");
        return;
      }

      await updateNoteById(
        state.title,
        state.short_desc,
        state.content,
        params.id
      );
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeHandler = (e) => {
    setState((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  if (loader) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <div className="container py-5">
        <button onClick={() => navigate("/")} className="btn btn-dark">
          Back
        </button>
        <div className="mb-3">
          <h1>Update Notes</h1>
        </div>

        <form onSubmit={updateNoteFn} className="col-sm-10">
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
    </>
  );
}
