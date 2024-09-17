import express from 'express'
import cors from 'cors'
import postData from './Schema/PostSchema.js'
import multer from 'multer'
import fire_store from './conn/conn_firebase.js'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { format } from 'date-fns';


const app = express()
const port = 5000

const upload = multer({ storage: multer.memoryStorage() })
const storage = getStorage(fire_store);

// app.use(cors({ credentials: true, origin: ['http://localhost:3000'], methods: ['POST', 'GET'] }))
app.use(cors({ credentials: true, origin: ['https://my-blogs-mernclient.vercel.app'], methods: ['POST', 'GET'] }))
app.use(express.json())

import('./conn/conn_mongo.js')

app.get('/getData', async (req, res) => {
  const data = await postData.find()
  res.json(data)
  // console.log(data)
})

app.get('/blog/:id', async (req, res) => {
  const id = req.params.id;
  const data = await postData.findById(id)
  res.json(data)
  console.log(data)
})

app.post('/CreatePost', upload.single('file'), async (req, res) => {
  if(req.file){
    try {
      const filedata = req.file;
      const { user, email, title, content } = req.body;
      console.log(filedata, user, email, title, content)
  
  
      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      const fileName = `${filedata.originalname.split('.')[0]}_${timestamp}.${filedata.originalname.split('.').pop()}`;
  
      try {
        const storageRef = ref(storage, `uploads/${fileName}`);
        await uploadBytes(storageRef, filedata.buffer);
  
        const downloadURL = await getDownloadURL(storageRef);
        console.log(`File uploaded to Firebase: ${downloadURL}`, user, email, title, content);
  
        try {
          const NewPostData = new postData({ email, title, content, imageUrl: downloadURL, user })
          const result = await NewPostData.save()
  
          console.log(result)
  
  
          return res.status(200).json({ message: 'Post uploaded to server successfully' });
  
  
        } catch (err) {
          console.error('Error saving post to the database:', err);
          return res.status(500).json({ error: 'Upload to database failed', details: err.message });
        }
  
      } catch (err) {
        console.error('Error uploading file to Firebase:', err);
        return res.status(500).json({ error: 'File upload failed', details: err.message });
      }
  
  
    } catch (err) {
      console.error('Error processing the request:', err);
      return res.status(500).json({ error: 'Upload failed', details: err.message });
    }
  }
  else{
    const { user, email, title, content } = req.body;

    try {
      const NewPostData = new postData({ email, title, content, user })
      const result = await NewPostData.save()

      console.log(result)


      return res.status(200).json({ message: 'Post uploaded to server successfully' });


    } catch (err) {
      console.error('Error saving post to the database:', err);
      return res.status(500).json({ error: 'Upload to database failed', details: err.message });
    }
  }
})

app.delete('/deletepost/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await postData.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Error deleting post', details: err.message });
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})








