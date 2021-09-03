import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import './homepage.css';
import {Card, Spinner, Row, Col} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function Homepage() {
    const [posts, setPosts] = useState([]);
    const navigate = useHistory();

    const gotoBlog = (index) => {
        navigate.push(`/blog/${index}`);
      }

    useEffect(() => {
        async function fetchPosts() {
            axios.get(baseUrl)
            .then(function(response) {
                setPosts(response.data);
            })
        }
        
        setTimeout(() => {
            fetchPosts();
        }, 1000);
    }, [])
    return (
        <div>
            <div className="bannerText">
                <h1> <strong>HOME</strong></h1>
            </div>

            <div>
            {posts.length !==0 ? <></>:<Spinner className="loading" size="lg" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>}
            </div>
            <Row>
            {posts.length !==0 ? <>{posts.map((post) => {
                return(
                    <Col md={6}>
                    <Card onClick={() => gotoBlog(post.id)} className="postCard">
                        <Card.Body>
                                {post.title}
                        </Card.Body>
                    </Card>
                    </Col>
                )
            })}</>:<></>}
            </Row>
            {console.log(posts)}
        </div>
    )
}

export default Homepage
