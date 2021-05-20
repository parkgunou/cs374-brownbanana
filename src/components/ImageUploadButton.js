import React from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export class ImageUploadButton extends React.Component {
  /*
   * Receives: max (optional), filelist, onFilelistChange as props
   */
  constructor(props) {
    super(props);
    this.maxImages = props.max ?? 1;
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }) => {
    this.props.onFilelistChange(fileList);
  }

  beforeUpload = file => {
    const newFilelist = this.props.filelist.concat([file]);
    this.props.onFilelistChange(newFilelist);
    return false;
  }

  handleUpload = () => {
    console.log(this.props.filelist);
  }

  render() {
    const { previewVisible, previewImage, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          listType="picture-card"
          fileList={this.props.filelist}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}
          visible={!previewVisible}
        >
          {this.props.filelist.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        {/* <Button
          type="primary"
          onClick={this.handleUpload}
          style={{ marginTop: 16 }}
        >
        Upload
        </Button> */}
      </>
    );
  }
}