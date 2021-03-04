import dotenv from 'dotenv';
import utils from './../utils/index';
import error from './../utils/errorMessage';
const cloudinary = require('cloudinary').v2;

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const { pgConnect, tokens } = utils;
const { serverMessage } = error;

const client = pgConnect();
client.connect();

/**
 * It is a class that control image
 */
class ImageController {
  /**
   * @desc it upload an image
   * 
   * @param {string} req
   * @param {object} response
   * 
   * @return {object} an Object
   */
  static async imageUpload(req, res) {
    try {
      const token = await tokens(req);
        //collect image from a user
        const {
          title,
          image
        } = req.body
        //upload image
      const cloudImage = await cloudinary.uploader.upload(image);
      
      const uploadImageQuery = `
        INSERT INTO images (
          title,
          cloudinary_id,
          image_url,
          users_id
          )
         VALUES(
           '${title}',
           '${cloudImage.public_id}',
           '${cloudImage.secure_url}',
           '${token.id}') 
           RETURNING *
         `;
    
      let result = await client.query(uploadImageQuery);
      result = result.rows[0]
      console.log(result)

      return res.status(201).send({
        status: "success",
        data : {
          message: "Image uploaded successfully",
          title: result.title,
          cloudinary_id: result.cloudinary_id,
          image_url: result.image_url
        }
      });
    } catch (error){
        serverMessage(res, 'fail', error.message, 500);
    }
  }

   /**
   * @desc it get an image
   * 
   * @param {string} req
   * @param {object} response
   * 
   * @return {object} an Object
   */
  static async getImage(req, res) {
    try {
      const token = await tokens(req);
       // const {   imageId } = req.params
      
      const getImageQuery = `
          SELECT
          images.cloudinary_id,
          users.user_name,
          images.image_url
          FROM images
          INNER JOIN users ON
          images.users_id = '${token.id}'
          WHERE images.users_id= '${token.id}'
         `;
    
      let result = await client.query(getImageQuery);
      result = result.rows[0]

      return res.status(201).send({
        status: "success",
        data : {
          message: "Image uploaded successfully",
          title: result.title,
          cloudinary_id: result.cloudinary_id,
          image_url: result.image_url
        }
      });
    } catch (error){
        serverMessage(res, 'fail', "could not retreive record", 401);
    }
  }

     /**
   * @desc it delete an image
   * 
   * @param {string} req
   * @param {object} response
   * 
   * @return {object} an Object
   */
  static async deleteImage(req, res) {
    try {
        const {
          userId,
          imageId
        } = req.params

        const deleteImage = await cloudinary.uploader.destroy(imageId);

      
      const deleteImageQuery = `
          DELETE from images
          WHERE cloudinary_id = '${imageId}'
         `;
    
      let result = await client.query(deleteImageQuery);


      return res.status(200).send({
        message: "Image deleted successfully",
        result
      });
    } catch (error){
        serverMessage(res, 'fail', "Image could not be deleted", 401);
    }
  }

     /**
   * @desc update an image
   * 
   * @param {string} req
   * @param {object} response
   * 
   * @return {object} an Object
   */
  static async updateImage(req, res) {
    try {

      const {cloudinary_id} = req_params;
      const {
        title,
        image,
        userId
      } = req.body

      deleteImage = await cloudinary.uploader.destroy(cloudinary_id)

      uploadImage = await cloudinary.uploader.upload(image)
      
      const updateImageQuery = `
          UPDATE images
          SET title='${title}',
          cloudinary_id='${cloudinary_id}',
          image_url = '${image}'
          WHERE cloudinary_id= '${cloudinary_id}'
         `;
    
      let result = await client.query(updateImageQuery);
      result = result.rows[0]
     

      return res.status(201).send({
        status: "success",
        data : {
          message: "Image updated successfully",
        }
      });
    } catch (error){
        serverMessage(res, 'fail', "update failed", 500);
    }
  }
}


export default ImageController;