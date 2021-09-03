import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import {Spinner, Card} from 'react-bootstrap';
import './homepage.css';
import './singleBlog.css'
import AvatarImg from '../avatar.png';

function SingleBlog({id}) {
    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [author, setAuthor] = useState();

    useEffect(() => {

        async function fetchAuthor(userId) {
            axios.get(` https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(function(response) {
                setAuthor(response.data);
            })
        }

        async function fetchPost() {
            axios.get(baseUrl + `/${id}`)
            .then(function(response) {
                setPost(response.data);
                fetchAuthor(response.data.userId);
            })
        }

        async function fetchComments() {
            axios.get(baseUrl + `/${id}/comments`)
            .then(function(response) {
                setComments(response.data);
            })
        }
        
        setTimeout(() => {
            fetchPost();
            fetchComments();
        }, 1000);
    }, [])

    return (
        <div>
            <div className="bannerText">
                <h1> <strong>BLOG {id}</strong></h1>
            </div>

            <div>
                <h4>
                    {author ? <>- {author.name}</>:<></>}
                </h4>
            </div>

            <div>
            {post ? <>
                <div className="section"><h2><strong>Title : </strong> {post.title}</h2></div>
                <div className="section"><h2 style={{display:'inline'}}><strong>Body :- </strong> </h2> <h3 style={{display:'inline', fontWeight:'normal'}}>{post.body}</h3></div>
                <div className="section"><h2 style={{display:'inline'}}><strong>Comments :- </strong> </h2> 
                    {comments ? <ul style={{
                        marginTop:'1rem',
                        padding:'0'
                    }}>
                        {comments.map((comment) => {
                            return(
                                // <li><h5>{comment.email}</h5></li>
                                <Card style={{
                                    margin:'5px'
                                }}>
                                {/* <Card.Header>Quote</Card.Header> */}
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                    <p>
                                        {' '}
                                        {comment.body}
                                        {' '}
                                    </p>
                                    <footer className="blockquote-footer">
                                        {comment.name} <cite title="Source Title">{comment.email}</cite>
                                    </footer>
                                    </blockquote>
                                </Card.Body>
                                </Card>
                            )
                        })}
                    </ul>:<></>}</div>
                    {console.log(comments)}
            </>:<Spinner className="loading" size="lg" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>}
            {/* {console.log(author)} */}
            {author ? <div className="section">
                <h2><strong>Author :-</strong></h2>
                <img src={AvatarImg} alt="Avatar" className="avatar"/>
                <div style={{
                    display:'inline'
                }}>
                    <h5 style={{display:'inline'}}>{author.name}  {`(${author.username})`} </h5>
                </div>
                <div style={{
                    fontWeight:'normal'
                }}>
                <h5> <u>Visit at</u> : {author.website}</h5>
                <h5> <u>Contact Me at</u> : {author.phone}</h5>
                <h5>{author.address.street} , {author.address.suite}</h5>
                <h5>{author.address.city} - {author.address.zipcode}</h5>
                </div>
            </div>:<></>}
            </div>
            
        </div>
    )
}

export default SingleBlog
