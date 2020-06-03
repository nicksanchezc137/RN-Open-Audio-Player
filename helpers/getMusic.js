import { Api } from "../services/Api";



export const getMusic = (data) => {
  return new Promise((resolve, reject) => {
    try {
         Api
        .post("get_music.php", data)
          .then(res => {
              console.log("the data for file name is ------",res);
            if(res.data.status == "Success"){
              resolve(res.data.message.tracks)
            }else{
              resolve([]);
            }
            
          })
          .catch(error => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
  });
};
