import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosProvider } from "../../Constant";

const NotesContext = createContext({
  createNote(title, short_desc, content) {},
  notes: [],
  deleteNote(id) {},
  togglePublish(id) {},
  fetchSingleNote(id) {},
  note: {},
  fetchSingleNote(id) {},
  updateNoteById(data, id) {},
});

export const useNotes = () => {
  return useContext(NotesContext);
};

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    _id: "",
    title: "",
    slug: "",
    short_desc: "",
    content: "",
  });

  const fetchAllNotes = async () => {
    const res = await AxiosProvider.get("/get-all");
    const data = await res.data;

    setNotes(data.data);
  };

  const fetchSingleNote = async (id) => {
    const res = await AxiosProvider.get(`/get-note-by-id/${id}`);
    const noteRes = await res.data;

    setNote((prevState) => {
      return {
        ...prevState,
        _id: noteRes.data._id,
        title: noteRes.data.title,
        slug: noteRes.data.slug,
        short_desc: noteRes.data.short_desc,
        content: noteRes.data.content,
      };
    });

    // setNote("Test");
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  const createNote = async (title, short_desc, content) => {
    const res = await AxiosProvider.post("/create", {
      title,
      short_desc,
      content,
    });
    const data = await res.data;
    await fetchAllNotes();
    return data;
  };

  const deleteNote = async (id) => {
    const res = await AxiosProvider.delete(`/delete/${id}`);
    const response = await res.data;
    await fetchAllNotes();
    return response;
  };

  const togglePublish = async (id) => {
    const res = await AxiosProvider.put(`/publish/${id}`);
    const response = await res.data;
    await fetchAllNotes();

    return response;
  };

  const updateNoteById = async (title, short_desc, content, id) => {
    const res = await AxiosProvider.patch(`/update/${id}`, {
      title: title,
      short_desc: short_desc,
      content: content,
    });
    const response = await res.data;

    await fetchAllNotes();
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        createNote,
        deleteNote,
        togglePublish,
        fetchSingleNote,
        note,
        fetchSingleNote,
        updateNoteById,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
