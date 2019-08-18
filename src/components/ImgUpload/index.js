import React,{
  useState
} from "react"
import {
  Upload,
  Icon,
  Spin
} from "antd"
import uploadService from '@src/service/uploadService';
import {getBase64} from "@src/utils/transformUtil"
export default  class ImgUpload extends React.Component{
  constructor(props){
      super(props)
      this.state={
        isLoading:false,
        imageUrl:""
      }
  }
  handleUpload=async ({file})=>{
      this.setIsLoading();
      const base64 = await getBase64(file)
      let imageMap = await uploadService.uploadBybase64(base64)
      const {thumbURL} = imageMap
      this.setIsLoading();
      this.setState({
        imageUrl:thumbURL
      },()=>{this.props.onUpload(thumbURL)})
      
      
  }
  setIsLoading(){
      this.setState(preState=>({
        isLoading:!preState.isLoading
      }))
  }
  render(){
    const {listType,className,showUploadList,imgURL} = this.props;
    const {imageUrl,isLoading} = this.state;
    const uploadButton = (<div>{isLoading?<Spin tip="上传中..."/>:<Icon type={'plus'} />}</div>)
    return (
      <Upload listType={listType} className={className} showUploadList={showUploadList} customRequest={this.handleUpload}>
          {imageUrl||imgURL ?<img src={imageUrl||imgURL} alt="avatar" style={{ width: '100%' }}/>:uploadButton}
      </Upload>
    )
  }
 
}
ImgUpload.defaultProps={
    onUpload:()=>{},
    listType:"picture-card",
    showUploadList:false,
    className:"avatar-uploader",
    imgURL:""
}

