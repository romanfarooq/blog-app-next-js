import Link from 'next/link';
import styles from '../../styles/Blog.module.css';
import fs from 'fs';

export default function Blog({ blogs }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {blogs &&
          blogs.map((blog) => (
            <div className={styles.blogItem} key={blog.slug}>
              <Link href={`/blog/${blog.slug}`}>
                <a className={styles.card}>
                  <h3>{blog.title}</h3>
                  <p>{blog.content.substr(0, 300)}...</p>
                </a>
              </Link>
            </div>
          ))}
      </main>
    </div>
  );
}

// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3000/api/blogs');
//   const blogs = await response.json();
//   return { props: { blogs } };
// }

export async function getStaticProps() {
  const files = fs.readdirSync('blogdata');
  const blogs = files.map((file) => {
    const blog = fs.readFileSync(`blogdata/${file}`, 'utf8');
    return JSON.parse(blog);
  });
  return {
    props: { blogs },
  };
}
