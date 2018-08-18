import React from "react";
import PropTypes from "prop-types";

class FileUpload extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isLoaded: false
    };
  }

  componentDidMount() {
    const { input, onFileNotFound } = this.props;

    if (!input.value && onFileNotFound) {
      onFileNotFound();
    }
  }

  render() {
    const {
      input,
      label,
      helperText,
      readOnly,
      className,
      multiple = false,
      onFileLoad
    } = this.props;

    return (
      <div className={className ? `${className}` : ""}>
        <div
          className={
            "file-upload" +
            (this.state.isLoading ? ` loading` : "") +
            (this.state.readOnly ? ` readonly` : "")
          }
          onClick={() => this.fileUpload.click()}
        >
          <input
            name={`${input.name}_file`}
            id={`${input.name}_file`}
            type="file"
            readOnly={readOnly}
            ref={n => (this.fileUpload = n)}
            multiple={multiple}
            onChange={e => {
              const files = e.target.files;

              if (files) {
                for (let i = 0; i < files.length; i++) {
                  const file = files[i];
                  try {
                    this.setState({ isLoading: true });
                    if (file.size > 1024 * 1024 * 40) {
                      throw "Error: File size is too large";
                    }

                    // only process image files.
                    if (
                      !file.type.match(".*csv") &&
                      !file.type.match("application/vnd.ms-excel")
                    ) {
                      throw "Error: Invalid filetype";
                    }

                    const reader = new FileReader();

                    // closure to capture the file information
                    reader.onload = e => {
                      onFileLoad(file, e.target).then(() => {
                        this.setState({ isLoading: false });
                        this.setState({ isLoaded: true });
                      });
                    };

                    // read in the image file as a data URL
                    reader.readAsDataURL(file);
                  } catch (e) {
                    this.setState({ isLoading: false });
                    alert(e);
                    console.error(e);
                  }
                }
              }
            }}
          />
          <img
            src={
              this.state.isLoaded
                ? "/img/csv_downloaded.svg"
                : "/img/ic_insert_drive_file_black_24px.svg"
            }
            title={label}
          />
          <input type="hidden" {...input} />
        </div>
        <div>
          <label htmlFor={`${input.name}_file`}>{label}</label>
          <label className="helper-text" htmlFor={"helperText"}>
            {helperText}
          </label>
        </div>
      </div>
    );
  }
}

FileUpload.propTypes = {
  readOnly: PropTypes.bool,
  multiple: PropTypes.bool,
  label: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string
};

export default FileUpload;
