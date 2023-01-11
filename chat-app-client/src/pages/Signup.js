import React, { useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap/';
import { Link,useNavigate } from 'react-router-dom';
import "../css/signup.css"
import { MdAddAPhoto } from 'react-icons/md';
import { useSignupUserMutation } from '../services/appApi';

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const [image, setImage] = useState(null)
  const [uploadImg, setUploadImg] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [signupUser, { isLoading, error }] = useSignupUserMutation()
  const navigate = useNavigate()



  function validateImg(e) {
    const file = e.target.files[0]
    if (file.size >= 1048576) {
      return alert("max file size is 1MB");
    } else {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }


  async function uploadImage() {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", 'chatapp')
    try {
      setUploadImg(true)
      let res = await fetch("https://api.cloudinary.com/v1_1/dtwwz9kdg/image/upload", {
        method: 'post',
        body: data
      })
      const urlData = await res.json()
      setUploadImg(false)
      return urlData.url
    } catch (error) {
      setUploadImg(false)
      console.log(error)

    }
  }

  async function handleSignup(e) {
    e.preventDefault()
    if (!image) return alert("please upload your profile picture")
    const url = await uploadImage(image)
    console.log(url)
    signupUser({ name, email, password, picture: url }).then(({ data }) => {
      if (data) {
        console.log(data)
        navigate('/login')
      }

    })
  }


  return (

    <Container>
      <Row>
        <Col md={7} className="form-style">
          <Form style={{ width: "70%", maxWidth: "400" }} onSubmit={handleSignup}>
            <h1 className='text-center'>Create an acount</h1>
            <div className='signup-pic-container'>
              <img src={imagePreview || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqEwgUHXlcKq_eCbtvmgpHKWV_uWTJgZtfsg&usqp=CAU'} className='signup-profile-pic'></img>
              <label htmlFor='image-upload' className='image-upload-label'>
                <MdAddAPhoto className='image-upload-pic'></MdAddAPhoto>

              </label>
              <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg}></input>

            </div>
            {error && <p className='alert alert-danger'>{error.data}</p>}
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)} value={name} />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </Form.Group>
            <Button variant="primary" type="submit">
              {uploadImg||isLoading ? "signing you up.." : "signup"}
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                Already have acount ? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signup-bg"></Col>

      </Row>
    </Container>
  );
}
export default Signup

