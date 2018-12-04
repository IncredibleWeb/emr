import React from "react";
import { Field } from "redux-form/immutable";

import ImageUpload from "./imageUpload";
import Image from "./image";

const Gallery = ({ fields, readOnly, onImageLoad, array, className = "" }) => (
  <div className={`gallery ${className || ""}`}>
    <ul className="gallery__image-list">
      {fields.map((item, index) => {
        return (
          <li className="gallery__image-list__item" key={index}>
            <button
              type="button"
              title="Remove Image"
              onClick={() => array.remove(fields.name, index)}
              className="gallery__image-list__item--remove"
            />
            <Field
              name={item}
              component={Image}
              urlPrefix={process.env.STORAGE_URL}
              className="gallery__image-list__item__img"
            />
          </li>
        );
      })}
      <li className="gallery__image-list__item" key="add">
        <Field
          name="add"
          component={ImageUpload}
          readOnly={readOnly}
          className="gallery__image-list__item--add"
          multiple={true}
          label="Upload File"
          onImageLoad={(file, target) =>
            onImageLoad(file, target).then(response => {
              array.push(fields.name, response.fileName);
            })
          }
        />
      </li>
    </ul>
  </div>
);

export default Gallery;
