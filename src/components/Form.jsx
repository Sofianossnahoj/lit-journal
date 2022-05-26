import React from "react";

export default function Form() {
  return (
    <form className="form-new-entry">
      <section className="form-section-top">
        <label htmlFor="">Title</label>
        <input type="text" className="box" />
        <label htmlFor="">Author</label>
        <input type="text" className="box" />
        <label htmlFor="">Genre</label>
        <input type="text" className="box" />
      </section>
      <section className="form-section-bottom">
        <label htmlFor="">Method</label>
        <input type="text" className="box" />
        <label htmlFor="">Was it worth the read?</label>
        <textarea type="text" className="box box-large" />
        <label htmlFor="">Favorite chapter</label>
        <input type="text" className="box" />
        <label htmlFor="">Favorite character</label>
        <input type="text" className="box" />
        <label htmlFor="">Sequel, will you read it?</label>
        <input type="text" className="box" />
        <label htmlFor="">Quotes</label>
        <textarea type="text" className="box box-large" />
        <button className="button-save">Save entry</button>
      </section>
    </form>
  );
}
