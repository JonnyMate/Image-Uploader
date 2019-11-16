import React, { Component } from "react";
import { storage } from "../firebase/index";
import ImageUploadRender from "./ImageUploadRender";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0,
      noUpload: false
    };
  }

  handleChange = event => {
    this.setState({ image: event.target.files[0] });
  };

  handleUpload = () => {
    const { image } = this.state;
    // Check if no image was uploaded
    if (image === null) {
      this.setState({ noUpload: true });
      return;
    }

    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      // Progress function
      snapshot => {
        this.setState({
          progress: Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
        });
      },
      // Error function
      err => {
        console.log(err);
      },
      // Complete function
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => this.setState({ url, noUpload: false }));
      }
    );
  };

  render() {
    return (
      <ImageUploadRender
        handleChange={this.handleChange}
        handleUpload={this.handleUpload}
        data={this.state}
      />
    );
  }
}

export default ImageUpload;
