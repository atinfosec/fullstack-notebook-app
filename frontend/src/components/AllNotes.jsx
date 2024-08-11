import { Link } from "react-router-dom";
import { useNotes } from "../context/Notes.context";
import React from "react";

export default function AllNotes() {
  const { notes, deleteNote, togglePublish } = useNotes();

  return (
    <>
      <div className="container col-sm-12">
        <div className="mb-3">
          <h1>All Notes ({notes && notes.length})</h1>
        </div>
        <div className="gap-5 d-flex flex-wrap mx-auto">
          {notes && notes.length > 0 ? (
            <>
              {notes.map((note, i) => {
                return (
                  <div className="card" key={i}>
                    <div className="card-title">
                      <p className="text-center h2">{note.title}</p>
                    </div>
                    <hr />
                    <div className="card-body">{note.short_desc}</div>
                    <div className="card-text p-3">{note.content}</div>
                    <div className="card-footer">
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => {
                          deleteNote(note._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className={`btn ${
                          note.isPublished ? "btn-danger" : "btn-primary"
                        } mx-2`}
                        onClick={() => togglePublish(note._id)}
                      >
                        {note.isPublished ? "Unpublish" : "Publish"}
                      </button>
                      <Link
                        to={`/update/${note._id}`}
                        className={`btn btn-secondary mx-2`}
                      >
                        Update
                      </Link>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>Currently 0 notes</>
          )}
        </div>
      </div>
    </>
  );
}
