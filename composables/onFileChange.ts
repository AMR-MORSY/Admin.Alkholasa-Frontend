import { ref } from "vue";
export const useOnFileChange = (image:any) => {
 let fileErrors:any=null;
  function checkFileType(name:string) {
    const nameArray = name.split(".");

    if (nameArray[1] == "jpg" || nameArray[1] == "JPG" || nameArray[1] == "PNG" || nameArray[1] == "png" || nameArray[1] == "svg" || nameArray[1] == "SVG") {
      return true
    }
    return false

  }

  
  if (image != null) {
    
    if (!checkFileType(image.name)) {
      
      fileErrors=[];
        fileErrors.push("photo type is not supported");
    }
    else {

      if (image.size > 1024 * 1024) {
        fileErrors=[];

          fileErrors.push("Photo size Should be less than 1MB");

      }

    }

  }
 
  return fileErrors;
  
}
