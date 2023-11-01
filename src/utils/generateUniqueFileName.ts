const generateUniqueFileName = ( originalFileName : string ) : string  =>{
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8); // 6-character random string
    const fileExtension = originalFileName.split('.').pop();
    const uniqueFileName = `${timestamp}-${randomString}.${fileExtension}`;
  return uniqueFileName;
}

export default generateUniqueFileName;

