import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { componentWillAppendToBody } from 'react-append-to-body';
import { Scrollbars } from 'react-custom-scrollbars';
import Dropzone from 'react-dropzone';
import actions from '../../../actions';
import checkUserStatus from '../../common/checkUserStatus';
import translate from '../../common/translate';
import './style.styl';

// append to body
const appendComponent = ({ children }) => (
  <div
    className="home-upload"
    style={{ padding: '0' }}
  >
    {children}
  </div>
);
appendComponent.propTypes = {
  children: PropTypes.object.isRequired,
};
const AppendComponent = componentWillAppendToBody(appendComponent);

class HomeUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      previewFile: null,
      dropzoneActive: false,
      previewBgcolor: 'black',
      uploadStatus: 0, // 0:default 1:uploading 2:uploaded success 3:uploaded fail(one or more)
      uploadResultHint: 0,
    };

    // check user status
    this.checkUserStatusResult = checkUserStatus(this.props);

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.onChangePreview = this.onChangePreview.bind(this);
    this.onChangePreviewBgcolor = this.onChangePreviewBgcolor.bind(this);
    this.onRemovePreviewFile = this.onRemovePreviewFile.bind(this);
    this.upload = this.upload.bind(this);
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true,
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false,
    });
  }

  onDrop(files) {
    files.map((file) => {
      const f = file;
      if (f.type.indexOf('image') > -1) {
        f.isImage = true;
      }
      return f;
    });

    this.setState({
      files: this.state.files.concat(files),
      dropzoneActive: false,
      uploadStatus: 0,
    });
  }

  onUpload() {
    this.upload(this.state.files);
  }

  onChangePreview(f) {
    this.setState({
      previewFile: f,
    });
  }

  onChangePreviewBgcolor(bgcolor) {
    this.setState({
      previewBgcolor: bgcolor,
    });
  }

  onRemovePreviewFile() {
    const files = [];
    let countSuccess = 0;
    let countFail = 0;
    let countNormal = 0;
    let uploadStatus = 0;
    this.state.files.forEach((file) => {
      if (file.preview !== this.state.previewFile.preview) {
        files.push(file);
        if (file.uploadResult === 1) {
          countSuccess += 1;
        } else if (file.uploadResult === 2) {
          countFail += 1;
        } else {
          countNormal += 1;
        }
      }
    });

    if (countNormal) {
      uploadStatus = 0;
    } else if (countFail) {
      uploadStatus = 3;
    } else if (countSuccess) {
      uploadStatus = 2;
    }
    this.setState({
      previewFile: null,
      files,
      uploadStatus,
    });
  }

  upload(files) {
    let f;
    let count = 0;
    files.map((file) => {
      if (typeof file.uploading === 'undefined') {
        if (!f) {
          f = file;
          // uploading
          f.uploading = 1;
        }
        count += 1;
      }
      return f;
    });

    if (f) {
      this.setState({
        files,
        uploadStatus: 1,
      }, () => {
        // upload
        this.props.actions.upload(f, (res) => {
          // upload result 1:successfully 2:failure
          if (res.code === 200) {
            f.uploadResult = 1;
          } else {
            f.uploadResult = 2;
          }
          // finish upload
          f.uploading = 0;

          setTimeout(() => {
            this.setState({
              files: this.state.files,
              uploadStatus: count > 1 ? 1 : 2,
              uploadResultHint: 1,
            }, () => {
              if (count > 1) {
                this.upload(this.state.files);
              }
            });
          }, 1000);
        });
      });
    } else {
      this.setState({
        uploadStatus: 2,
      });
    }
  }

  render() {
    // redirect if checkUserStatusResult not false
    if (this.checkUserStatusResult) return this.checkUserStatusResult;

    const {
      files,
      previewFile,
      dropzoneActive,
      previewBgcolor,
      uploadStatus,
      uploadResultHint,
    } = this.state;
    const overlayStyle = {
      position: 'absolute',
      top: 0,
      right: '-2px',
      bottom: 0,
      left: '-2px',
      zIndex: 2,
      background: 'rgba(0,0,0,0.5)',
    };
    let dropzoneRef;

    return (
      <div className="page home-upload">
        { previewFile
          ? (
            <AppendComponent>
              <div className="p-preview">
                <div className="p-preview-top">
                  <button
                    className="icon icon-cross-thin p-preview-close-btn sl-button"
                    onClick={() => this.onChangePreview(null)}
                  />
                  <button
                    className={`sl-button p-change-preview-bgcolor p-black${previewBgcolor === 'black' ? ' active' : ''}`}
                    onClick={() => this.onChangePreviewBgcolor('black')}
                  />
                  <button
                    className={`sl-button p-change-preview-bgcolor p-white${previewBgcolor === 'white' ? ' active' : ''}`}
                    onClick={() => this.onChangePreviewBgcolor('white')}
                  />
                  { previewFile.uploadResult !== 1
                    ? (
                      <button
                        className="icon icon-bin p-remove-preview-file-btn sl-button"
                        onClick={this.onRemovePreviewFile}
                      />
                      )
                    : null}
                </div>
                <div
                  className="p-preview-content"
                  style={{ background: previewBgcolor }}
                  onClick={() => this.onChangePreview(null)}
                  onKeyUp={() => {}}
                  role="button"
                  tabIndex="0"
                >
                  <Scrollbars>
                    <img src={previewFile.preview} alt={previewFile.name} />
                  </Scrollbars>
                </div>
              </div>
            </AppendComponent>
            )
          : null}
        <div className="p-top">
          { files.length && uploadStatus !== 1 && uploadStatus !== 2
            ? (
              <button
                className="sl-button p-upload-btn right"
                onClick={this.onUpload}
                disabled={uploadStatus === 1}
              >
                <i className="icon icon-upload" />
                {uploadStatus === 0 ? ` ${translate('Upload')}` : ''}
                {uploadStatus === 3 ? ` ${translate('Retry')}` : ''}
              </button>
              )
            : null }
          { uploadStatus === 1
            ? <span className="p-upload-status p-uploading">{translate('Uploading')}...</span> : null }
          { uploadStatus === 2
            ? <span className="p-upload-status p-success">{translate('Upload all successful')}</span> : null }
          <div className="page-title">{translate('Upload File')}</div>
          { uploadResultHint
            ? (
              <div className="p-upload-result-rule">
                <span className="p-success">
                  <span className="p-icon" />
                  <span className="p-text">{translate('Success')}</span>
                </span>
                <span className="p-fail">
                  <span className="p-icon" />
                  <span className="p-text">{translate('Fail')}</span>
                </span>
                <span className="p-normal">
                  <span className="p-icon" />
                  <span className="p-text">{translate('Uploading')}</span>
                </span>
              </div>
              )
            : null}
        </div>
        <Dropzone
          disableClick
          style={{ position: 'relative' }}
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          ref={(node) => { dropzoneRef = node; }}
        >
          { dropzoneActive ? <div style={overlayStyle} /> : null }
          <ul className="p-files clearfix">
            {
              files.map(f => (
                <li key={f.preview} className="p-file">
                  <div className="p-file-inner">
                    <button
                      className={`p-file-content sl-button${(f.uploading === 1) ? ' p-normal' : ''}${(f.uploadResult === 1) ? ' p-success' : ''}${(f.uploadResult === 2) ? ' p-fail' : ''}`}
                      style={{ backgroundImage: `url(${f.isImage ? f.preview : ''})` }}
                      onClick={() => this.onChangePreview(f)}
                    />
                    {f.isImage
                      ? null
                      : (
                        <div className="p-file-not-img">
                          <i className="icon icon-file-empty" />
                          <div className="p-file-name">{f.name}</div>
                        </div>
                      )}
                  </div>
                </li>
              ))
            }
            <li className="p-file p-file-select">
              <div className="p-file-inner">
                <button
                  className="p-file-content sl-button"
                  onClick={() => { dropzoneRef.open(); }}
                >
                  <i className="icon icon-plus" />
                </button>
              </div>
            </li>
          </ul>
        </Dropzone>
      </div>
    );
  }
}

HomeUpload.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeUpload));
