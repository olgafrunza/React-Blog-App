import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";
import { Layout } from "../components/";
import { useNavigate, useParams } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";

const UpdateBlog = () => {
  const { id } = useParams();

  const { getSingleBlog, currentBlog, updateBlog } = useContext(BlogContext);

  useEffect(() => {
    if (id) getSingleBlog(id);
  }, [id]);

  const [formData, setFormData] = useState({
    title: currentBlog?.title,
    content: currentBlog?.content,
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target?.files?.[0] || e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    updateBlog(formData, navigate, id);
  };

  return (
    <Layout>
      <div className="container mt-5">
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="title" sm={2}>
              Blog Title
            </Label>
            <Col sm={10}>
              <Input
                name="title"
                id="title"
                placeholder="Enter a title"
                type="text"
                value={formData.title}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="content" sm={2}>
              Blog
            </Label>
            <Col sm={10}>
              <Input
                name="content"
                id="content"
                placeholder="Type something"
                type="textarea"
                style={{
                  resize: "none",
                  height: "15rem",
                }}
                value={formData.content}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label id="image" sm={2}>
              Select Image
            </Label>
            <Col sm={10}>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
              <FormText>Choose the image for your blog</FormText>
            </Col>
          </FormGroup>

          <FormGroup check row>
            <Col
              sm={{
                offset: 2,
                size: 10,
              }}
            >
              <Button>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </Layout>
  );
};

export default UpdateBlog;
