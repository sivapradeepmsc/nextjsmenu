// components/Articles/Articles.js
"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Articles.module.css';


const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const { data } = await axios.get('https://api.storyblok.com/v2/cdn/stories', {
                    params: {
                        token: '8Su8cdpWnbzcWxCU9chIfQtt', 
                        version: 'draft', 
                        starts_with: 'post' 
                    }
                });
                setArticles(data.stories);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };
        fetchArticles();
    }, []);

    return (
        <article className={styles.articleclass}>
        
            {articles.map(article => (
                <div key={article.uuid}>
                    <h1>{article.name}</h1> 
                    <img src={article.content.image} alt="Article Image" /> 
                 
                </div>
            ))}

        </article>
    );
};

export default Articles;
