import React from "react";
import { Field } from "redux-form/immutable";

import ImageUpload from "./imageUpload";
import Image from "./image";

const Gallery = ({ fields, readOnly, onImageLoad, array, className = "" }) => (
  <div className={`gallery ${className}`}>
    <ul className="image-list">
      {fields.map((item, index) => {
        return (
          <li className="item" key={index}>
            <button
              type="button"
              title="Remove Image"
              onClick={() => array.remove(fields.name, index)}
              className="remove-image"
            />
            <Field
              name={item}
              component={Image}
              urlPrefix={process.env.STORAGE_URL}
            />
          </li>
        );
      })}
      <li className="item" key="add">
        <Field
          name="Add"
          component={ImageUpload}
          readOnly={readOnly}
          className="add-image"
          multiple={true}
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
